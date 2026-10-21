import { createContext, useState, useEffect } from 'react';
import { useOrders } from './useOrders';

export const OrdersContext = createContext();
export { useOrders };

const ORDERS_STORAGE_KEY = 'nexo_orders';

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading orders from localStorage', e);
    }
    return [
      {
        id: '001',
        number: '001',
        restaurant: "McDonald's",
        restaurantIcon: '🍔',
        title: 'Combo Big Mac',
        description: 'Hamburguesa, papas y bebida.',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
        items: [
          { name: 'Combo Big Mac', quantity: 1, price: 25000 }
        ],
        quantity: 1,
        total: 25000,
        status: 'enviado',
        statusLabel: '🚚 Enviado',
        statusNote: 'Tu pedido está en camino',
        statusDesc: 'El repartidor lleva tu pedido hacia tu ubicación.',
        date: '19/10/2026',
        deliveryAddress: 'Calle 10 # 42-15, Medellín',
        repartidor: {
          id: 'rep-carlos',
          name: 'Carlos Rodríguez',
          role: 'Repartidor NEXO',
          photo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          rating: null,
          comment: null
        }
      },
      {
        id: '002',
        number: '002',
        restaurant: 'Subway',
        restaurantIcon: '🥪',
        title: 'Subway Pollo Teriyaki',
        description: 'Sándwich acompañado de bebida.',
        image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=500&q=80',
        items: [
          { name: 'Subway Pollo Teriyaki', quantity: 1, price: 22000 }
        ],
        quantity: 1,
        total: 22000,
        status: 'entregado',
        statusLabel: '✓ Entregado',
        statusNote: 'Pedido entregado',
        statusDesc: 'Esperamos que hayas disfrutado tu comida.',
        date: '18/10/2026',
        deliveryAddress: 'Calle 10 # 42-15, Medellín',
        repartidor: {
          id: 'rep-carlos',
          name: 'Carlos Rodríguez',
          role: 'Repartidor NEXO',
          photo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          rating: null,
          comment: null
        }
      },
      {
        id: '003',
        number: '003',
        restaurant: 'Frisby',
        restaurantIcon: '🍗',
        title: 'Pollo Frisby Arepas',
        description: '9 Presas Apanadas y 10 Arepas',
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80',
        items: [
          { name: 'Pollo Frisby Arepas', quantity: 1, price: 59900 }
        ],
        quantity: 1,
        total: 59900,
        status: 'entregado',
        statusLabel: '✓ Entregado',
        statusNote: 'Pedido entregado',
        statusDesc: 'Pedido completado con éxito.',
        date: '15/10/2026',
        deliveryAddress: 'Calle 10 # 42-15, Medellín',
        repartidor: {
          id: 'rep-carlos',
          name: 'Carlos Rodríguez',
          role: 'Repartidor NEXO',
          photo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          rating: 5,
          comment: 'Muy puntual y amable.'
        }
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders to localStorage', e);
    }
  }, [orders]);

  const createOrder = ({ items, subtotal, deliveryFee, total, address, paymentMethod, notes }) => {
    const nextNumber = String(orders.length + 1).padStart(3, '0');
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    
    const primaryItem = items[0] || {};
    const restaurantName = primaryItem.restaurant || 'NEXO Restaurante';

    let restaurantIcon = '🍴';
    if (restaurantName.toLowerCase().includes('frisby') || restaurantName.toLowerCase().includes('kfc')) restaurantIcon = '🍗';
    else if (restaurantName.toLowerCase().includes('mcdonald') || restaurantName.toLowerCase().includes('burger')) restaurantIcon = '🍔';
    else if (restaurantName.toLowerCase().includes('subway')) restaurantIcon = '🥪';
    else if (restaurantName.toLowerCase().includes('pizza')) restaurantIcon = '🍕';
    else if (restaurantName.toLowerCase().includes('santa')) restaurantIcon = '🍰';

    const newOrder = {
      id: nextNumber,
      number: nextNumber,
      restaurant: restaurantName,
      restaurantIcon: restaurantIcon,
      title: items.length === 1 ? primaryItem.name : `${primaryItem.name} + ${items.length - 1} más`,
      description: items.map(i => `${i.quantity}x ${i.name}`).join(', '),
      image: primaryItem.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
      items: items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
      quantity: items.reduce((acc, i) => acc + i.quantity, 0),
      subtotal,
      deliveryFee,
      total,
      status: 'en_preparacion',
      statusLabel: '🍳 En preparación',
      statusNote: 'Tu pedido se está preparando',
      statusDesc: 'El restaurante está cocinando tus deliciosos platillos.',
      date: formattedDate,
      deliveryAddress: address || 'Calle 10 # 42-15, Medellín',
      paymentMethod: paymentMethod || 'Efectivo contra entrega',
      notes: notes || '',
      repartidor: {
        id: 'rep-carlos',
        name: 'Carlos Rodríguez',
        role: 'Repartidor NEXO',
        photo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        rating: null,
        comment: null
      }
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  const clearAllOrders = () => {
    setOrders([]);
  };

  const rateDelivery = (orderId, rating, comment) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id === orderId || !orderId) {
          return {
            ...order,
            repartidor: {
              ...order.repartidor,
              rating: rating,
              comment: comment
            }
          };
        }
        return order;
      })
    );
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        createOrder,
        deleteOrder,
        clearAllOrders,
        rateDelivery
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}
