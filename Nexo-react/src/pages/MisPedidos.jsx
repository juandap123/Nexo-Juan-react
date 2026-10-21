import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import { useCart } from '../context/CartContext';
import './MisPedidos.css';

export default function MisPedidos() {
  const { orders } = useOrders();
  const { formatPrice } = useCart();
  const [filter, setFilter] = useState('todos');

  const filteredOrders = orders.filter(order => {
    if (filter === 'todos') return true;
    return order.status === filter;
  });

  const getStatusBadge = (order) => {
    if (order.status === 'entregado') {
      return <span className="pedido-badge-estado entregado">✓ Entregado</span>;
    }
    if (order.status === 'enviado') {
      return <span className="pedido-badge-estado enviado">🚚 Enviado</span>;
    }
    return <span className="pedido-badge-estado en_preparacion">🍳 En preparación</span>;
  };

  const getStatusIcon = (status) => {
    if (status === 'entregado') return '✓';
    if (status === 'enviado') return '🚚';
    return '🍳';
  };

  return (
    <div className="mis-pedidos-page">
      <main className="mis-pedidos-container">
        <div className="mis-pedidos-encabezado">
          <h1>Mis pedidos</h1>
          <p>Aquí puedes ver el estado de tus pedidos actuales y pasados.</p>
        </div>

        {/* FILTROS */}
        <div className="pedidos-filter-tabs">
          <button
            className={`pedidos-filter-btn ${filter === 'todos' ? 'active' : ''}`}
            onClick={() => setFilter('todos')}
          >
            Todos ({orders.length})
          </button>
          <button
            className={`pedidos-filter-btn ${filter === 'enviado' ? 'active' : ''}`}
            onClick={() => setFilter('enviado')}
          >
            En camino ({orders.filter(o => o.status === 'enviado').length})
          </button>
          <button
            className={`pedidos-filter-btn ${filter === 'en_preparacion' ? 'active' : ''}`}
            onClick={() => setFilter('en_preparacion')}
          >
            En preparación ({orders.filter(o => o.status === 'en_preparacion').length})
          </button>
          <button
            className={`pedidos-filter-btn ${filter === 'entregado' ? 'active' : ''}`}
            onClick={() => setFilter('entregado')}
          >
            Entregados ({orders.filter(o => o.status === 'entregado').length})
          </button>
        </div>

        {/* LISTA DE PEDIDOS */}
        {filteredOrders.length > 0 ? (
          <section className="pedidos-lista">
            {filteredOrders.map((order) => (
              <article key={order.id} className={`pedido-card status-${order.status}`}>
                <div className="pedido-superior">
                  <div>
                    <h2>Pedido #{order.number}</h2>
                    <p className="restaurante">
                      {order.restaurantIcon || '🍴'} {order.restaurant}
                    </p>
                  </div>
                  {getStatusBadge(order)}
                </div>

                <div className="pedido-linea"></div>

                <div className="pedido-info">
                  <div className="pedido-producto-detalle">
                    <span className="icono-prod">{order.restaurantIcon || '🍴'}</span>
                    <div>
                      <h3>{order.title}</h3>
                      <p>{order.description}</p>
                    </div>
                  </div>

                  <div className="pedido-col-meta">
                    <p>Cantidad</p>
                    <strong>{order.quantity}</strong>
                  </div>

                  <div className="pedido-col-meta">
                    <p>Total</p>
                    <strong className="precio-total">{formatPrice(order.total)}</strong>
                  </div>
                </div>

                {/* BANNER DE ESTADO */}
                <div className="pedido-estado-banner">
                  <span className="icon-badge">{getStatusIcon(order.status)}</span>
                  <div>
                    <strong>{order.statusNote}</strong>
                    <p>{order.statusDesc}</p>
                  </div>
                </div>

                {/* SI ESTÁ ENTREGADO, BOTÓN DE CALIFICAR REPARTIDOR */}
                {order.status === 'entregado' && (
                  <div className="pedido-entregado-footer">
                    <div>
                      <small style={{ color: '#777', display: 'block' }}>
                        Fecha de entrega: {order.date}
                      </small>
                      {order.deliveryAddress && (
                        <small style={{ color: '#555', display: 'block' }}>
                          Dirección: {order.deliveryAddress}
                        </small>
                      )}
                    </div>

                    {order.repartidor?.rating ? (
                      <div className="rating-badge-done">
                        <span>⭐</span>
                        <span>
                          Calificaste a {order.repartidor.name} con {order.repartidor.rating} estrellas
                        </span>
                      </div>
                    ) : (
                      <Link
                        to={`/calificar-repartidor?orderId=${order.id}`}
                        className="btn-calificar-repartidor"
                      >
                        ⭐ Calificar al repartidor
                      </Link>
                    )}
                  </div>
                )}
              </article>
            ))}
          </section>
        ) : (
          <div className="mis-pedidos-vacio">
            <h3>No tienes pedidos en esta categoría</h3>
            <p>Realiza tu pedido y disfruta de la mejor comida rápida a domicilio.</p>
            <Link
              to="/comidas"
              className="btn-calificar-repartidor"
              style={{ display: 'inline-block' }}
            >
              Hacer un pedido
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
