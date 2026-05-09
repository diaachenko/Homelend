import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { collection, getDocs, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from './firebase';

import './styles/style.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Bookings from './pages/Bookings';
import Contacts from './pages/Contacts';
import Auth from './pages/Auth';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const [suites, setSuites] = useState([]);
  const [bookedSuites, setBookedSuites] = useState({});
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists() && userDoc.data().bookings) {
            setBookedSuites(userDoc.data().bookings);
          } else {
            setBookedSuites({});
          }
        } catch (error) {
          console.error("Помилка завантаження бронювань:", error);
        }
      } else {
        setBookedSuites({});
      }
      setIsLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchSuites = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "apartments"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSuites(data);
      } catch (err) { console.error("Firebase fetch error:", err); }
    };
    fetchSuites();
  }, []);

  const toggleBooking = async (suiteId) => {
  if (!user) {
    alert("Please login to book a suite!");
    return;
  }

  const updatedBookings = { ...bookedSuites };
  if (updatedBookings[suiteId]) {
    delete updatedBookings[suiteId];
  } else {
    updatedBookings[suiteId] = true;
  }

  setBookedSuites(updatedBookings);

  try {
    await updateDoc(doc(db, "users", user.uid), { 
      bookings: updatedBookings 
    });
  } catch (error) {
    await setDoc(doc(db, "users", user.uid), { 
      bookings: updatedBookings 
    });
  }
};

  return (
    <>
      <div id="top"></div>
      <Header user={user} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search suites={suites} bookedSuites={bookedSuites} toggleBooking={toggleBooking} user={user} />} />
        
        <Route path="/bookings" element={
          <ProtectedRoute user={user} isLoading={isLoading}>
            <Bookings suites={suites} bookedSuites={bookedSuites} toggleBooking={toggleBooking} user={user} />
          </ProtectedRoute>
        } />
        
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Footer />
    </>
  );
}