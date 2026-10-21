# NEXO – React Migration

## 📁 Project Structure
```
Nexo-Juan-react/
├─ public/                # Public assets (index.html, favicon, etc.)
├─ src/                   # Source code (React app)
│   ├─ assets/            # Images, icons, fonts used by the UI
│   ├─ components/        # Reusable UI components
│   │   ├─ Header.jsx
│   │   ├─ Footer.jsx
│   │   ├─ Layout.jsx
│   │   ├─ ToastNotification.jsx
│   │   ├─ RestaurantCard.jsx
│   │   └─ LegacyFoodRedirect.jsx
│   ├─ context/           # React context & hooks for global state
│   │   ├─ AuthContext.jsx      # User authentication & profile
│   │   ├─ CartContext.jsx      # Shopping‑cart management
│   │   ├─ OrdersContext.jsx    # Order history & rating
│   │   ├─ useAuth.js           # Hook wrapper for AuthContext
│   │   ├─ useCart.js           # Hook wrapper for CartContext
│   │   └─ useOrders.js         # Hook wrapper for OrdersContext
│   ├─ data/              # Static data used by the app
│   │   ├─ foods.js            # Food objects, helper maps & lookup functions
│   │   └─ restaurants.js      # Restaurant objects & lookup helpers
│   ├─ pages/             # One component per original HTML page
│   │   ├─ Inicio.jsx
│   │   ├─ Comidas.jsx
│   │   ├─ Restaurantes.jsx
│   │   ├─ RestaurantDetail.jsx
│   │   ├─ FoodDetail.jsx
│   │   ├─ Carrito.jsx
│   │   ├─ Perfil.jsx
│   │   ├─ Certificado.jsx
│   │   ├─ MisPedidos.jsx
│   │   ├─ CalificarRepartidor.jsx
│   │   ├─ Login.jsx
│   │   ├─ Registro.jsx
│   │   ├─ Portada.jsx
│   │   ├─ Bienvenida.jsx
│   │   ├─ Configuracion.jsx
│   │   └─ Notificaciones.jsx
│   ├─ styles/            # Global CSS (if any) – most pages import their own *.css
│   ├─ App.jsx            # Root component – routing & legacy redirects
│   └─ index.jsx          # ReactDOM render entry point
├─ .gitignore
├─ package.json           # Vite + React dependencies
├─ vite.config.js
└─ README.md              # **This file** – project overview
```

## 🏗️ Architectural Overview

1. **Routing** – Implemented with **React Router v6** in `src/App.jsx`.
   - Primary routes (`/`, `/comidas`, `/restaurantes`, …) render the corresponding page inside the shared `Layout` component.
   - Legacy HTML files (`*.html`) are redirected via `<Navigate>` entries so old URLs still work.
   - A catch‑all `<LegacyFoodRedirect />` component maps any unknown food HTML filename to the new `/comida/:slug` route using the lookup tables in `data/foods.js`.

2. **Layout & UI primitives** – `Layout.jsx` wraps each page with the common **Header**, optional **ToastNotification**, and an optional **Footer**.  This guarantees a consistent navigation bar and toast handling across the app.

3. **Global State** – Three context providers supply the whole application with state that must persist between page refreshes:
   - **AuthContext** – holds the logged‑in user, avatar, and uploaded certificate. State is persisted in `localStorage` under the key `nexo_user`.
   - **CartContext** – stores cart items, totals and toast messages. Persisted under `nexo_cart`.
   - **OrdersContext** – tracks completed orders, their statuses and delivery‑rating information. Persisted under `nexo_orders`.
   - Each context has a corresponding hook (`useAuth`, `useCart`, `useOrders`) for easy consumption and to satisfy React Fast Refresh lint rules.

4. **Data Layer** – Static data files (`foods.js`, `restaurants.js`) export arrays of objects that mirror the original HTML content (names, images, categories, prices, etc.). Helper functions provide:
   - `getFoodBySlug`, `getFoodByOriginalFile`
   - `getRestaurantById`
   - `originalHtmlToFileMap` used by the legacy redirect component.

5. **Styling** – Every page has a dedicated CSS file (e.g., `Restaurantes.css`, `Carrito.css`) that reproduces the exact look from the original static site (colors, spacing, responsive breakpoints). Global component styles live in `src/components/*.css`.

6. **Component Design** – Pages are thin containers that compose reusable UI components:
   - `RestaurantCard` displays restaurant summary tiles.
   - `FoodCard` displays individual food items.
   - `ToastNotification` shows transient messages from the cart.
   - `Header` implements the exact navigation bar required by the spec (logo, links, hover/active styles, responsive behaviour).

7. **Persistence** – All mutable user data (cart, profile, orders) is saved to **localStorage** inside the respective context `useEffect` hooks, ensuring the SPA retains state across reloads without a backend.

8. **Future Backend Integration** – The authentication flow, order creation, and certificate upload are currently **demo implementations** (file reads/writes are simulated). If a real API becomes available, replace the placeholder logic inside the context files with proper `fetch` calls – the rest of the UI will remain unchanged.

## 🚀 How to Run the Project
```bash
# Clone (if not already present) and enter the folder
cd c:/Users/Usuario/Nexo-Juan-react/Nexo-Juan-react

# Install dependencies
npm install

# Development server (hot‑reload)
npm run dev

# Build for production
npm run build
```
The app will be available at `http://localhost:5173/` (default Vite port).

---
*The migration keeps **all visual design**, navigation, and client‑side functionality identical to the original static HTML site while providing a modern React codebase.*