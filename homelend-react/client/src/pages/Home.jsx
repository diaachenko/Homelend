import { Link } from 'react-router-dom';
import '../styles/main_style.css';

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-image">
            <img src="/images/heropage.png" alt="Homelend Hero" />
          </div>
          <div className="hero-content">
            <h1>Homelend</h1>
            <h2>Lend your new home here!</h2>
            <p>Experience seamless house renting with our premium suites. Your next adventure starts with a perfect stay.</p>
            <button>
              <Link to="/search" style={{textDecoration: 'none', color: 'inherit'}}>Book now</Link>
            </button>
          </div>
        </div>
      </section>

      <main>
        <section>
          <h1>About Homelend</h1>
          <p>Welcome to <strong>Homelend</strong>, the platform designed to redefine the rental experience by making the process of finding houses, flats, and private rooms more accessible and effortless than ever before. We believe that finding your next living space should be an exciting journey, not a burden. You can browse our extensive catalog and instantly secure your new home by exploring the <strong>'Pick your suite'</strong> section below. To give you complete control over your stay, the <strong>'My bookings'</strong> section serves as your personal dashboard where you can easily view and manage your current reservations. Finally, your satisfaction is our top priority; if you have any questions, need assistance, or simply want to share feedback regarding any topic, our dedicated team is always ready to assist you via the <strong>'Contact us'</strong> page.</p>
          <br/>
          <p>Our philosophy is built on the idea that a home is more than just four walls; it is a sanctuary. To facilitate this, we have developed an intuitive "Pick your suite" section below. This is not merely a list of properties; it is a strictly curated catalog where every listing undergoes a rigorous vetting process to ensure quality, safety, and comfort. From modern industrial lofts in the heart of the city to serene, rustic cabins tucked away in nature, our diverse portfolio allows you to browse, filter, and instantly secure your new home with just a few clicks. We have stripped away the paperwork and the waiting times, placing the power of choice directly into your hands.</p>
          <br/>
          <p>We also understand that modern life requires flexibility. That is why we engineered the "My bookings" section to serve as your comprehensive personal dashboard. This feature gives you complete autonomy over your stay. Here, you can view real-time details of your upcoming trips, access check-in instructions, download receipts, or modify dates if your plans change. We believe that technology should work for you, providing a seamless integration of hospitality and digital convenience that keeps you organized and stress-free.</p>
          <br/>
          <p>Finally, we know that technology is nothing without human connection. Your satisfaction is our absolute top priority. We have built a support infrastructure that ensures you are never alone in your journey. If you have any questions about a property, need assistance with a payment, or simply want to share feedback regarding any topic, our dedicated team of rental experts is standing by. By visiting the "Contact us" page, you gain direct access to our support staff who are ready to assist you with unwavering commitment and care. At Homelend, we aren't just finding you a place to sleep; we are welcoming you home.</p>
        </section>
      </main>
    </>
  );
}