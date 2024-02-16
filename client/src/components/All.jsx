import '../styles/home.css';
import Header from './Header';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { DateTime } from 'luxon';

function Home() {
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }
        const tokenWithoutBearer = token.replace('Bearer ', '');
        const response = await axios.get('https://narrative-08nb.onrender.com/all', {
          headers: {
            Authorization: `Bearer ${tokenWithoutBearer}`,
          },
        });
        setAllPosts(response.data);
      } catch (error) {
        console.error('Error fetching all posts:', error);
      }
    };
    fetchAllPosts();
  }, []);

  return (
    <div>
      <Header />
      {allPosts.length > 0 ? (
          <div className='flex-row post-wrapper'>
            {allPosts.map((post) => (
              <Link to={post._id} key={post._id} className='flex-row-center post-container'>
                {post.image && <img src={`https://narrative-08nb.onrender.com/${post.image}`} className="image square" alt="post"></img>}
                <div className='flex-column post-brief-info square'>
                  <h2>{post.title}</h2>
                  <p className='post-description'>{post.description}</p>
                  <div className='flex-row tag-date-container'>
                    <p className='post-date flex-row-center'>{post.user || "Unknown Author"}</p>
                    <p className='post-date flex-row-center'>{post.tag}</p>
                    <p className='post-date flex-row-center'>{DateTime.fromISO(post.time).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>Please login to view posts</p>
        )
      }
    </div>
  );
}

export default Home;



