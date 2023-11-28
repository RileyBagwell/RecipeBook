import React from 'react';
import Navbar from './components/Navbar';
import LogoutButton from "./components/logout";
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';

const clientId = "480801324706-b4fjshrfrfom25j91fo4edl1aomkepsk.apps.googleusercontent.com"

function Home() {

  useEffect(() => {
    function start() {
      gapi.client.init({clientId:clientId, scope: ""})
  };
  
    gapi.load('client:auth2', start);
});

  return (
    <div className='App'>
      <Navbar></Navbar>
      <div class="gologout" className="App">
        <LogoutButton />
      </div>
    </div>
  )
}

export default Home