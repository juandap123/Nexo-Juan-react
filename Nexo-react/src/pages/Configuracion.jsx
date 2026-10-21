import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Configuracion.css';

export default function Configuracion() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { showToast } = useCart();

  const handleLogout = () => {
    if (window.confirm('¿Seguro que deseas salir de tu cuenta?')) {
      logout();
      showToast('Sesión cerrada con éxito', 'info');
      navigate('/login');
    }
  };

  return (
    <div className="configuracion-page">
      <main className="configuracion-container">
        {/* PERFIL */}
        <section className="configuracion-perfil-card">
          <div className="configuracion-foto">
            {user.avatar ? <img src={user.avatar} alt="Avatar" /> : '👤'}
          </div>

          <div className="configuracion-datos">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <Link to="/perfil">Editar perfil</Link>
          </div>
        </section>

        {/* CONFIGURACIÓN */}
        <section className="configuracion-seccion">
          <h2>Configuración</h2>

          <div className="configuracion-opciones">
            <Link to="/perfil" className="config-opcion">
              <div className="config-icono">👤</div>
              <div className="config-texto">
                <h3>Información personal</h3>
                <p>Cambia tu nombre, colegio y datos personales</p>
              </div>
              <span style={{ color: '#aaa', fontSize: '18px' }}>›</span>
            </Link>

            <Link to="/certificado" className="config-opcion">
              <div className="config-icono">📄</div>
              <div className="config-texto">
                <h3>Certificado de estudio</h3>
                <p>Gestiona y actualiza tu documento estudiantil</p>
              </div>
              <span style={{ color: '#aaa', fontSize: '18px' }}>›</span>
            </Link>

            <Link to="/notificaciones" className="config-opcion">
              <div className="config-icono">🔔</div>
              <div className="config-texto">
                <h3>Notificaciones y promociones</h3>
                <p>Administra alertas, ofertas exclusivas y novedades</p>
              </div>
              <span style={{ color: '#aaa', fontSize: '18px' }}>›</span>
            </Link>

            <div
              className="config-opcion"
              onClick={() => showToast('Privacidad y seguridad verificada. Datos encriptados localmente.')}
            >
              <div className="config-icono">🔒</div>
              <div className="config-texto">
                <h3>Privacidad y seguridad</h3>
                <p>Controla la seguridad de tu cuenta y sesiones</p>
              </div>
              <span style={{ color: '#aaa', fontSize: '18px' }}>›</span>
            </div>

            <div
              className="config-opcion"
              onClick={() => showToast('Idioma configurado en Español.')}
            >
              <div className="config-icono">🌐</div>
              <div className="config-texto">
                <h3>Idioma</h3>
                <p>Español (Colombia)</p>
              </div>
              <span style={{ color: '#888', fontSize: '14px' }}>Español</span>
            </div>

            <div className="config-opcion cerrar" onClick={handleLogout}>
              <div className="config-icono" style={{ color: '#e50914' }}>🚪</div>
              <div className="config-texto">
                <h3>Cerrar sesión</h3>
                <p>Salir de la cuenta en este dispositivo</p>
              </div>
              <span style={{ color: '#e50914', fontSize: '18px' }}>›</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
