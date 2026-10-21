import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { restaurants } from '../data/restaurants';
import { getPopularCombos } from '../data/foods';
import FoodCard from '../components/FoodCard';
import RestaurantCard from '../components/RestaurantCard';
import './Inicio.css';

export default function Inicio() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = [
    { label: 'Todos', icon: '▦', value: 'Todos' },
    { label: 'Hamburgesa', icon: '🍔', value: 'Hamburguesas' },
    { label: 'Pollo', icon: '🍗', value: 'Pollo' },
    { label: 'Pizza', icon: '🍕', value: 'Pizza' },
    { label: 'Mexicana', icon: '🌮', value: 'Mexicana' },
    { label: 'Bebidas', icon: '🥤', value: 'Bebidas' },
    { label: 'Postres', icon: '🍰', value: 'Postres' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/comidas?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Featured restaurants for Inicio (Frisby, KFC, Pizza Hut)
  const featuredRestaurants = restaurants.filter(r =>
    ['frisby', 'kfc', 'pizza-hut'].includes(r.id)
  );

  // Default popular combos matching Inicio.html
  const initialPopularCombos = getPopularCombos();

  // If a category is selected or search term typed, filter items
  const displayedCombos = initialPopularCombos.filter(item => {
    const matchesCat =
      selectedCategory === 'Todos' ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      !searchTerm.trim() ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.restaurantName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="inicio-page">
      {/* ================= HERO ================= */}
      <section className="inicio-hero">
        <div className="hero-content">
          <h1>¿Qué quieres comer hoy?</h1>
          <p>Encuentra tus restaurantes favoritos y disfruta de los mejores combos.</p>

          <form className="search-box" onSubmit={handleSearchSubmit}>
            <span>🔍</span>
            <input
              type="text"
              placeholder="Buscar comida o restaurante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>

        <div className="hero-food">
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=90"
            alt="Hamburguesa con papas"
          />
        </div>
      </section>

      {/* ================= CATEGORÍAS ================= */}
      <section className="categories-section">
        <h2>Categorías</h2>

        <div className="categories">
          {categories.map((cat) => (
            <button
              key={cat.label}
              className={`category-btn ${selectedCategory === cat.value ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.value)}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ================= RESTAURANTES DESTACADOS ================= */}
      <section className="restaurants-section">
        <div className="section-header-row">
          <h2>Restaurantes destacados</h2>
          <Link to="/restaurantes">Ver todos</Link>
        </div>

        <div className="restaurants-grid-3">
          {featuredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              variant="featured"
            />
          ))}
        </div>
      </section>

      {/* ================= COMBOS POPULARES ================= */}
      <section className="combos-section">
        <div className="section-header-row">
          <h2>
            {selectedCategory === 'Todos' ? 'Combos populares' : `Combos en ${selectedCategory}`}
          </h2>
          <Link to="/comidas">Ver todos</Link>
        </div>

        <div className="combo-grid-4">
          {displayedCombos.length > 0 ? (
            displayedCombos.map((combo) => (
              <FoodCard key={combo.id} food={combo} variant="combo" />
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', background: 'white', borderRadius: '16px' }}>
              <p style={{ color: '#666', fontSize: '16px' }}>
                No se encontraron combos para esta búsqueda.
              </p>
              <button
                className="category-btn active"
                style={{ marginTop: '15px' }}
                onClick={() => { setSelectedCategory('Todos'); setSearchTerm(''); }}
              >
                Ver todos los combos
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
