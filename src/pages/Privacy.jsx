export default function Privacy() {
  return (
    <section className="plp-page legal-page">
      <div className="plp-inner">
        <h1 className="plp-category-title">Privacy Policy</h1>
        <div className="legal-content">
          <h2>1. Information We Collect</h2>
          <p>
            We may collect information you provide directly, such as your name,
            email address, shipping address, and payment details when you make a
            purchase or create an account.
          </p>
          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to process orders, improve our
            services, communicate with you about your orders, and send
            promotional materials if you have opted in.
          </p>
          <h2>3. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal data against unauthorized access, alteration,
            disclosure, or destruction.
          </p>
          <h2>4. Cookies</h2>
          <p>
            Our website may use cookies to enhance your browsing experience and
            remember your preferences. You can control cookie settings through
            your browser.
          </p>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </section>
  );
}
