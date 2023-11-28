import React from 'react'

function Navbar() {
  return (
    <div className='navbar'>
     <div className='navbar-logo'>
      <img src='icon.png'/>
     </div>
     <ul className='navbar-menu'>
      <li><a href="/home">Home</a></li>
      <li><a href="/profile">Profile</a></li>
     </ul>
    </div>
  )
}

export default Navbar