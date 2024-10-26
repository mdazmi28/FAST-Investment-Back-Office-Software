import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Hamburger } from '../assets/hamburger.svg';
import '../styles/Navbar.css';
import { USER_NAME } from '../constants';


const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const username=localStorage.getItem(USER_NAME);


  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          MyNote
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
          menu
        </div>
        <div className='nav-elements'>
            user:{username}
        </div>
        <div className={`nav-elements`}>
          <ul>
            {/* <li>
              <NavLink to="/">Home</NavLink>

            </li> */}

            <li>
              <NavLink to="/logout">Logout</NavLink>
            </li>
            {/* <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/projects">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;