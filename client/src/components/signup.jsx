/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import '../styles/signup.css'
import Header from './Header';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

function Signup() {
  const notifySuccess = () => toast.success('Successfully registered!');
  const notifyError = () => toast.error('Something went wrong... Please try again');
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    password: "",
    username: "",
  });
  const { password, username } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message, token } = data;
      console.log("Token received:", token);
      if (success) {
        localStorage.setItem('token', token);
        notifySuccess();
        setTimeout(() => {
          navigate("/all");
        }, 1000);
      } else {
        notifyError(); 
      }
    } catch (error) {
      console.log(error);
    }

    setInputValue({
      ...inputValue,
      password: "",
      username: "",
    });
  };

  return (
    <div>
        <Header />
        <div className='home-login flex-column-center'>
            <h1>Sign up to create posts,<br/> and leave comments on Narrative</h1>
            <div>
                <form className='login-form flex-column-center' onSubmit={handleSubmit} method="post">
                    <input type="text" placeholder='username' className='login-input' name='username' value={username} onChange={handleOnChange}></input>
                    <input type="password" placeholder='password' className='login-input' name="password" value={password} onChange={handleOnChange}></input>
                    <button type='submit' className='header-button login-btn'>Sign up</button>
                    <Toaster />
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup