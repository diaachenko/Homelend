import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export default function MapComponent({ suites, bookedSuites, toggleBooking }) {
  return (
    // ДОДАНО style={{ height: '600px', ... }} - це гарантує, що мапа з'явиться!
    <MapContainer 
      center={[49.841, 24.031]} 
      zoom={12} 
      style={{ height: '600px', width: '100%', borderRadius: '12px', zIndex: 1 }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {suites.map(suite => {
        const isBooked = !!bookedSuites[suite.id];

        const customIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div class="custom-pin ${isBooked ? 'is-booked-marker' : ''}"></div>`,
          iconSize: [30, 42],
          iconAnchor: [15, 42],
          popupAnchor: [0, -40]
        });

        return (
          <Marker key={suite.id} position={[suite.lat || 49.84, suite.lng || 24.03]} icon={customIcon}>
            <Popup>
              <div className="map-popup-card">
                <img src={suite.image} alt={suite.title} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
                <h3 style={{margin: '5px 0', fontSize: '16px', color: '#061B38'}}>{suite.title}</h3>
                <button 
                  className={`book-btn ${isBooked ? 'is-booked' : ''}`} 
                  disabled={isBooked}
                  onClick={() => toggleBooking(suite.id)}
                  style={{width: '100%', padding: '8px', fontSize: '14px'}}>
                  {isBooked ? 'Booked' : 'Book'}
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}