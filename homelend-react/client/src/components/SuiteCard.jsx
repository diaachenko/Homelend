import { useState, useEffect } from 'react';

export default function SuiteCard({ suite, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (isOpen) {
      fetch(`/api/reviews/${suite.id}?page=${page}`)
        .then(res => res.json())
        .then(data => {
          setReviews(data.reviews);
          setTotalPages(data.totalPages);
        });
    }
  }, [isOpen, page, suite.id]);

  const handleAddReview = async () => {
    if (!reviewText.trim()) return;
    const token = localStorage.getItem('token');
    
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ apartmentId: suite.id, text: reviewText })
    });
    
    setReviewText('');
    setPage(1);
    const res = await fetch(`/api/reviews/${suite.id}?page=1`);
    const data = await res.json();
    setReviews(data.reviews);
    setTotalPages(data.totalPages);
  };

  return (
    <div className="property-card">
      <img src={suite.image} alt={suite.title} />
      <h3>{suite.title}</h3>
      <h5>{suite.price}</h5>
      
      <details open={isOpen}>
        <summary onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}>Details & Reviews</summary>
        <div className="details-container">
          <p>{suite.description}</p>
          
          <div style={{ background: '#f5f5f5', padding: '10px', marginTop: '10px' }}>
            <h4>Reviews:</h4>
            {reviews.map(r => (
              <p key={r.id} style={{fontSize:'12px', borderBottom:'1px solid #ddd'}}>
                <strong>{rev.user?.email ? rev.user.email.split('@')[0] : (rev.email || 'User')}:</strong> {rev.text}
              </p>
            ))}
            
            {totalPages > 1 && (
              <div style={{display:'flex', justifyContent:'space-between', margin:'10px 0'}}>
                <button disabled={page === 1} onClick={() => setPage(page-1)}>Prev</button>
                <span style={{fontSize:'12px'}}>Page {page} of {totalPages}</span>
                <button disabled={page === totalPages} onClick={() => setPage(page+1)}>Next</button>
              </div>
            )}

            {user ? (
              <div style={{display:'flex', gap:'5px', marginTop:'10px'}}>
                <input value={reviewText} onChange={e=>setReviewText(e.target.value)} placeholder="Write review..." />
                <button onClick={handleAddReview}>Send</button>
              </div>
            ) : <p style={{color:'red', fontSize:'12px'}}>Login to review</p>}
          </div>
        </div>
      </details>
    </div>
  );
}