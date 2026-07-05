import { useShop } from '../context/ShopContext';

export default function CartPage() {
  const { cart, removeFromCart, changeQuantity, totalItems, totalPrice } = useShop();

  return (
    <div className="page cart-page">
      <div className="section-header">
        <h1>Your Cart</h1>
        <p>{totalItems} item(s) selected</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Add some products to continue shopping.</p>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => changeQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
                <button className="secondary-btn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <aside className="summary-card">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>
            <div className="summary-row">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
            <button className="primary-btn full-width">Checkout</button>
          </aside>
        </div>
      )}
    </div>
  );
}
