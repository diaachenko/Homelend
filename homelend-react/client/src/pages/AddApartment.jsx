import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddApartment({ user }) {
  const [formData, setFormData] = useState({ 
    title: '', price: '', address: '', description: '', lat: '', lng: '' 
  });
  const [imageBase64, setImageBase64] = useState('');
  const navigate = useNavigate();

  if (!user) return <main><h2 style={{textAlign:'center', marginTop: '50px'}}>Login required!</h2></main>;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageBase64) {
      alert("Please select an image!");
      return;
    }

    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch('/api/apartments', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          ...formData, 
          price: `$${formData.price}/night`,
          image: imageBase64,
          lat: parseFloat(formData.lat), // Перетворюємо в число
          lng: parseFloat(formData.lng)  // Перетворюємо в число
        })
      });

      if (res.ok) {
        alert("Apartment added successfully!");
        navigate('/search');
        window.location.reload();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form 
        onSubmit={handleSubmit} 
        style={{ 
          display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', 
          maxWidth: '500px', background: 'white', padding: '30px', 
          borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
        }}
      >
        <h2 style={{textAlign: 'center', margin: '0 0 10px 0', color: '#061B38'}}>Add your Apartment</h2>
        
        <input 
          placeholder="Title (e.g. Cozy Cabin)" 
          onChange={e => setFormData({...formData, title: e.target.value})} 
          required 
          style={inputStyle} 
        />
        
        <input 
          type="number" 
          placeholder="Price per night ($)" 
          onChange={e => setFormData({...formData, price: e.target.value})} 
          required 
          style={inputStyle} 
        />
        
        <input 
          placeholder="Address" 
          onChange={e => setFormData({...formData, address: e.target.value})} 
          required 
          style={inputStyle} 
        />

        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="number" step="any" placeholder="Latitude (e.g. 49.84)" 
            onChange={e => setFormData({...formData, lat: e.target.value})} 
            required 
            style={{...inputStyle, flex: 1}} 
          />
          <input 
            type="number" step="any" placeholder="Longitude (e.g. 24.03)" 
            onChange={e => setFormData({...formData, lng: e.target.value})} 
            required 
            style={{...inputStyle, flex: 1}} 
          />
        </div>
        
        <textarea 
          placeholder="Description" 
          onChange={e => setFormData({...formData, description: e.target.value})} 
          required 
          style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} 
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#061B38' }}>Upload Image:</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            required 
            style={{ padding: '8px', border: '1px dashed #ccc', borderRadius: '8px', cursor: 'pointer' }} 
          />

          {imageBase64 && (
            <img src={imageBase64} alt="Preview" style={{ marginTop: '10px', width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
          )}
        </div>
        
        <button 
          type="submit" 
          style={{
            backgroundColor: '#061B38',
            color: 'white', 
            border: 'none', 
            padding: '12px', 
            borderRadius: '8px', 
            cursor: 'pointer', 
            fontWeight: 'bold', 
            fontSize: '16px',
            marginTop: '10px',
            transition: '0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#FCBE3B'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#061B38'}
        >
          Add Property
        </button>
      </form>
    </main>
  );
}

const inputStyle = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '15px',
  outline: 'none',
  fontFamily: 'inherit'
};