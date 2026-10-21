import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrdersProvider } from './context/OrdersContext';

import Layout from './components/Layout';
import LegacyFoodRedirect from './components/LegacyFoodRedirect';

// Pages
import Inicio from './pages/Inicio';
import Comidas from './pages/Comidas';
import Restaurantes from './pages/Restaurantes';
import RestaurantDetail from './pages/RestaurantDetail';
import FoodDetail from './pages/FoodDetail';
import Carrito from './pages/Carrito';
import Perfil from './pages/Perfil';
import Certificado from './pages/Certificado';
import MisPedidos from './pages/MisPedidos';
import CalificarRepartidor from './pages/CalificarRepartidor';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Portada from './pages/Portada';
import Bienvenida from './pages/Bienvenida';
import Configuracion from './pages/Configuracion';
import Notificaciones from './pages/Notificaciones';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <OrdersProvider>
            <Routes>
              {/* Rutas principales de la aplicación */}
              <Route path="/" element={<Layout><Inicio /></Layout>} />
              <Route path="/comidas" element={<Layout><Comidas /></Layout>} />
              <Route path="/restaurantes" element={<Layout><Restaurantes /></Layout>} />
              <Route path="/restaurante/:id" element={<Layout><RestaurantDetail /></Layout>} />
              <Route path="/comida/:slug" element={<Layout><FoodDetail /></Layout>} />
              <Route path="/carrito" element={<Layout><Carrito /></Layout>} />
              <Route path="/perfil" element={<Layout><Perfil /></Layout>} />
              <Route path="/certificado" element={<Layout><Certificado /></Layout>} />
              <Route path="/mis-pedidos" element={<Layout><MisPedidos /></Layout>} />
              <Route path="/calificar-repartidor" element={<Layout><CalificarRepartidor /></Layout>} />
              <Route path="/configuracion" element={<Layout><Configuracion /></Layout>} />

              {/* Páginas de autenticación y bienvenida */}
              <Route path="/login" element={<Layout showFooter={false}><Login /></Layout>} />
              <Route path="/registro" element={<Layout showFooter={false}><Registro /></Layout>} />
              <Route path="/portada" element={<Layout showFooter={false}><Portada /></Layout>} />
              <Route path="/bienvenido" element={<Layout showFooter={false}><Bienvenida /></Layout>} />
              <Route path="/notificaciones" element={<Layout showFooter={false}><Notificaciones /></Layout>} />

              {/* Redirecciones de compatibilidad para archivos HTML originales */}
              <Route path="/index.html" element={<Navigate to="/" replace />} />
              <Route path="/Comidas.html" element={<Navigate to="/comidas" replace />} />
              <Route path="/Restaurantes.html" element={<Navigate to="/restaurantes" replace />} />
              <Route path="/carrito.html" element={<Navigate to="/carrito" replace />} />
              <Route path="/perfil.html" element={<Navigate to="/perfil" replace />} />
              <Route path="/perfil2.html" element={<Navigate to="/perfil?tab=actividades" replace />} />
              <Route path="/certificado.html" element={<Navigate to="/certificado" replace />} />
              <Route path="/mis_pedidos.html" element={<Navigate to="/mis-pedidos" replace />} />
              <Route path="/Calificar_al_repartidor.html" element={<Navigate to="/calificar-repartidor" replace />} />
              <Route path="/inicio-sesion.html" element={<Navigate to="/login" replace />} />
              <Route path="/registro.html" element={<Navigate to="/registro" replace />} />
              <Route path="/Registrarse.html" element={<Navigate to="/registro" replace />} />
              <Route path="/portada.html" element={<Navigate to="/portada" replace />} />
              <Route path="/Bienvenidso.html" element={<Navigate to="/bienvenido" replace />} />
              <Route path="/Configuracion.html" element={<Navigate to="/configuracion" replace />} />
              <Route path="/notificacion1.html" element={<Navigate to="/notificaciones" replace />} />

              {/* Redirecciones para páginas HTML de restaurantes */}
              <Route path="/Frisby.html" element={<Navigate to="/restaurante/frisby" replace />} />
              <Route path="/KFC.html" element={<Navigate to="/restaurante/kfc" replace />} />
              <Route path="/McDonald's.html" element={<Navigate to="/restaurante/mcdonalds" replace />} />
              <Route path="/Pizza_hut.html" element={<Navigate to="/restaurante/pizza-hut" replace />} />
              <Route path="/Santa_rosa.html" element={<Navigate to="/restaurante/santa-rosa" replace />} />
              <Route path="/Subway.html" element={<Navigate to="/restaurante/subway" replace />} />

              {/* Redirección para cualquier otro archivo HTML de comida original */}
              <Route path="/:htmlFile" element={<LegacyFoodRedirect />} />

              {/* Ruta comodín */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </OrdersProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
