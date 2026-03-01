export default function Terms() {
  return (
    <section className="plp-page legal-page">
      <div className="plp-inner">
        <h1 className="plp-category-title">Terms & Conditions</h1>
        <div className="legal-content">
          <h2>1. General</h2>
          <p>
            Welcome to MyStore. By accessing and using this website, you accept
            and agree to be bound by these Terms and Conditions. If you do not
            agree to these terms, please do not use our services.
          </p>
          <h2>2. Use of Service</h2>
          <p>
            You agree to use this website only for lawful purposes and in a way
            that does not infringe the rights of others or restrict their use
            and enjoyment of the service.
          </p>
          <h2>3. Products & Orders</h2>
          <p>
            We reserve the right to limit quantities, correct errors, and
            discontinue products at any time without prior notice. All product
            descriptions and prices are subject to change.
          </p>
          <h2>4. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and
            images, is the property of MyStore and is protected by applicable
            laws.
          </p>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </section>
  );
}
