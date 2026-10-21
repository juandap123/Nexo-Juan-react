import { Link } from 'react-router-dom';
import './Configuracion.css';

export default function Notificaciones() {
  return (
    <div className="notificaciones-page">
      <div className="phone-frame">
        <div className="camera-notch">
          <div className="camera"></div>
        </div>

        <div className="phone-screen">
          <div className="status-bar">
            <span>11:52</span>
            <span>5G • 89%</span>
          </div>

          <div className="header-rest">
            <h1 className="screen-title">Restaurantes</h1>
            <Link to="/configuracion" className="settings-icon" style={{ textDecoration: 'none' }}>
              ⚙️
            </Link>
          </div>

          <div className="main-content">
            <div className="promo-card">
              <h2>¡Sí, sí! llegó tardes felices y disfrútalo comiendo pollo, pero que sea de Frisby</h2>

              <img
                src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=90"
                alt="Frisby Promo"
                className="promo-image"
              />

              <Link to="/restaurante/frisby" className="know-more">
                Conoce más
              </Link>
            </div>

            <div className="promo-card" style={{ background: '#d71920' }}>
              <h2>¡Combos familiares en KFC con hasta un 25% de descuento escolar!</h2>

              <img
                src="https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&w=700&q=90"
                alt="KFC Promo"
                className="promo-image"
              />

              <Link to="/restaurante/kfc" className="know-more" style={{ color: '#d71920' }}>
                Ver combos
              </Link>
            </div>
          </div>

          <div className="bottom-nav">
            <Link to="/" className="nav-item active">🏠</Link>
            <Link to="/comidas" className="nav-item">🔍</Link>
            <Link to="/mis-pedidos" className="nav-item">🛎️</Link>
            <Link to="/carrito" className="nav-item">🛒</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
