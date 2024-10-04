/* eslint-disable no-unused-vars */
import Header from "./Header";
import "../styles/home.css";
import "../styles/post.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { DateTime } from "luxon";

function Category() {
  const { category } = useParams(); // Get the category from the URL
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  // Define content for different categories
  const categoryContent = {
    culture: {
      title: "Culture",
      description:
        "Culture in web technologies and development is a dynamic force that shapes trends, innovation, and collaboration, influencing how teams work together and impacting the evolving landscape of digital solutions.",
    },
    lifestyle: {
      title: "Lifestyle",
      description:
        "In web technologies and development, the lifestyle is often characterized by a fast-paced and flexible environment, where continuous learning, remote work, and a passion for problem-solving shape the way professionals navigate the ever-changing landscape of digital innovation.",
    },
    people: {
      title: "People",
      description:
        "People in web technologies and development are the driving force behind innovation, collaboration, and the creation of user-centric digital experiences, contributing to the dynamic and evolving nature of the field.",
    },
    technology: {
      title: "Technology",
      description:
        "Technology in web technologies and development is a constantly evolving force that drives innovation, enabling the creation of sophisticated and efficient digital solutions to meet the ever-changing demands of the online landscape.",
    },
  };

  // Get current category's title and description
  const currentCategory = categoryContent[category] || {
    title: "Unknown Category",
    description: "No description available for this category.",
  };

  // Fetch all posts by category/tag
  useEffect(() => {
    const fetchPostsByCategory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/"); // Redirect to homepage if no token is found
          return;
        }
        const tokenWithoutBearer = token.replace("Bearer ", "");
        const response = await axios.get(
          `http://localhost:8000/api/posts/${category}`,
          {
            headers: {
              Authorization: `Bearer ${tokenWithoutBearer}`,
            },
          },
        );
        setPosts(response.data); // Set the fetched posts
      } catch (error) {
        console.error(`Error fetching ${category} posts:`, error);
        setPosts([]);
      }
    };

    fetchPostsByCategory();
  }, [category]);

  return (
    <div>
      <Header />
      <div className="page-container">
        <h1>{currentCategory.title}</h1>
        <p>{currentCategory.description}</p>
      </div>
      {posts.length > 0 ? (
        <div className="flex-row post-wrapper">
          {posts.map((post) => (
            <Link
              to={post._id}
              key={post._id}
              className="flex-row-center post-container"
            >
              {post.image && (
                <img
                  src={`http://localhost:8000/` + `${post.image}`}
                  className="image square"
                ></img>
              )}
              <div className="flex-column post-brief-info square">
                <h2>{post.title}</h2>
                <p className="post-description">{post.description}</p>
                <div className="flex-row tag-date-container">
                  <p className="post-date">{post.tag}</p>
                  <p className="post-date">
                    {DateTime.fromISO(post.time).toLocaleString({
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>Please login to view posts</p>
      )}
    </div>
  );
}

export default Category;
