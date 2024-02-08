/* eslint-disable no-unused-vars */
import '../styles/createPost.css'
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { DateTime } from 'luxon';
import Header from './Header'

function CreatePost() {
    return (
      <div>
      <Header />
          <h1 className='create-post-heading'>Welcome, username</h1>
          <p>Here you can share your thoughts and ideas</p>
          <form className='flex-column-center create-form-container'>
            <label className='title'>Title</label>
            <input type="text" placeholder='title' ></input>
            <label className='description'>Brief description</label>
            <textarea type="text" placeholder='description'></textarea>
            <label>Add Image</label>
            <input type='file'></input>
            <label className='text'>Text</label>
            <textarea type="text" placeholder='text'></textarea>
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