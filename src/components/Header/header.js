import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/road-2-sobriety-logo.png';
import '../Header/header.scss'

function Header() {
  return (
    <header>
      <div className="title">
      <Link  className='logo__container' to="/">
          <img className="title__logo" src={logo} alt="road2recovery" />
        </Link>
     
        <nav className="title__nav__bar">
          <Link className="title__nav__bar-link" to="/centermap"> Map</Link>
          <Link className="title__nav__bar-link title title-success-stories" to="/testimonial/upload"> Success Stories</Link>
          <Link className="title__nav__bar-link title title-calendar" to="/calendar"> Calendar</Link>
        </nav>
        
      </div>
    </header>
  );
}

export default Header;
