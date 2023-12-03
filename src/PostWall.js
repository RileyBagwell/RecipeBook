// PostWall.js

import React, { useEffect, useState } from 'react';
import api from './services/api'; // Assuming you have a file for API calls

const PostWall = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Make API call to get 10 latest posts
    const buffer = 0; // Adjust the buffer as needed
    api.getTenPosts(buffer)
      .then(data => {
        console.log('Posts Response:', data);

        // Set the retrieved posts to the component state
        setPosts(data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div>
      <h2></h2>
      {posts.map(post => (
        <div key={post.postID}>
          <h3>{post.postTitle}</h3>
          <p>{post.postText}</p>
        </div>
      ))}
    </div>
  );
};

export default PostWall;
