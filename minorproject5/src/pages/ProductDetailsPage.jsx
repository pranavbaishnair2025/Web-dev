import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { products, addToCart } = useShop();
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return <div className="page">Product not found.</div>;
  }

  return (
    <div className="page details-page">
      <Link to="/products" className="secondary-btn back-link">← Back to Products</Link>
      <div className="details-card">
        <img src={product.image} alt={product.name} />
        <div className="details-info">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="rating">★ {product.rating}</p>
          <p>{product.description}</p>
          <div className="price-block">
            <h2>${product.price}</h2>
            <button className="primary-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
