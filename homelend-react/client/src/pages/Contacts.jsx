import '../styles/contacts_style.css';

export default function Contacts() {
  return (
    <main>
      <section>
        <h1>Contact us</h1>
        <p>Finding a place to call home—or finding the right person to live in yours—is a big deal, and you shouldn't have to do it alone. That’s why the Homelend team is always standing by, ready to help. We’ve made it easier than ever to get in touch with a real person who understands your needs. Below, you’ll find all the necessary details to reach out to us via phone, email, or live chat. No question is too small and no concern is too minor; if it matters to you, it matters to us. Let’s start a conversation today and move you one step closer to your goals.</p>
      </section>
      <br />
      <section>
        <h3>Reach out digitally</h3>
        <ul className="contact-list">
          <li> Email us: <a href="mailto:nazar.diachenko.oi.2024@lpnu.ua">nazar.diachenko.oi.2024@lpnu.ua</a></li>
          <li> Call us: <a href="tel:+380972118929">+380972118929</a></li>
        </ul>
      </section>
      <br />
      <section>
        <h3>Visit our office</h3>
        <address>
          Homelend HQ<br/>
          Volodymyra Velykoho str., 23<br/>
          Lviv, Ukraine<br/>
          79031
        </address>
        <br />
        <iframe 
          src="https://maps.google.com/maps?q=Volodymyra+Velykoho+St,+23,+Lviv,+Ukraine&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="250" 
          style={{ border: 0, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
          allowFullScreen="" 
          loading="lazy">
        </iframe>
      </section>
    </main>
  );
}