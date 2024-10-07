/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "../styles/home.css";
import "../styles/comment.css";
import "../styles/editor.css";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { DateTime } from "luxon";
import Header from "./Header";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import toast, { Toaster } from "react-hot-toast";
import DOMPurify from "dompurify";

function removeHTMLTags(textWithTags) {
  if (!textWithTags) return "";
  return textWithTags.replace(/<[^>]*>/g, "");
}

function Post() {
  const [post, setPost] = useState({
    title: "",
    description: "",
    user: "",
    tag: "",
    time: "",
    text: "",
    comments: [],
  });
  const [comments, setComments] = useState([]);
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const token = localStorage.getItem("token");
  const tokenWithoutBearer = token.replace("Bearer ", "");

  // Get logged in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) {
          navigate("/");
          return;
        }
        const response = await axios.get("https://narrative-08nb.onrender.com", {
          headers: {
            Authorization: `Bearer ${tokenWithoutBearer}`,
          },
        });
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching culture posts:", error);
      }
    };
    fetchUser();
  }, [navigate, tokenWithoutBearer, token]);

  // Display all content of the post
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `https://narrative-08nb.onrender.com/api/posts/${category}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchItems();
  }, [category, id, token]);

  // Display editor
  const isMounted = useRef(false);
  const editor = useRef(null);

  useEffect(() => {
    if (!isMounted.current && editor.current) {
      editor.current = new Quill("#editor", {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, false] }],
            ["bold", "italic", "underline"],
            ["link"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        },
      });
      isMounted.current = true;
    }
  }, []);

  // Add comments to post
  const handleSubmitComment = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const quill = editor.current;
        if (!quill) return;
        const content = quill.root.innerHTML;
        const trimmedContent = content.trim();
        if (!trimmedContent) {
          return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found");
          notifyError("No token found");
          return;
        }

        const response = await axios.post(
          `https://narrative-08nb.onrender.com/api/comments/${id}`,
          {
            text: trimmedContent,
            user: user._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          },
        );

        if (response.data && response.data.comment) {
          const newComment = response.data.comment || []; // Extract the new comment object

          // Update the comments array in the state
          setComments((prevComments) => [...prevComments, newComment]);

          // Update the specific post's comments in the post list
          setPost((prevPost) => ({
            ...prevPost,
            comments: [...prevPost.comments, newComment],
          }));

          // Clear the quill editor after successful submission
          quill.setText("");
          notifySuccess("Comment added.");
        } else {
          console.error("Invalid response format:", response.data);
          notifyError("Failed to add comment");
        }
      } catch (error) {
        console.error("Error creating comment:", error);
        notifyError();
      }
    },
    [id, user],
  );

  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `https://narrative-08nb.onrender.com/api/comments/${id}`,
        {
          data: { commentId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // Update the post state to remove the deleted comment
      setPost((prevPost) => ({
        ...prevPost,
        comments: prevPost.comments.filter(
          (comment) => comment._id !== commentId,
        ), // Compare with the _id of each comment
      }));

      notifySuccess("Comment deleted.");
    } catch (error) {
      console.error("Error deleting comment:", error);
      notifyError();
    }
  };

  return (
    <div>
      <Header />
      <div className="flex-column-center separate-post-container">
        <div key={post._id}>
          <div>
            <h2 className="separate-post-title">{post.title}</h2>
            <p className="separate-post-description">{post.description}</p>
            <div className="flex-row separate-tag-container">
              <p className="separate-post-tag">
                by {post?.user?.username || "Unknown Author"}
              </p>
              <p className="separate-post-tag">{post.tag}</p>
              <p className="separate-date-tag">
                {DateTime.fromISO(post.time).toLocaleString({
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          {post.image && (
            <img
              src={`https://narrative-08nb.onrender.com/${post.image}`}
              className="post-image"
            />
          )}
          <p className="separate-post-text">
            {DOMPurify.sanitize(removeHTMLTags(post.text))}
          </p>
        </div>
        <h3>Comments:</h3>
        <div className="comments-container flex-column">
          {post &&
            post?.comments?.map((comment, index) => (
              <div className="comment" key={comment._id}>
                <p className="text-comment">
                  {DOMPurify.sanitize(removeHTMLTags(comment.text))}
                </p>
                <p className="user-comment">
                  Posted by user &quot;{comment?.user?.username}&quot;
                </p>
                <div className="comments-buttons flex-row-center">
                  <button
                    className="header-button"
                    onClick={() => deleteComment(comment._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          {post?.comments && post?.comments?.length === 0 && (
            <div className="center padding">No comments yet.</div>
          )}
        </div>
      </div>
      <div className="flex-column">
        <h3 className="comment-heading">Leave your comment below: </h3>
        <form method="post" onSubmit={handleSubmitComment}>
          <div ref={editor} id="editor" />
          <div className="flex-row-center buttons-comment-container">
            <button type="submit" className="header-button">
              Submit
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default Post;
