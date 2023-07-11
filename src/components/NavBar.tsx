import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLHeadingElement>) => {
    navigate('/');
  }

  return (
    <div className="nav-bar">
      <div className="menu h-100">
        <img src="icons/fi-rr-home.png" alt='home icon' onClick={handleClick} />
        <img src="icons/fi-rr-envelope.png" alt='envelop icon' style={{pointerEvents:'none'}} />
        <img src="icons/fi-rr-network-cloud.png" alt='network cloud icon' style={{pointerEvents:'none'}} />
        <img src="icons/fi-rr-network.png" alt='network icon' style={{pointerEvents:'none'}} />
        <img src="icons/fi-rr-screen.png" alt='screen icon' style={{pointerEvents:'none'}} />
        <img src="icons/fi-rr-user.png" alt='user icon' style={{pointerEvents:'none'}} />
      </div>
    </div>
  );
}

export default NavBar;