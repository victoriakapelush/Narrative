/* eslint-disable no-unused-vars */
import Header from './Header'
import '../styles/home.css'
import '../styles/post.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { DateTime } from 'luxon';

function Lifestyle() {
  const navigate = useNavigate();
  const [lifestylePosts, setLifestylePosts] = useState([]);

  useEffect(() => {
    const fetchLifestylePosts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }
        const tokenWithoutBearer = token.replace('Bearer ', '');
        const response = await axios.get('http://localhost:3000/lifestyle', {
          headers: {
            Authorization: `Bearer ${tokenWithoutBearer}`,
          },
        });
        setLifestylePosts(response.data);
      } catch (error) {
        console.error('Error fetching lifestyle posts:', error);
      }
    };
    fetchLifestylePosts();
  }, []);

    return(
        <div>
            <Header />
            <div className='page-container'>
                <h1>Lifestyle</h1>
                <p>In web technologies and development, the lifestyle is often characterized by a fast-paced and flexible environment, where continuous learning, remote work, and a passion for problem-solving shape the way professionals navigate the ever-changing landscape of digital innovation.</p>
            </div>
            {lifestylePosts.length > 0 ? (
        <div className='flex-row post-wrapper'>
          {lifestylePosts.map((post) => (
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
        <p>No posts found</p>
      )}
      </div>
    )
}

export default Lifestyle