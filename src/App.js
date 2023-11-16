import logo from './logo.svg';
import './App.css';
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const clientId = "480801324706-b4fjshrfrfom25j91fo4edl1aomkepsk.apps.googleusercontent.com"


function App() {
  
  useEffect(() => {
    function start() {
      gapi.client.init({clientId:clientId, scope: ""})
  };
  
    gapi.load('client:auth2', start);
});
  
  return (
    <div class="goologin" className="App">
      <LoginButton />
      <br></br>
      <LogoutButton />
    </div>
  );
}

export default App;