import '../styles/home.css';
import { useState } from 'react';

function Main() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            window.location.href = '/all';
        } catch (error) {
            console.error('Login error:', error);
            // Handle login error (e.g., display error message to the user)
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/logout', {
                method: 'POST'
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            // Redirect the user to the homepage or login page
            window.location.href = '/';
        } catch (error) {
            console.error('Logout error:', error);
            // Handle logout error (e.g., display error message to the user)
        }
    };

    return (
        <div>
            <div className='home-login flex-column-center'>
                <h1>Thoughts, stories and <br/> ideas from Narrative</h1>
                <p>*Login to leave comments and post your stories</p>
                <div>
                    <form className='login-form flex-column-center' onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder='Username' 
                            className='login-input'
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <input 
                            type="password" 
                            placeholder='Password' 
                            className='login-input'
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <button type='submit' className='header-button login-btn'>Log in</button>
                    </form>
                    <button onClick={handleLogout} className='header-button logout-btn'>Log out</button>
                </div>
            </div>
        </div>
    );
}

export default Main;
