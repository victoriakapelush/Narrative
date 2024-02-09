/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import '../styles/home.css'
import '../styles/editor.css'
import React, { useRef, useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { DateTime } from 'luxon';
import Header from './Header'
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Add Quill styles

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

      const isMounted = useRef(false);
      const editor = useRef(null);
      const quillRef = useRef(null);
    
      useEffect(() => {
        if (!isMounted.current) {
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

        // Event handler for submit button
  const handleSubmit = () => {
    const quill = quillRef.current;
    if (quill) {
      // Retrieve the content from the Quill editor
      const content = quill.root.innerHTML;
      // Perform any action here, such as submitting the content to a server
      console.log('Content:', content);
    }
  };
  
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
          </div>
          <div className="flex-column">
            <h3 className='comment-heading'>Leave your comment below: </h3>
            <div ref={editor} id="editor"/>
            <div className='flex-row-center buttons-comment-container'>
              <button onClick={handleSubmit} type='submit' className='header-button'>Submit</button>
              <button className='header-button'>Modify</button>
              <button className='header-button'>Delete</button>
            </div>
          </div>
      </div>
    );
  }
  
  export default Post;