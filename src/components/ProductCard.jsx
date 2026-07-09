function ProductCard({ product }) {
  return (
    <article className="product-card">
      <img className="product-card__image" src={product.image} alt={product.name} />
      <div className="product-card__body">
        <h3>{product.name}</h3>
        <p className="product-card__price">{product.price}</p>
        <button className="button button--secondary" type="button">
          View Product
        </button>
      </div>
    </article>
  );
}

export default ProductCard;