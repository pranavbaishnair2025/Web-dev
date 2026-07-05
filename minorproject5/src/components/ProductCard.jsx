import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { addToCart } = useShop();

  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <p className="category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="rating">★ {product.rating}</p>
        <div className="price-row">
          <span>${product.price}</span>
          <div className="actions">
            <Link to={`/products/${product.id}`} className="secondary-btn">
              Details
            </Link>
            <button className="primary-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
