/* eslint-disable no-unused-vars */
import '../styles/home.css'
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { DateTime } from 'luxon';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/')
    .then((res) => {
      console.log('API Response:', res.data);
      setPosts(res.data);
    })
    .catch((err) => {
      console.log('Error fetching posts:', err);
    });
  }, []);

  return (
    <div>
      <div className='home-login flex-column-center'>
          <h1>Thoughts, stories and <br/> ideas from Narrative</h1>
          <div>
              <form className='login-form flex-column-center'>
                  <input type="text" placeholder='username' className='login-input'></input>
                  <input type="password" placeholder='password' className='login-input'></input>
                  <button type='submit' className='header-button login-btn'>Log in</button>
              </form>
          </div>
      </div>
      {posts.length > 0 ? (
        <div className='flex-row post-wrapper'>
          {posts.map((post) => (
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

export default Home