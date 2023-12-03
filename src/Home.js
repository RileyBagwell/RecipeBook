import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import LogoutButton from './components/logout';
import api from './services/api';
import { gapi } from 'gapi-script'
import PostWall from './PostWall';

const clientId = "480801324706-b4fjshrfrfom25j91fo4edl1aomkepsk.apps.googleusercontent.com";

function Home() {
  const [userInfo, setUserInfo] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postText, setPostText] = useState('');

  useEffect(() => {
    // Function to initialize Google API
    function start() {
      gapi.client.init({ clientId: clientId, scope: "" });
    }

    // Load Google API
    gapi.load('client:auth2', start);

    // Make API call to get user information
    const userId = '123'; 
    api.getUserInfo(userId)
      .then(data => {
        console.log('User Info Response:', data);

        // Set the retrieved user information to the component state
        setUserInfo(data);
      })
      .catch(error => {
        console.error('Error fetching user information:', error);
      });
  }, []);

  const handleCreatePost = async () => {
    try {
      // Call the createPost function
      window.location.reload();
      await api.createPost(userInfo.userID, postTitle, '', postText);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  useEffect(() => {
    console.log('User Info State:', userInfo);
  }, [userInfo]);

  return (
    <div className='App'>
      <Navbar />
      <div className="gologout">
        <LogoutButton />
      </div>
      <div className='wall'></div>
      <div className='create-post'>
        <h2>Create a New Post</h2>
        <label>Title:</label>
        <input type="text" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
        <br></br>
        <textarea value={postText} onChange={(e) => setPostText(e.target.value)} />
        <button onClick={handleCreatePost}>Create Post</button>
      </div>
      <div className='feed'>
        <h2>New Recipe for Ratatouille</h2><br></br>
        <h4>Preheat the oven for 375˚F (190˚C).
Using a sharp knife or a mandoline, slice the eggplant, tomatoes, squash, and zucchini into approximately ¹⁄₁₆-inch (1-mm)-thick rounds, then set aside.
Make the sauce: Heat the olive oil in a 12-inch (30-cm) oven-safe pan over medium-high heat. Sauté the onion, garlic, and bell peppers until soft, about 10 minutes. Season with salt and pepper, then add the crushed tomatoes. Stir until the ingredients are fully incorporated. Remove from heat, then add the basil. Stir once more, then smooth the surface of the sauce with a spatula.
Arrange the veggies in alternating slices, (for example, eggplant, tomato, squash, zucchini) on top of the sauce, working from the outer edge to the center.
Enjoy!</h4>
      <h2>Easy to Make Steak Sauce</h2><br></br>
        <h4>Once you’re done making your steak (I suggest reverse searing), all you need to take it over the top is the special sauce. These are our best steak sauce recipes: super easy steak sauces that have 6 ingredients or less and are easy to whip up while your steaks are reverse searing the oven. Never pay extra for sauce at a steakhouse again!

Steak sauce will absolutely elevate your steak from just grilling to a full restaurant at home dining experience. Why have naked steak when you can drench your steak in a delicious, mouth watering sauce catered to your favorite flavors?!

</h4>
      </div>
      <PostWall />
    </div>
  );
}

export default Home;
