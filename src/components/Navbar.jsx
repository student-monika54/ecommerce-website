function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        {/* Logo and primary navigation for the homepage. */}
        <a className="navbar__brand" href="/" aria-label="ShopEase home">
          ShopEase
        </a>

        <nav className="navbar__links" aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/products">Products</a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;