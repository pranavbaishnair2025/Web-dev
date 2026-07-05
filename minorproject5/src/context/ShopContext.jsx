import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ShopContext = createContext();

const PRODUCT_DATA = [
  {
    id: 1,
    name: 'Aurora Headphones',
    price: 129,
    category: 'Audio',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    description: 'Immersive sound with noise cancellation and all-day comfort.'
  },
  {
    id: 2,
    name: 'Luma Smart Watch',
    price: 189,
    category: 'Wearables',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80',
    description: 'Track fitness, receive notifications, and stay connected on the go.'
  },
  {
    id: 3,
    name: 'Nova Laptop',
    price: 899,
    category: 'Computers',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
    description: 'Lightweight performance laptop designed for creativity and work.'
  },
  {
    id: 4,
    name: 'Terra Backpack',
    price: 79,
    category: 'Accessories',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    description: 'Durable travel backpack with smart compartments and weather protection.'
  },
  {
    id: 5,
    name: 'Glow Camera',
    price: 549,
    category: 'Photography',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
    description: 'Capture crystal-clear photos with adaptive autofocus and cinematic video.'
  },
  {
    id: 6,
    name: 'Echo Speaker',
    price: 99,
    category: 'Audio',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
    description: 'Powerful sound in a compact body with room-filling bass.'
  }
];

export function ShopProvider({ children }) {
  const [products] = useState(PRODUCT_DATA);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('novacart-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    localStorage.setItem('novacart-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);
      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  };

  const changeQuantity = (productId, amount) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (search) {
      list = list.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== 'All') {
      list = list.filter((product) => product.category === category);
    }

    if (sortBy === 'low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, search, category, sortBy]);

  const value = {
    products,
    cart,
    search,
    setSearch,
    category,
    setCategory,
    sortBy,
    setSortBy,
    filteredProducts,
    addToCart,
    removeFromCart,
    changeQuantity,
    totalItems,
    totalPrice,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  return useContext(ShopContext);
}
