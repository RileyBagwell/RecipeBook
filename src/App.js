import './App.css';
import LoginButton from "./components/login";
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
    <div className="App">
      <div className="gologin"><LoginButton /></div>
      <div className="loginbox">
      <div className="innerloginbox"></div></div>
    </div>
  );
}

export default App;