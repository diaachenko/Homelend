import { useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

export default function SuiteCard({ suite, isBooked, onToggleBooking, isBookingPage, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [localReviews, setLocalReviews] = useState(suite.reviews || []);

  const handleAddReview = async () => {
    if (!reviewText.trim() || !user) return;
    
    const newReview = { 
      email: user.email, 
      text: reviewText, 
      date: new Date().toLocaleDateString() 
    };
    
    try {
      await updateDoc(doc(db, "apartments", suite.id), { 
        reviews: arrayUnion(newReview) 
      });
      setLocalReviews([...localReviews, newReview]);
      setReviewText('');
    } catch (err) { 
      alert("Помилка відправки відгуку. Спробуйте пізніше."); 
      console.error(err);
    }
  };

  return (
    <div className="property-card">
      <img src={suite.image} alt={suite.title} />
      <h3>{suite.title}</h3>
      
      {/* ВИГЛЯД КАРТКИ НА СТОРІНЦІ "MY BOOKINGS" */}
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
      
      /* ВИГЛЯД КАРТКИ НА СТОРІНЦІ "SEARCH" */
        <>
          <h5>{suite.price}</h5>
          <details open={isOpen}>
            {/* Відкриваємо/закриваємо тільки при кліку на заголовок */}
            <summary onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}>
              Details & Reviews
            </summary>
            
            <div className="details-container">
                <div>
                    <p><strong>Address:</strong> {suite.address}</p>
                    <p>{suite.description}</p>
                    <ul>
                      {suite.features?.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                    
                    {/* СЕКЦІЯ ВІДГУКІВ */}
                    <div style={{ marginTop: '15px', padding: '10px', background: '#f5f5f5', borderRadius: '8px' }}>
                      <h4 style={{ margin: '0 0 10px 0' }}>Reviews:</h4>
                      
                      {localReviews.length > 0 ? (
                        <ul style={{ paddingLeft: '0', listStyle: 'none', margin: '0 0 10px 0' }}>
                          {localReviews.map((rev, i) => (
                            <li key={i} style={{fontSize:'13px', borderBottom:'1px solid #ddd', paddingBottom: '4px', marginBottom: '4px'}}>
                              <strong>{rev.email}:</strong> {rev.text}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{fontSize: '13px'}}>No reviews yet.</p>
                      )}

                      {/* Форма відгуку ТІЛЬКИ для авторизованих */}
                      {user ? (
                        <div style={{ display: 'flex', gap: '5px' }}>
                          <input 
                            type="text" 
                            placeholder="Write a review..." 
                            value={reviewText} 
                            onChange={(e) => setReviewText(e.target.value)} 
                            style={{ flex: 1, padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} 
                          />
                          <button 
                            onClick={handleAddReview} 
                            style={{ padding: '5px 10px', fontSize: '14px' }}>
                            Send
                          </button>
                        </div>
                      ) : (
                        <p style={{ fontSize: '12px', color: '#690914', margin: 0, fontWeight: 'bold' }}>
                          * Please login to leave a review.
                        </p>
                      )}
                    </div>
                </div>
            </div>
          </details>

          {/* КНОПКА БРОНЮВАННЯ (Тільки для авторизованих) */}
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