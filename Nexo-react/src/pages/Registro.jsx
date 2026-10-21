import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Auth.css';

export default function Registro() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useCart();
  const fileInputRef = useRef(null);

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [colegio, setColegio] = useState('');
  const [grado, setGrado] = useState('11');
  const [contrasena, setContrasena] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFile({
          name: file.name,
          data: reader.result,
          type: file.type
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !apellido.trim() || !correo.trim() || !colegio.trim()) {
      showToast('Por favor completa todos los campos obligatorios.', 'info');
      return;
    }

    if (contrasena !== confirmar) {
      showToast('Las contraseñas no coinciden. Por favor verifica.', 'info');
      return;
    }

    register({
      nombre,
      apellido,
      correo,
      colegio,
      grado,
      certificateFile: selectedFile
    });

    showToast(`¡Cuenta creada con éxito! Bienvenido a NEXO, ${nombre}.`);
    navigate('/perfil');
  };

  return (
    <div className="auth-page">
      <main className="tarjeta-auth wide">
        <Link to="/" className="auth-logo">
          NEXO
        </Link>

        <div className="auth-header">
          <h1>Crear cuenta</h1>
          <p className="subtitulo">Regístrate para comenzar a usar NEXO con tarifa estudiantil</p>
        </div>

        <div className="auth-demo-notice">
          ℹ️ <strong>Modo seguro y demostrativo:</strong> La información se almacena localmente en el navegador para fines del proyecto estudiantil.
        </div>

        <form onSubmit={handleSubmit}>
          {/* NOMBRE Y APELLIDO */}
          <div className="auth-fila">
            <div className="auth-campo">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="auth-campo">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                id="apellido"
                placeholder="Tu apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>
          </div>

          {/* CORREO */}
          <div className="auth-campo">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              placeholder="Tu correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          {/* COLEGIO */}
          <div className="auth-campo">
            <label htmlFor="colegio">Colegio / Institución educativa</label>
            <input
              type="text"
              id="colegio"
              placeholder="Nombre de tu colegio"
              value={colegio}
              onChange={(e) => setColegio(e.target.value)}
              required
            />
          </div>

          {/* GRADO */}
          <div className="auth-campo">
            <label htmlFor="grado">Grado</label>
            <select
              id="grado"
              value={grado}
              onChange={(e) => setGrado(e.target.value)}
              required
            >
              <option value="">Selecciona tu grado</option>
              <option value="6">6°</option>
              <option value="7">7°</option>
              <option value="8">8°</option>
              <option value="9">9°</option>
              <option value="10">10°</option>
              <option value="11">11°</option>
            </select>
          </div>

          {/* CONTRASEÑA */}
          <div className="auth-fila">
            <div className="auth-campo">
              <label htmlFor="contrasena">Contraseña</label>
              <input
                type="password"
                id="contrasena"
                placeholder="Crea una contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>

            <div className="auth-campo">
              <label htmlFor="confirmar">Confirmar contraseña</label>
              <input
                type="password"
                id="confirmar"
                placeholder="Repite tu contraseña"
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                required
              />
            </div>
          </div>

          {/* CERTIFICADO */}
          <div className="auth-certificado-box">
            <div className="auth-cert-texto">
              <div className="auth-icono-cert">📄</div>
              <div>
                <h3>
                  Certificado de estudio <span>*</span>
                </h3>
                <p>
                  Adjunta un documento o foto que demuestre que actualmente eres estudiante.
                </p>
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              style={{ display: 'none' }}
            />

            <button
              type="button"
              className="btn-subir-cert"
              onClick={() => fileInputRef.current?.click()}
            >
              📎 {selectedFile ? 'Cambiar archivo seleccionado' : 'Subir certificado'}
            </button>

            {selectedFile && (
              <div className="cert-file-chosen">
                ✓ Archivo seleccionado: {selectedFile.name}
              </div>
            )}
          </div>

          <button type="submit" className="btn-auth-submit">
            Crear cuenta
          </button>
        </form>

        <div className="auth-switch">
          <span>¿Ya tienes una cuenta?</span>
          <Link to="/login">Iniciar sesión</Link>
        </div>
      </main>
    </div>
  );
}
