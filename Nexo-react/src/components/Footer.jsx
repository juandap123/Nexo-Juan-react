import { Link } from 'react-router-dom';
import './Footer.css';

const CURRENT_YEAR = 2026;

export default function Footer() {
  return (
    <footer className="nexo-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="logo">NEXO</span>
            <p>
              Tu plataforma favorita para pedir comida rápida, combos y platos especiales a domicilio con descuentos para estudiantes.
            </p>
          </div>

          <div className="footer-links-group">
            <div className="footer-col">
              <h4>Navegación</h4>
              <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/comidas">Comida</Link></li>
                <li><Link to="/restaurantes">Restaurantes</Link></li>
                <li><Link to="/carrito">Carrito de compras</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Cuenta</h4>
              <ul>
                <li><Link to="/perfil">Mi perfil</Link></li>
                <li><Link to="/certificado">Certificado de estudio</Link></li>
                <li><Link to="/mis-pedidos">Mis pedidos</Link></li>
                <li><Link to="/configuracion">Configuración</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Restaurantes</h4>
              <ul>
                <li><Link to="/restaurante/frisby">Frisby</Link></li>
                <li><Link to="/restaurante/kfc">KFC</Link></li>
                <li><Link to="/restaurante/mcdonalds">McDonald's</Link></li>
                <li><Link to="/restaurante/pizza-hut">Pizza Hut</Link></li>
                <li><Link to="/restaurante/subway">Subway</Link></li>
                <li><Link to="/restaurante/santa-rosa">Santa Rosa</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {CURRENT_YEAR} NEXO. Todos los derechos reservados.</p>
          <p>Proyecto NEXO • Juan David Cardozo Palacio • Grado 11-A</p>
        </div>
      </div>
    </footer>
  );
}
