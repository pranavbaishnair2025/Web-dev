import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
  const { search, setSearch, category, setCategory, sortBy, setSortBy, filteredProducts } = useShop();
  const categories = ['All', 'Audio', 'Wearables', 'Computers', 'Accessories', 'Photography'];

  return (
    <div className="page products-page">
      <div className="section-header">
        <h1>Products</h1>
        <p>Browse, search, and filter your favorites.</p>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="featured">Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
