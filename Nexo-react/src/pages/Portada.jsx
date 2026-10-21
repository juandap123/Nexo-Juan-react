import { Link } from 'react-router-dom';
import './Portada.css';

export default function Portada() {
  return (
    <div className="portada-page">
      <div className="portada-telefono">
        <div className="portada-pantalla">
          <div className="portada-contenido">
            <div className="portada-logo-wrap">
              <div className="portada-logo-big">NEXO</div>
              <p className="portada-tagline">Tu comida favorita en tu puerta</p>
            </div>

            <Link to="/" className="portada-btn-continuar">
              Continuar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
