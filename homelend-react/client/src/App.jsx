import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './styles/style.css';
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
  const [bookedSuites, setBookedSuites] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    const savedBookings = localStorage.getItem('bookedSuites');
    if (savedBookings) setBookedSuites(JSON.parse(savedBookings));

    fetch('/api/apartments')
      .then(res => res.json())
      .then(data => setSuites(data))
      .catch(err => console.error("Error fetching apartments:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const toggleBooking = (suiteId) => {
    if (!user) {
      alert("Please login to book a suite!");
      return;
    }

    setBookedSuites(prev => {
      const updated = { ...prev };

      if (updated[suiteId]) {
        delete updated[suiteId];
      } else {
        updated[suiteId] = true;
      }

      localStorage.setItem('bookedSuites', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <>
      <div id="top"></div>
      <Header user={user} onLogout={handleLogout} />
      
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/search" element={
          <Search suites={suites} bookedSuites={bookedSuites} toggleBooking={toggleBooking} user={user} />
        } />

        <Route path="/bookings" element={
          <Bookings suites={suites} bookedSuites={bookedSuites} toggleBooking={toggleBooking} user={user} />
        } />
        
        <Route path="/auth" element={<Auth setUser={setUser} />} />
        <Route path="/add-apartment" element={<AddApartment user={user} />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
      
      <Footer />
    </>
  );
}