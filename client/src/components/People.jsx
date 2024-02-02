/* eslint-disable no-unused-vars */
import Header from './Header'
import '../styles/pages.css'
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { DateTime } from 'luxon';

function People() {
    const [peoplePosts, setPeoplePosts] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:3000/people')
        .then(response => {
          setPeoplePosts(response.data);
        })
        .catch(error => {
          console.error('Error fetching culture posts:', error);
        });
    }, []);

    return(
        <div>
            <Header />
            <div className='page-container'>
                <h1>People</h1>
                <p>People in web technologies and development are the driving force behind innovation, collaboration, and the creation of user-centric digital experiences, contributing to the dynamic and evolving nature of the field.</p>
            </div>
            {peoplePosts.length > 0 ? (
        <div className='flex-row post-wrapper'>
          {peoplePosts.map((post) => (
            <a key={post._id} className='flex-row-center post-container'>
              {post.image && <img src={`http://localhost:3000/`+`${post.image}`} className="image square"></img>}
              <div className='flex-column post-brief-info square'>
                <h2>{post.title}</h2>
                <p className='post-description'>{post.description}</p>
                <div className='flex-row tag-date-container'>
                  <p className='post-date'>{post.tag}</p>
                  <p className='post-date'>{DateTime.fromISO(post.time).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p>No posts found</p>
      )}
        </div>
    )
}

export default People