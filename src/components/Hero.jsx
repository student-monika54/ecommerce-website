function Hero() {
  return (
    <section className="hero">
      <div className="container hero__content">
        <p className="hero__eyebrow">New season essentials</p>
        <h1>Find simple, stylish products for everyday life.</h1>
        <p className="hero__description">
          ShopEase brings together a small collection of practical products
          chosen to make browsing quick and easy.
        </p>

        {/* The CTA is present for the landing page, but no extra functionality is needed. */}
        <button className="button button--primary" type="button">
          Shop Now
        </button>
      </div>
    </section>
  );
}

export default Hero;