// api.js

const BASE_URL = 'http://127.0.0.1:5000';

const api = {
  getUserInfo: async (userId) => {
    // Implement the getUserInfo function
    // Make a GET request to the Flask server to fetch user information
    const response = await fetch(`${BASE_URL}/api/user/${userId}`);
    const data = await response.json();
    return data;
  },

  createPost: async (userID, postTitle, postImage, postText) => {
    try {
      const response = await fetch(`${BASE_URL}/api/create_post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID, postTitle, postImage, postText }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error; // Re-throw the error to handle it in the component
    }
  },

  // Function to get 10 latest posts
  getTenPosts: async (buffer) => {
    const response = await fetch(`${BASE_URL}/api/ten_posts/${buffer}`);
    const data = await response.json();
    return data;
  },

};

export default api;
