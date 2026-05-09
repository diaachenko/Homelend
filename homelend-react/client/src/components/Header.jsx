import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function Header({ user }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    document.body.classList.remove('no-scroll');
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleNav = (e, path) => {
    e.preventDefault();
    if (location.pathname === path) window.scrollTo({ top: 0, behavior: 'smooth' });
    else navigate(path);
  };

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <div className="logo"><a href="/" onClick={(e) => handleNav(e, '/')}><img src="/images/logo.svg" alt="Logo" className="logo-img" /></a></div>
      <nav>
        <button className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`} onClick={() => { setIsMenuOpen(!isMenuOpen); document.body.classList.toggle('no-scroll'); }}>
          <span></span><span></span><span></span>
        </button>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="mobile-nav-links">
          <li><a href="#/search" onClick={(e) => handleNav(e, '/search')}>Pick your suite</a></li>
          <li><a href="#/bookings" onClick={(e) => handleNav(e, '/bookings')}>My bookings</a></li>
          <li><a href="#/contacts" onClick={(e) => handleNav(e, '/contacts')}>Contact us</a></li>
          {user ? (
            <li><button onClick={() => signOut(auth)} style={{padding: '8px 15px', background: '#061B38', color: 'white'}}>Logout ({user.email.split('@')[0]})</button></li>
          ) : (
            <li><button onClick={(e) => handleNav(e, '/auth')} style={{padding: '8px 15px'}}>Login</button></li>
          )}
        </ul>
      </nav>
    </header>
  );
}