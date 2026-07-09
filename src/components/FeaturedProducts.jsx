import products from '../data/products';
import ProductCard from './ProductCard';

function FeaturedProducts() {
  return (
    <section className="featured-products" id="featured-products">
      <div className="container">
        <div className="section-heading">
          <p className="section-heading__eyebrow">Featured Products</p>
          <h2>Popular picks from our small collection</h2>
        </div>

        {/* Exactly four hardcoded products are rendered here from the local data file. */}
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;