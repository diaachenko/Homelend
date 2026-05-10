import { useState, useEffect } from 'react';

export default function SuiteCard({ suite, isBooked, onToggleBooking, isBookingPage, user }) {
  const [isOpen, setIsOpen] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  const suiteId = suite?.id;

  const fetchReviews = async (currentPage) => {
    if (!suiteId) return;
    setIsLoadingReviews(true);
    try {
      const res = await fetch(`/api/reviews/${suiteId}?page=${currentPage}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews || []);
        setTotalPages(data.totalPages || 1);
      } else {
        setReviews([]);
      }
    } catch (err) {
      console.error("Failed to fetch reviews", err);
      setReviews([]);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  useEffect(() => {
    if (isOpen && !isBookingPage && suiteId) {
      fetchReviews(page);
    }
  }, [isOpen, page, suiteId, isBookingPage]);

  const handleAddReview = async () => {
    if (!reviewText.trim() || !suiteId) return;
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ apartmentId: suiteId, text: reviewText })
      });

      if (res.ok) {
        setReviewText('');
        setPage(1);
        fetchReviews(1);
      } else {
        alert("Помилка відправки відгуку. Перевірте, чи ви авторизовані.");
      }
    } catch (err) {
      console.error(err);
      alert("Щось пішло не так!");
    }
  };

  const getReviewerName = (rev) => {
    if (rev?.user?.email) return rev.user.email.split('@')[0];
    if (rev?.email) return rev.email.split('@')[0];
    return 'User';
  };

  if (!suite) return null;

  return (
    <div className="property-card">
      <img src={suite.image || '/images/placeholder.jpg'} alt={suite.title || 'Apartment'} />
      <h3>{suite.title || 'Untitled Suite'}</h3>
      
      {isBookingPage ? (
        <>
          <p><strong>Status:</strong> <span className="status-confirmed">Confirmed</span></p>
          <h5>Total: {suite.price}</h5>
          <button 
            className="book-btn" 
            style={{backgroundColor: '#061B38', color: 'white'}} 
            onClick={() => { 
              if(window.confirm("Cancel this booking?")) onToggleBooking(suite.id); 
            }}>
            Cancel Booking
          </button>
        </>
      ) : (
      
        <>
          <h5>{suite.price}</h5>
          <details open={isOpen}>
            <summary onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}>
              Details & Reviews
            </summary>
            
            <div className="details-container">
                <div>
                    <p><strong>Address:</strong> {suite.address}</p>
                    <p>{suite.description}</p>
                    
                    {suite.features && suite.features.length > 0 && (
                      <ul>
                        {suite.features.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    )}

                    <div style={{ marginTop: '15px', padding: '10px', background: '#f5f5f5', borderRadius: '8px' }}>
                      <h4 style={{ margin: '0 0 10px 0' }}>Reviews:</h4>
                      
                      {isLoadingReviews ? (
                        <p style={{fontSize: '13px', color: '#666'}}>Loading reviews...</p>
                      ) : reviews.length > 0 ? (
                        <>
                          <ul style={{ paddingLeft: '0', listStyle: 'none', margin: '0 0 10px 0' }}>
                            {reviews.map((rev, i) => (
                              <li key={i} style={{fontSize:'13px', borderBottom:'1px solid #ddd', paddingBottom: '4px', marginBottom: '4px'}}>
                                <strong>{getReviewerName(rev)}:</strong> {rev.text}
                              </li>
                            ))}
                          </ul>
                          
                          {totalPages > 1 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' }}>
                              <button 
                                disabled={page === 1} 
                                onClick={() => setPage(page - 1)}
                                style={{ padding: '3px 8px', fontSize: '12px', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
                              >
                                &larr; Prev
                              </button>
                              <span style={{fontSize: '12px', color: '#555'}}>Page {page} of {totalPages}</span>
                              <button 
                                disabled={page === totalPages} 
                                onClick={() => setPage(page + 1)}
                                style={{ padding: '3px 8px', fontSize: '12px', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
                              >
                                Next &rarr;
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <p style={{fontSize: '13px'}}>No reviews yet.</p>
                      )}

                      {user ? (
                        <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                          <input 
                            type="text" 
                            placeholder="Write a review..." 
                            value={reviewText} 
                            onChange={(e) => setReviewText(e.target.value)} 
                            style={{ flex: 1, padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} 
                          />
                          <button 
                            onClick={handleAddReview} 
                            style={{ padding: '5px 10px', fontSize: '14px', backgroundColor: '#FCBE3B', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', color: '#061B38' }}>
                            Send
                          </button>
                        </div>
                      ) : (
                        <p style={{ fontSize: '12px', color: '#690914', margin: '10px 0 0 0', fontWeight: 'bold' }}>
                          * Please login to leave a review.
                        </p>
                      )}
                    </div>
                </div>
            </div>
          </details>

          {user ? (
            <button 
              className={`book-btn ${isBooked ? 'is-booked' : ''}`} 
              disabled={isBooked} 
              onClick={() => onToggleBooking(suite.id)}>
              {isBooked ? 'Booked' : 'Book'}
            </button>
          ) : (
            <p style={{ 
              marginTop: '15px', 
              fontSize: '14px', 
              fontWeight: 'bold', 
              color: '#061B38', 
              textAlign: 'center',
              padding: '10px',
              border: '1px dashed #FCBE3B',
              borderRadius: '8px'
            }}>
              You must be logged in to book.
            </p>
          )}
        </>
      )}
    </div>
  );
}