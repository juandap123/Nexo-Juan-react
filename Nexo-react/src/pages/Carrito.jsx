import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { useAuth } from '../context/AuthContext';
import './Carrito.css';

export default function Carrito() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal, deliveryFee, total, formatPrice, showToast } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [address, setAddress] = useState('Calle 10 # 42-15, Medellín');
  const [paymentMethod, setPaymentMethod] = useState('Efectivo contra entrega');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [phone, setPhone] = useState('300 123 4567');

  const handleOpenCheckout = () => {
    if (cartItems.length === 0) {
      showToast('Tu carrito está vacío. Agrega platillos para continuar.', 'info');
      return;
    }
    setIsCheckoutOpen(true);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      showToast('Por favor ingresa la dirección de entrega.', 'info');
      return;
    }

    // Create the order with demonstration data
    const newOrder = createOrder({
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      address,
      paymentMethod,
      notes: deliveryNotes
    });

    clearCart();
    setIsCheckoutOpen(false);
    showToast(`¡Pedido #${newOrder.number} confirmado con éxito!`);
    navigate('/mis-pedidos');
  };

  return (
    <div className="carrito-page">
      {/* TÍTULO */}
      <section className="carrito-titulo">
        <h1>Carrito de compras</h1>
        <p>Revisa tus productos antes de realizar tu pedido</p>
      </section>

      {/* CONTENIDO */}
      <main className="carrito-contenido">
        {cartItems.length > 0 ? (
          <>
            <section className="carrito-productos">
              <h2>Tus productos ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</h2>

              {cartItems.map((item) => (
                <article key={item.id} className="carrito-producto">
                  <div className="carrito-producto-imagen">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="carrito-producto-info">
                    <h3>{item.name}</h3>
                    <p>{item.restaurant} • {item.description || 'Delicioso platillo NEXO'}</p>
                    <strong className="precio">{formatPrice(item.price * item.quantity)}</strong>
                  </div>

                  <div className="carrito-producto-acciones">
                    <div className="carrito-cantidad">
                      <button
                        className="carrito-cantidad-btn"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="carrito-cantidad-btn"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="carrito-eliminar"
                      onClick={() => removeFromCart(item.id)}
                    >
                      🗑 Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </section>

            <aside className="carrito-resumen">
              <h2>Resumen del pedido</h2>

              <div className="resumen-linea">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="resumen-linea">
                <span>Domicilio</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>

              <div className="separador"></div>

              <div className="resumen-total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>

              <button
                className="btn-finalizar"
                onClick={handleOpenCheckout}
              >
                Finalizar compra
              </button>

              <p className="mensaje-seguridad">
                🔒 Compra segura y fácil
              </p>
            </aside>
          </>
        ) : (
          <div className="carrito-vacio" style={{ gridColumn: '1 / -1' }}>
            <div className="vacio-icono">🛒</div>
            <h3>Tu carrito de compras está vacío</h3>
            <p>Descubre los combos y comidas más populares de tus restaurantes favoritos.</p>
            <Link to="/comidas" className="btn-explorar">
              Explorar comidas
            </Link>
          </div>
        )}
      </main>

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="checkout-modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
          <div className="checkout-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="checkout-modal-header">
              <h2>Finalizar Compra</h2>
              <button
                className="checkout-close-btn"
                onClick={() => setIsCheckoutOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmOrder}>
              <div className="checkout-field">
                <label>Nombre del destinatario</label>
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  style={{ background: '#f8f8f8' }}
                />
              </div>

              <div className="checkout-field">
                <label>Teléfono de contacto</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="checkout-field">
                <label>Dirección de entrega</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ej: Calle 10 # 42-15 Apto 301"
                  required
                />
              </div>

              <div className="checkout-field">
                <label>Método de pago</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="Efectivo contra entrega">💵 Efectivo contra entrega</option>
                  <option value="Nequi / Daviplata">📱 Nequi / Daviplata</option>
                  <option value="Tarjeta débito / crédito">💳 Tarjeta débito / crédito</option>
                </select>
              </div>

              <div className="checkout-field">
                <label>Instrucciones de entrega (opcional)</label>
                <textarea
                  rows="2"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="Ej: Timbrar en el apto 301 o dejar en portería"
                />
              </div>

              <div className="checkout-total-banner">
                <span>Total a pagar:</span>
                <span>{formatPrice(total)}</span>
              </div>

              <button type="submit" className="btn-confirm-checkout">
                Confirmar y enviar pedido
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
