import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const { products } = useShop();
  const featured = products.slice(0, 3);

  return (
    <div className="page home-page">
      <section className="hero">
        <div>
          <p className="eyebrow">New season arrivals</p>
          <h1>Shop tech, style, and everyday essentials in one place.</h1>
          <p>Discover curated gadgets, accessories, and smart gear built for modern life.</p>
          <div className="hero-actions">
            <Link to="/products" className="primary-btn">Explore Products</Link>
            <Link to="/cart" className="secondary-btn">View Cart</Link>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/products">See all</Link>
        </div>
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
