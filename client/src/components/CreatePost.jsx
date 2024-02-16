/* eslint-disable no-unused-vars */
import '../styles/createPost.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from './Header'
import toast, { Toaster } from 'react-hot-toast';

function CreatePost() {
  const notifySuccess = () => toast.success('Successfully created post!');
  const notifyError = () => toast.error('Something went wrong... Please try again');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    text: '',
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
      
    return (
      <div>
      <Header />
          <h1 className='create-post-heading'>Welcome, {user.username}</h1>
          <p>Here you can share your thoughts and ideas</p>
          <form className='flex-column-center create-form-container' method='post' onSubmit={handleSubmit} encType='multipart/form-data'>
            <label className='title'>Title</label>
            <input type="text" name="title" placeholder='title' onChange={handleChange}></input>
            <label className='description'>Brief description</label>
            <textarea type="text" name="description" placeholder='description' onChange={handleChange}></textarea>
            <label>Add Image</label>
            <input type="file" name="image" onChange={handleChange}></input>
            <label className='text'>Text</label>
            <textarea type="text" name="text" onChange={handleChange} placeholder='text'></textarea>
            <label className='tag'>Choose the relevant tag</label>
            <select id="tags" name="tags">
                <option value="Culture">Culture</option>
                <option value="People">People</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Technology">Technology</option>
            </select>
            <button className='create-post-submit' type='submit'>Submit</button>
          </form>
      </div>
    );
  }
  
  export default CreatePost;