import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddApartment({ user }) {
  const [formData, setFormData] = useState({ title: '', price: '', address: '', description: '', image: '' });
  const navigate = useNavigate();

  if (!user) return <main><h2 style={{textAlign:'center'}}>Login required!</h2></main>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const res = await fetch('/api/apartments', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ ...formData, price: `$${formData.price}/night` })
    });

    if (res.ok) {
      alert("Apartment added successfully!");
      navigate('/search');
      window.location.reload();
    }
  };

  return (
    <main style={{ display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '400px', background: 'white', padding: '20px', borderRadius: '10px' }}>
        <h2>Add your Apartment</h2>
        <input placeholder="Title (e.g. Cozy Cabin)" onChange={e => setFormData({...formData, title: e.target.value})} required />
        <input type="number" placeholder="Price per night ($)" onChange={e => setFormData({...formData, price: e.target.value})} required />
        <input placeholder="Address" onChange={e => setFormData({...formData, address: e.target.value})} required />
        <textarea placeholder="Description" onChange={e => setFormData({...formData, description: e.target.value})} required />
        <input placeholder="Image URL (http...)" onChange={e => setFormData({...formData, image: e.target.value})} required />
        <button type="submit" className="book-btn">Add Property</button>
      </form>
    </main>
  );
}