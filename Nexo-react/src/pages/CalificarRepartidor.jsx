import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import { useCart } from '../context/CartContext';
import './CalificarRepartidor.css';

export default function CalificarRepartidor() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('orderId') || '002';
  const { orders, rateDelivery } = useOrders();
  const { showToast } = useCart();

  const currentOrder = orders.find(o => o.id === orderId) || orders[0];
  const repartidor = currentOrder?.repartidor || {
    name: 'Carlos Rodríguez',
    role: 'Repartidor NEXO',
    photo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
  };

  const [rating, setRating] = useState(repartidor.rating || 5);
  const [comment, setComment] = useState(repartidor.comment || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    rateDelivery(orderId, rating, comment);
    showToast(`¡Gracias por calificar a ${repartidor.name}!`);
    navigate('/mis-pedidos');
  };

  return (
    <div className="calificar-page">
      <main className="calificar-container">
        <div className="calificar-titulo">
          <h1>Calificar repartidor</h1>
          <p>Cuéntanos cómo fue tu experiencia con el servicio de entrega</p>
        </div>

        <section className="zona-calificacion">
          {/* REPARTIDOR */}
          <div className="repartidor-col">
            <img src={repartidor.photo} alt={repartidor.name} />
            <h2>{repartidor.name}</h2>
            <span>{repartidor.role}</span>
            {currentOrder && (
              <small style={{ color: '#888', marginTop: '12px', display: 'block' }}>
                Pedido #{currentOrder.number} • {currentOrder.restaurant}
              </small>
            )}
          </div>

          {/* CALIFICACIÓN */}
          <form className="calificar-col" onSubmit={handleSubmit}>
            <h3>¿Cómo calificas el servicio?</h3>

            <div className="estrellas-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  style={{ color: star <= rating ? '#ffc107' : '#e0e0e0' }}
                  title={`${star} estrellas`}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              placeholder="Escribe un comentario sobre el tiempo de entrega, amabilidad o estado del paquete..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
            />

            <button type="submit" className="btn-enviar-calificacion">
              Enviar calificación
            </button>

            <div style={{ marginTop: '20px' }}>
              <Link to="/mis-pedidos" style={{ color: '#888', fontSize: '14px', textDecoration: 'underline' }}>
                Omitir y volver a Mis pedidos
              </Link>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
