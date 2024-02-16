/* eslint-disable no-unused-vars */
import '../styles/createPost.css'
import '../styles/editor.css'
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from './Header'
import toast, { Toaster } from 'react-hot-toast';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; 

function CreatePost() {
  const notifySuccess = () => toast.success('Successfully created post!');
  const notifyError = () => toast.error('Something went wrong... Please try again');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    text: '',
    tag: '',
    user: ''
  });
  
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }
        const tokenWithoutBearer = token.replace('Bearer ', '');
        const response = await axios.get('http://localhost:3000', {
          headers: {
            Authorization: `Bearer ${tokenWithoutBearer}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching culture posts:', error);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('text', formData.text);
      formDataToSend.append('user', user.username);
      const selectedTag = document.getElementById('tags').value;
      formDataToSend.append('tag', selectedTag);
      await axios.post('http://localhost:3000/addpost', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      notifySuccess();
    } catch (error) {
      console.error('Error creating post:', error);
      notifyError();
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

    // Display editor
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
      
    return (
      <div>
      <Header />
          <h1 className='create-post-heading'>Welcome, {user.username}</h1>
          <p>Here you can share your thoughts and ideas</p>
          <form className='flex-column-center create-form-container' method='post' onSubmit={handleSubmit} encType='multipart/form-data'>
            <input type="text" name="title" placeholder='add title' onChange={handleChange}></input>
            <textarea type="text" name="description" placeholder='add brief description' onChange={handleChange}></textarea>
            <input type="file" name="image" onChange={handleChange}></input>
            <label className='tag'>Choose the relevant tag</label>
            <select id="tags" name="tags">
                <option value="Culture">Culture</option>
                <option value="People">People</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Technology">Technology</option>
            </select>
            <div className="flex-column">
              <div ref={editor} id="editor" />
                <div>
              </div>
            </div>
            <button className='create-post-submit' type='submit'>Submit</button>
          </form>
      </div>
    );
  }
  
  export default CreatePost;