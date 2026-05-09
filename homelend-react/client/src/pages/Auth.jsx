import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      navigate('/search');
    } else {
      alert(data.error);
    }
  };

  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '400px' }}>
        <h2>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="email" placeholder="Email" value={email} onChange={(e=>setEmail(e.target.value))} required />
          <input type="password" placeholder="Password" value={password} onChange={(e=>setPassword(e.target.value))} required />
          <button type="submit" className="book-btn">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)} style={{cursor:'pointer', color:'#5AC1C0', marginTop:'10px'}}>
          {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
        </p>
      </div>
    </main>
  );
}