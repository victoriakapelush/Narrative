import '../styles/home.css';
import Header from './Header';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DateTime } from 'luxon';

// Create a new context for managing authentication state

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        // Check if the user is logged in
        const response = await axios.get('http://localhost:3000');
        setIsLoggedIn(response.data.loggedIn);

        // If the user is logged in, fetch posts
        if (response.data.loggedIn) {
          const postsResponse = await axios.get('http://localhost:3000/all');
          setPosts(postsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <Header />
      {isLoggedIn ? (
        posts.length > 0 ? (
          <div className='flex-row post-wrapper'>
            {posts.map((post) => (
              <Link to={post._id} key={post._id} className='flex-row-center post-container'>
                {post.image && <img src={`http://localhost:3000/${post.image}`} className="image square" alt="post"></img>}
                <div className='flex-column post-brief-info square'>
                  <h2>{post.title}</h2>
                  <p className='post-description'>{post.description}</p>
                  <div className='flex-row tag-date-container'>
                    <p className='post-date'>{post.tag}</p>
                    <p className='post-date'>{DateTime.fromISO(post.time).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>Please log in to view posts</p>
        )
      ) : (
        <p>Please log in to view posts</p>
      )}
    </div>
  );
}

export default Home;



