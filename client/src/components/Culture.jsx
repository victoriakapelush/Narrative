/* eslint-disable no-unused-vars */
import Header from './Header'
import '../styles/home.css'
import '../styles/post.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { DateTime } from 'luxon';

function Culture() {
  const navigate = useNavigate();
  const [culturePosts, setCulturePosts] = useState([]);

  useEffect(() => {
    const fetchCulturePosts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }
        const tokenWithoutBearer = token.replace('Bearer ', '');
        const response = await axios.get('http://localhost:3000/culture', {
          headers: {
            Authorization: `Bearer ${tokenWithoutBearer}`,
          },
        });
        setCulturePosts(response.data);
      } catch (error) {
        console.error('Error fetching culture posts:', error);
      }
    };
    fetchCulturePosts();
  }, []);

    return(
        <div>
            <Header />
            <div className='page-container'>
                <h1>Culture</h1>
                <p>Culture in web technologies and development is a dynamic force that shapes trends, innovation, and collaboration, influencing how teams work together and impacting the evolving landscape of digital solutions.</p>
            </div>
            {culturePosts.length > 0 ? (
              <div className='flex-row post-wrapper'>
              {culturePosts.map((post) => (
                <Link to={post._id} key={post._id} className='flex-row-center post-container'>
                {post.image && <img src={`http://localhost:3000/`+`${post.image}`} className="image square"></img>}
                <div className='flex-column post-brief-info square'>
                  <h2>{post.title}</h2>
                  <p className='post-description'>{post.description}</p>
                  <div className='flex-row tag-date-container'>
                    <p className='post-date'>{post.tag}</p>
                    <p className='post-date'>{DateTime.fromISO(post.time).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
              </Link>
          ))}
        </div>
      ) : (
        <p>Please login to view posts</p>
      )}
        </div>
    )
}

export default Culture