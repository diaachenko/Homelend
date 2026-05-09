import SuiteCard from '../components/SuiteCard';
import '../styles/bookings_style.css';

export default function Bookings({ suites, bookedSuites, toggleBooking, user }) {
  const userBookings = suites.filter(suite => bookedSuites[suite.id]);

  return (
    <main>
      <div className="text">
        <h1>My Bookings</h1>
        <p>Welcome to your personal travel command center. From here, you can take full control of your itinerary. Seamlessly manage your upcoming adventures by modifying dates, selecting seats, or adding special requests. Need to look back? Dive into your travel history to revisit past destinations, download invoices for expense reporting, or re-book your favorite stays with a single click. Whether you’re planning for tomorrow or remembering yesterday, everything you need is right at your fingertips.</p>
      </div>
      <br />

      <section>
        <div className="text"><h2>Upcoming Stays</h2></div>
        <br />
        <section>
          <div className="cards" id="cards">
            {userBookings.length > 0 ? (
              userBookings.map(suite => (
                <SuiteCard 
                  key={suite.id} 
                  suite={suite} 
                  isBookingPage={true}
                  onToggleBooking={toggleBooking}
                  user={user}
                />
              ))
            ) : (
              <p>No active bookings.</p>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}