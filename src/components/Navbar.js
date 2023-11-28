import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className='navbar'>
      <div className='navbar-logo'>
        <img alt='icon' src='icon.png'/>
      </div>
      <ul className='navbar-menu'>
        <li>
          <Link to="/home">
              <div className='home-icon'>
                <img alt='icon' src='homeicon.png'/>
              </div>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <div className='profile-icon'>
              <img alt='icon' src='defaultprofile.png'/>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar