import { Link } from 'react-router-dom';
import './Portada.css';

export default function Bienvenida() {
  return (
    <div className="bienvenida-page">
      <div className="bienvenida-container">
        <div className="bienvenida-logo">NEXO</div>

        <h1>Bienvenido</h1>
        <h2>¡Bienvenido a Nexo!</h2>

        <p className="bienvenida-description">
          Tu comida favorita está a solo unos toques de distancia.<br />
          Pide, conecta con repartidores cercanos y disfruta con tarifas preferenciales para estudiantes.
        </p>

        <Link to="/" className="bienvenida-btn">
          Comenzar a explorar
        </Link>

        <div className="bienvenida-stars">★★★★★</div>
      </div>
    </div>
  );
}
