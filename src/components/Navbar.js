import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className='navbar'>
     <div className='navbar-logo'>
      <img alt='icon' src='icon.png'/>
     </div>
     <ul className='navbar-menu'>
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/profile">Profile</Link></li>
     </ul>
    </div>
  )
}

export default Navbar