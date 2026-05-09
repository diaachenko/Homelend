import { useState } from 'react';
import SuiteCard from '../components/SuiteCard';
import MapComponent from '../components/MapComponent';
import '../styles/search_style.css';

export default function Search({ suites, bookedSuites, toggleBooking, user }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMapView, setIsMapView] = useState(false);
  const [sortOrder, setSortOrder] = useState('none');
  const [maxPrice, setMaxPrice] = useState(500);

  const getPriceNum = (str) => parseInt(str.replace(/\D/g, '')) || 0;

  let processedSuites = suites.filter(suite => {
    const matchesSearch = suite.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (suite.description && suite.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPrice = getPriceNum(suite.price) <= maxPrice;
    return matchesSearch && matchesPrice;
  });

  if (sortOrder === 'asc') processedSuites.sort((a, b) => getPriceNum(a.price) - getPriceNum(b.price));
  else if (sortOrder === 'desc') processedSuites.sort((a, b) => getPriceNum(b.price) - getPriceNum(a.price));

  return (
    <main>
      <div className="text"><h1>Pick your suite</h1><p>Finding your next home shouldn't be a hassle...</p></div>
      
      <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
        <div className="search-wrapper" style={{ boxShadow: 'none', padding: '0', marginBottom: '15px' }}>
          <i className="fa-solid fa-magnifying-glass search-icon"></i> 
          <input type="text" id="bookingSearch" placeholder="Search by name or desc..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '15px' }}>
          <div>
            <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Sort by Price:</label>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '5px' }}>
              <option value="none">Default</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Max Price: ${maxPrice}</label>
            <input type="range" min="50" max="1000" step="10" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} style={{ width: '100%' }} />
          </div>
        </div>
      </div>
      
      <div className="text" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Available suites ({processedSuites.length})</h2>
        <button className="toggleView" onClick={() => setIsMapView(!isMapView)}>{isMapView ? "Switch to Cards" : "Switch to Map"}</button>
      </div>
      <br />
      
      <section>
        {!isMapView ? (
          <div className="cards">
            {processedSuites.map(suite => <SuiteCard key={suite.id} suite={suite} isBooked={!!bookedSuites[suite.id]} onToggleBooking={toggleBooking} user={user} />)}
          </div>
        ) : (
          <div className="map-container" style={{ display: 'block' }}>
            <MapComponent suites={processedSuites} bookedSuites={bookedSuites} toggleBooking={toggleBooking} />
          </div>
        )}
      </section>
    </main>
  );
}