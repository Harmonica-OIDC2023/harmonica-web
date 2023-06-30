import React from 'react';
import './NavBar.css';

function NavBar() {
  return (
    <div className="nav-bar" style={{height: '100vh'}}>
      <div className="menu h-100">
        <img src="icons/fi-rr-envelope.png" alt='envelop icon'/>
        <img src="icons/fi-rr-home.png" alt='home icon' />
        <img src="icons/fi-rr-network-cloud.png" alt='network cloud icon' />
        <img src="icons/fi-rr-network.png" alt='network icon' />
        <img src="icons/fi-rr-screen.png" alt='screen icon' />
        <img src="icons/fi-rr-user.png" alt='user icon' />
      </div>
    </div>
  );
}

export default NavBar;