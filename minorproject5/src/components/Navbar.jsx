import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function Navbar() {
  const { totalItems } = useShop();

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        NovaCart
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
      </div>
    </nav>
  );
}
