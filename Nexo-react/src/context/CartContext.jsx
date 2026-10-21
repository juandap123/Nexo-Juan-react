import { createContext, useState, useEffect } from 'react';
import { useCart } from './useCart';

export const CartContext = createContext();
export { useCart };

const STORAGE_KEY = 'nexo_cart';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
    }
    return [
      {
        id: 'combo-personal',
        slug: 'combo-personal',
        name: 'Combo Personal',
        title: 'Combo Personal Frisby',
        restaurant: 'Frisby',
        price: 25900,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=90',
        description: 'Pollo, papas y bebida.'
      },
      {
        id: 'hamburguesa-clasica',
        slug: 'hamburguesa-doble',
        name: 'Hamburguesa Clásica',
        title: 'Hamburguesa Doble Burger King',
        restaurant: 'Burger King',
        price: 24900,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=90',
        description: 'Hamburguesa, papas y bebida.'
      }
    ];
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cartItems]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const addToCart = (product, quantity = 1) => {
    if (!product) return;
    const productId = product.id || product.slug;
    
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productId || item.slug === productId);
      if (existing) {
        return prev.map(item =>
          item.id === productId || item.slug === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: productId,
            slug: product.slug || productId,
            name: product.name || product.title,
            title: product.title || product.name,
            restaurant: product.restaurantName || product.restaurant || 'NEXO',
            price: Number(product.price) || 20000,
            quantity: quantity,
            image: product.image,
            description: product.description || product.subtitle || ''
          }
        ];
      }
    });

    showToast(`¡${product.name || product.title} agregado al carrito!`);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId && item.slug !== productId));
    showToast('Producto eliminado del carrito', 'info');
  };

  const updateQuantity = (productId, delta) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === productId || item.slug === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 3000 : 0;
  const total = subtotal + deliveryFee;

  const formatPrice = (val) => {
    return '$' + Number(val).toLocaleString('es-CO');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        deliveryFee,
        total,
        formatPrice,
        toast,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
