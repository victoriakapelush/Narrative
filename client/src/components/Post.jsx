/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import '../styles/home.css'
import '../styles/editor.css'
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { DateTime } from 'luxon';
import Header from './Header'
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; 
import toast, { Toaster } from 'react-hot-toast';
import DOMPurify from 'dompurify';

function removeHTMLTags(textWithTags) {
  if (!textWithTags) return ""; // Handle case where textWithTags is null or undefined
  return textWithTags.replace(/<[^>]*>/g, '');
}

function Post() {
  const [post, setPost] = useState({ title: "", description: "", user: "", tag: "", time: "", text: "", comments: [] });
  const { id } = useParams();



  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get(`http://localhost:3000/all/${id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
    };
    fetchItems();
  });

  const isMounted = useRef(false);
  const editor = useRef(null);

  useEffect(() => {
    if (!isMounted.current && editor.current) {
      editor.current = new Quill('#editor', {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline'],
            ['link'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['clean']
          ]
        }
      });
      isMounted.current = true;
    }
  }, []);

  const notifySuccess = () => toast.success('Successfully created comment!');
  const notifyError = () => toast.error('Something went wrong... Please try again');

  const handleSubmitComment = useCallback(async (e) => {
    e.preventDefault();
    try {
      const quill = editor.current;
      if (!quill) return;
      const content = quill.root.innerHTML;
      const trimmedContent = content.trim();
      if (!trimmedContent) {
        return;
      }
      console.log('HTML content:', trimmedContent);
      const response = await axios.post(`http://localhost:3000/all/${id}`, { text: trimmedContent });
      setPost(prevPost => ({
        ...prevPost,
        comments: [...prevPost.comments, response.data._id]
      }));
      console.log('Updated post after adding comment:', post);
      notifySuccess();
      quill.setText('');
    } catch (error) {
      console.error('Error creating comment:', error);
      notifyError();
    }
  }, [id, post]);
  
  return (
    <div>
      <Header />
      <div className='flex-column-center separate-post-container'>
        <div key={post._id}>
          <div>
            <h2 className='separate-post-title'>{post.title}</h2>
            <p className='separate-post-description'>{post.description}</p>
            <div className='flex-row separate-tag-container'>
              <p className='separate-post-tag'>by {post.user || "Unknown Author"}</p>
              <p className='separate-post-tag'>{post.tag}</p>
              <p className='separate-date-tag'>{DateTime.fromISO(post.time).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
          {post.image && <img src={`http://localhost:3000/${post.image}`} className="post-image" alt={post.title} />}
            <p className='separate-post-text'>{post.text}</p>
        </div>
        <ul>
          {post.comments && post.comments.map((comment, index) => (
            <li key={index}>{DOMPurify.sanitize(removeHTMLTags(comment))}</li>
          ))}
          {post.comments && post.comments.length === 0 && <li>No comments yet.</li>}
        </ul>
      </div>
      <div className="flex-column">
        <h3 className='comment-heading'>Leave your comment below: </h3>
        <form method='post' onSubmit={handleSubmitComment}>
          <div ref={editor} id="editor" />
          <div className='flex-row-center buttons-comment-container'>
            <button type='submit' className='header-button'>Submit</button>
            <button className='header-button'>Modify</button>
            <button className='header-button'>Delete</button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default Post;
