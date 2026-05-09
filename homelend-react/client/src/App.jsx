import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Bookings from './pages/Bookings';
import Contacts from './pages/Contacts';
import Auth from './pages/Auth';
import AddApartment from './pages/AddApartment';

export default function App() {
  const [suites, setSuites] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    
    fetch('/api/apartments')
      .then(res => res.json())
      .then(data => setSuites(data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <div id="top"></div>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search suites={suites} user={user} />} />
        <Route path="/auth" element={<Auth setUser={setUser} />} />
        <Route path="/add-apartment" element={<AddApartment user={user} />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
      <Footer />
    </>
  );
}