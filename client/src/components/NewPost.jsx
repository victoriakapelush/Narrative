/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import Header from './header';
import { useState, useEffect } from 'react';
import axios from 'axios';

function NewPost() {
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:3000/create_post')
        .then(response => {
          setAllPosts(response.data);
        })
        .catch(error => {
          console.error('Error fetching all data:', error);
        });
    }, []);

    return(
        <div>
            <Header />
            {allPosts.map((post) => (
                <div key={post._id}>
                    {post.title}
                    {post.description}
                    </div>
            ))}
        </div>
    )
}

export default NewPost