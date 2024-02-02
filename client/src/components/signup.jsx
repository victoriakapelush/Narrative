import '../styles/signup.css'
import Header from './header'
import { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to the registration endpoint
      await axios.post('/api/register', { username, password });

      // Clear form after successful registration
      setUsername('');
      setPassword('');
      alert('User registered successfully');
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again.');
    }
  };
  return (
    <div>
        <Header />
        <div className='home-login flex-column-center'>
            <h1>Sign up to create posts,<br/> and leave comments on Narrative</h1>
            <div>
                <form className='login-form flex-column-center' onSubmit={handleSignup}>
                    <input type="text" placeholder='username' className='login-input' name='username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    <input type="password" placeholder='password' className='login-input' name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button type='submit' className='header-button login-btn'>Sign up</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup