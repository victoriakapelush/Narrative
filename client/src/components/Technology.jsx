/* eslint-disable no-unused-vars */
import Header from './Header'
import '../styles/home.css'
import '../styles/post.css'
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { DateTime } from 'luxon';

function Technology() {
    const [techPosts, setTechPosts] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:3000/technology')
        .then(response => {
          setTechPosts(response.data);
        })
        .catch(error => {
          console.error('Error fetching culture posts:', error);
        });
    }, []);

    return(
        <div>
            <Header />
            <div className='page-container'>
                <h1>Technology</h1>
                <p>Technology in web technologies and development is a constantly evolving force that drives innovation, enabling the creation of sophisticated and efficient digital solutions to meet the ever-changing demands of the online landscape.</p>
            </div>
            {techPosts.length > 0 ? (
        <div className='flex-row post-wrapper'>
          {techPosts.map((post) => (
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

export default Technology