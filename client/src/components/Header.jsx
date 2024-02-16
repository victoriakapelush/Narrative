import '../styles/header.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://narrative-08nb.onrender.com');
      const { token } = response.data;
      localStorage.removeItem('token', token);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
    <div className='flex-row-spacebtw header'>
      <div className='website-name'>
        <Link to="/">Narrative</Link>
      </div>
      <div className='flex-row-center'>
        <Link to='/all' className='header-link'>All</Link>
        <Link to='/culture' className='header-link'>Culture</Link>
        <Link to='/lifestyle' className='header-link'>Lifestyle</Link>
        <Link to='/technology' className='header-link'>Technology</Link>
        <Link to='/people' className='header-link'>People</Link>
      </div>
      <div className='flex-row-center'>
        <Link to='/addpost' className='header-button'>Create Post</Link>
        <Link to='/signup' className='header-button'>Sign up</Link>
        <form method='post' onClick={handleSubmit}>
          <button type='submit' className='header-button logout-btn'>Log out</button>
        </form>
      </div>
    </div>
  )
}

export default Header