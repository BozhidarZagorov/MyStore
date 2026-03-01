export default function Contact() {
  return (
    <section className="plp-page legal-page">
      <div className="plp-inner">
        <h1 className="plp-category-title">Contact Us</h1>
        <div className="plp-category-description">
          <p>We'd love to hear from you. Get in touch using the details below.</p>
          <h2>Email</h2>
          <p>
            <a href="mailto:support@mystore.example" className="legal-link">
              somesupport@mystore.example
            </a>
          </p>
          <h2>Phone</h2>
          <p>+359 11 222 3333</p>
          <h2>Address</h2>
          <p>
            123 MyStore SomeStreet
            <br />
            The City, CC 12345
          </p>
          <h2>Business Hours</h2>
          <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
          <p>Saturday: 10:00 AM – 4:00 PM</p>
        </div>
      </div>
    </section>
  );
}
