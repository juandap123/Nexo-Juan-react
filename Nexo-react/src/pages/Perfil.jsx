import { useState, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';
import { useCart } from '../context/CartContext';
import './Perfil.css';

export default function Perfil() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');

  const { user, certificate, updateProfile, updateAvatar, logout } = useAuth();
  const { orders, deleteOrder, clearAllOrders } = useOrders();
  const { showToast, formatPrice } = useCart();

  const [localTab, setLocalTab] = useState(null);
  const activeTab = localTab || (tabParam === 'actividades' ? 'actividades' : 'detalles');

  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: user.name,
    email: user.email,
    school: user.school,
    grade: user.grade
  });

  const fileInputRef = useRef(null);

  const handleTabChange = (tab) => {
    setLocalTab(tab);
    if (tab === 'actividades') {
      setSearchParams({ tab: 'actividades' });
    } else {
      setSearchParams({});
    }
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updateAvatar(reader.result);
        showToast('¡Foto de perfil actualizada!');
      };
      reader.readAsDataURL(file);
    }
  };

  const openEditModal = () => {
    setEditFormData({
      name: user.name,
      email: user.email,
      school: user.school,
      grade: user.grade
    });
    setIsEditing(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(editFormData);
    setIsEditing(false);
    showToast('¡Datos del perfil actualizados correctamente!');
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      logout();
      showToast('Sesión cerrada correctamente.', 'info');
      navigate('/login');
    }
  };

  // Filter completed orders for actividades tab
  const completedOrders = orders.filter(o => o.status === 'entregado');

  return (
    <div className="perfil-page">
      <main className="perfil-container">
        {/* CABECERA DEL PERFIL */}
        <section className="perfil-header">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <button
            className="foto-perfil"
            title="Cambiar foto de perfil"
            onClick={handleAvatarClick}
            type="button"
          >
            {user.avatar ? (
              <img src={user.avatar} alt="Avatar" />
            ) : (
              '👤'
            )}
            <span className="icono-cambiar">✎</span>
          </button>

          <div className="perfil-titulo">
            <h1>{user.name}</h1>
            <p>Administra tu información personal y tus pedidos</p>
          </div>
        </section>

        {/* BOTONES DE SECCIÓN */}
        <div className="secciones-perfil">
          <button
            className={`seccion-btn ${activeTab === 'detalles' ? 'activa' : ''}`}
            onClick={() => handleTabChange('detalles')}
          >
            Detalles
          </button>
          <button
            className={`seccion-btn ${activeTab === 'actividades' ? 'activa' : ''}`}
            onClick={() => handleTabChange('actividades')}
          >
            Mis actividades
          </button>
        </div>

        {/* TAB 1: DETALLES */}
        {activeTab === 'detalles' && (
          <section className="detalles">
            {/* NOMBRE */}
            <div className="dato">
              <div className="dato-informacion">
                <span>Nombre</span>
                <p>{user.name}</p>
              </div>
              <button
                className="editar-btn"
                title="Editar nombre"
                onClick={openEditModal}
              >
                ✎
              </button>
            </div>

            {/* CORREO */}
            <div className="dato">
              <div className="dato-informacion">
                <span>Correo electrónico</span>
                <p>{user.email}</p>
              </div>
              <button
                className="editar-btn"
                title="Editar correo"
                onClick={openEditModal}
              >
                ✎
              </button>
            </div>

            {/* COLEGIO */}
            <div className="dato">
              <div className="dato-informacion">
                <span>Colegio</span>
                <p>{user.school}</p>
              </div>
              <button
                className="editar-btn"
                title="Editar colegio"
                onClick={openEditModal}
              >
                ✎
              </button>
            </div>

            {/* GRADO */}
            <div className="dato">
              <div className="dato-informacion">
                <span>Grado</span>
                <p>{user.grade}°</p>
              </div>
              <button
                className="editar-btn"
                title="Editar grado"
                onClick={openEditModal}
              >
                ✎
              </button>
            </div>

            {/* CERTIFICADO ACCESO */}
            <Link to="/certificado" className="certificado-link-card">
              <div className="certificado-link-left">
                <span style={{ fontSize: '20px' }}>📄</span>
                <div>
                  <span>Certificado de estudio</span>
                  <small style={{ display: 'block', fontSize: '12px', opacity: 0.85, fontWeight: 'normal' }}>
                    {certificate ? `Estado: ${certificate.status}` : 'Sin certificado cargado'}
                  </small>
                </div>
              </div>
              <span className="certificado-flecha">→</span>
            </Link>

            {/* CERRAR SESIÓN */}
            <button className="cerrar-sesion" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </section>
        )}

        {/* TAB 2: MIS ACTIVIDADES */}
        {activeTab === 'actividades' && (
          <section className="actividades">
            <div className="actividades-titulo">
              <h2>Mis actividades</h2>
              <p>Revisa tus pedidos realizados recientemente.</p>
            </div>

            <div className="pedidos-header">
              <h3>Pedidos completados</h3>
              <span>{completedOrders.length} pedido{completedOrders.length === 1 ? '' : 's'}</span>
            </div>

            {completedOrders.length > 0 ? (
              <>
                {completedOrders.map((order) => (
                  <article key={order.id} className="pedido-card-item">
                    <div className="pedido-imagen">
                      <img src={order.image} alt={order.title} />
                    </div>

                    <div className="pedido-informacion">
                      <div className="pedido-superior">
                        <div>
                          <h3>{order.title}</h3>
                          <span className="estado">Pedido completado</span>
                        </div>

                        <button
                          className="eliminar-pedido-btn"
                          title="Eliminar pedido"
                          onClick={() => {
                            deleteOrder(order.id);
                            showToast('Pedido eliminado del historial.');
                          }}
                        >
                          🗑 Eliminar
                        </button>
                      </div>

                      <p>{order.description}</p>
                      <strong>{formatPrice(order.total)}</strong>

                      <div className="pedido-separador"></div>
                      <small style={{ color: '#888' }}>
                        Fecha: {order.date} • Restaurante: {order.restaurant}
                      </small>
                    </div>
                  </article>
                ))}

                <div className="eliminar-todo-container">
                  <button
                    className="eliminar-todo-btn"
                    onClick={() => {
                      if (window.confirm('¿Deseas eliminar todo el historial de pedidos?')) {
                        clearAllOrders();
                        showToast('Historial de pedidos eliminado.', 'info');
                      }
                    }}
                  >
                    🗑 Eliminar todo
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', background: '#fafafa', borderRadius: '12px' }}>
                <p style={{ color: '#777', fontSize: '15px' }}>
                  No tienes pedidos completados en tu historial.
                </p>
                <Link
                  to="/comidas"
                  className="seccion-btn activa"
                  style={{ display: 'inline-block', marginTop: '15px', textDecoration: 'none' }}
                >
                  Hacer un pedido
                </Link>
              </div>
            )}
          </section>
        )}

        {/* MODAL EDITAR PERFIL */}
        {isEditing && (
          <div className="edit-modal-overlay" onClick={() => setIsEditing(false)}>
            <div className="edit-modal-box" onClick={(e) => e.stopPropagation()}>
              <h2>Editar información personal</h2>

              <form onSubmit={handleSaveProfile}>
                <div className="edit-field">
                  <label>Nombre completo</label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="edit-field">
                  <label>Correo electrónico</label>
                  <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="edit-field">
                  <label>Colegio / Institución</label>
                  <input
                    type="text"
                    value={editFormData.school}
                    onChange={(e) => setEditFormData({ ...editFormData, school: e.target.value })}
                    required
                  />
                </div>

                <div className="edit-field">
                  <label>Grado escolar</label>
                  <select
                    value={editFormData.grade}
                    onChange={(e) => setEditFormData({ ...editFormData, grade: e.target.value })}
                  >
                    <option value="6">6°</option>
                    <option value="7">7°</option>
                    <option value="8">8°</option>
                    <option value="9">9°</option>
                    <option value="10">10°</option>
                    <option value="11">11°</option>
                  </select>
                </div>

                <div className="edit-modal-actions">
                  <button type="button" className="btn-cancel-modal" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-save-profile">
                    Guardar cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
