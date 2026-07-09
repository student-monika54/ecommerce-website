import './styles.css';

const coffees = [
  {
    name: 'Espresso',
    price: '$3.50',
    image: 'https://placehold.co/600x400/3b2f2f/fff?text=Espresso',
  },
  {
    name: 'Cappuccino',
    price: '$4.25',
    image: 'https://placehold.co/600x400/5c4033/fff?text=Cappuccino',
  },
  {
    name: 'Latte',
    price: '$4.75',
    image: 'https://placehold.co/600x400/6f4e37/fff?text=Latte',
  },
  {
    name: 'Mocha',
    price: '$5.00',
    image: 'https://placehold.co/600x400/8b5e3c/fff?text=Mocha',
  },
];

const app = document.querySelector('#app');

app.innerHTML = `
  <header class="navbar">
    <div class="container navbar__inner">
      <a class="logo" href="#home">CoffeeHouse</a>
      <nav class="nav-links" aria-label="Main navigation">
        <a href="#home">Home</a>
        <a href="#menu">Menu</a>
      </nav>
    </div>
  </header>

  <main id="home">
    <section class="hero container">
      <p class="hero__tag">Fresh coffee, simple choices</p>
      <h1>Start your day with a cup that fits your mood.</h1>
      <p class="hero__text">
        Explore a small coffee menu with a clean layout, quick navigation, and
        four featured drinks.
      </p>
      <a class="button" href="#menu">Shop Now</a>
    </section>

    <section class="menu container" id="menu">
      <div class="section-heading">
        <p class="section-heading__tag">Featured Products</p>
        <h2>Coffee Menu</h2>
      </div>

      <div class="cards">
        ${coffees
          .map(
            (coffee) => `
              <article class="card">
                <img src="${coffee.image}" alt="${coffee.name}" class="card__image" />
                <div class="card__body">
                  <h3>${coffee.name}</h3>
                  <p class="card__price">${coffee.price}</p>
                  <button type="button" class="card__button">View Product</button>
                </div>
              </article>
            `
          )
          .join('')}
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container footer__inner">
      <p>CoffeeHouse</p>
      <p>Simple coffee menu for the homepage.</p>
    </div>
  </footer>
`;