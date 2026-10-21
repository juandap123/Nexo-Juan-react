import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const { showToast } = useCart();

  const [email, setEmail] = useState(user?.email || 'Jeronimo1724@gmail.com');
  const [password, setPassword] = useState('123456');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      showToast('Por favor completa todos los campos.', 'info');
      return;
    }

    login(email, password);
    showToast(`¡Bienvenido de nuevo!`);
    navigate('/perfil');
  };

  return (
    <div className="auth-page">
      <main className="tarjeta-auth">
        <Link to="/" className="auth-logo">
          NEXO
        </Link>

        <div className="auth-header">
          <h1>Iniciar sesión</h1>
          <p className="subtitulo">Ingresa a tu cuenta para continuar</p>
        </div>

        <div className="auth-demo-notice">
          ℹ️ <strong>Modo demostración:</strong> Autenticación simulada en frontend con persistencia local. No se requiere contraseña real.
        </div>

        <form onSubmit={handleSubmit}>
          <div className="auth-campo">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-campo">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-auth-submit">
            Iniciar sesión
          </button>
        </form>

        <div className="auth-switch">
          <span>¿No tienes una cuenta?</span>
          <Link to="/registro">Registrarse</Link>
        </div>
      </main>
    </div>
  );
}
