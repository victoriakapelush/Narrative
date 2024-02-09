/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import '../styles/home.css'
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { DateTime } from 'luxon';
import Header from './Header'

function Post() {
    const [post, setPost] = useState({
        title: '',
        text: '',
        image: '',
        description: '',
        tag: '',
        time: '',
        user: 'Unknown Author'
      });
    
      const { id } = useParams();
    
      useEffect(() => {
        axios
          .get(`http://localhost:3000/all/${id}`)
          .then((res) => {
            setPost({
              title: res.data.title,
              description: res.data.description,
              text: res.data.text,
              tag: res.data.tag,
              image: res.data.image,
              time: res.data.time,
              user: res.data.user || "Unknown Author"
            });
          })
          .catch((err) => {
            console.log('Unable to extract data');
          });
      }, [id]);
  
    return (
      <div>
      <Header />
          <div className='flex-column-center separate-post-container'>
            <div key={post._id}>
              <div>
                <h2 className='separate-post-title'>{post.title}</h2>
                <p className='separate-post-description'>{post.description}</p>
                <div className='flex-row separate-tag-container'>
                  <p className='separate-post-tag'>{post.user}</p>
                  <p className='separate-post-tag'>{post.tag}</p>
                  <p className='separate-date-tag'>{DateTime.fromISO(post.time).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
              {post.image && <img src={`http://localhost:3000/${post.image}`} className="post-image" alt={post.title} />}
                <p className='separate-post-text'>{post.text}</p>
            </div>
          </div>
      </div>
    );
  }
  
  export default Post;