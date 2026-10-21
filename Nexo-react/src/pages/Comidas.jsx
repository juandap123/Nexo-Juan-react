import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { foods } from '../data/foods';
import FoodCard from '../components/FoodCard';
import './Comidas.css';

export default function Comidas() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFromUrl = searchParams.get('search') || '';
  const categoryFromUrl = searchParams.get('categoria') || 'Todos';

  const [searchTerm, setSearchTerm] = useState(searchFromUrl);

  const categories = [
    'Todos',
    'Hamburguesas',
    'Pollo',
    'Pizza',
    'Mexicana',
    'Sándwiches',
    'Acompañamientos',
    'Bebidas',
    'Postres'
  ];

  const handleCategoryClick = (cat) => {
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'Todos') {
      newParams.delete('categoria');
    } else {
      newParams.set('categoria', cat);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set('search', val);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const filteredFoods = useMemo(() => {
    const currentSearch = searchTerm.trim().toLowerCase();
    const currentCategory = categoryFromUrl.toLowerCase();

    return foods.filter((item) => {
      const matchCat =
        categoryFromUrl === 'Todos' ||
        item.category.toLowerCase() === currentCategory;
      const matchSearch =
        !currentSearch ||
        item.title.toLowerCase().includes(currentSearch) ||
        item.restaurantName.toLowerCase().includes(currentSearch) ||
        item.description.toLowerCase().includes(currentSearch);
      return matchCat && matchSearch;
    });
  }, [categoryFromUrl, searchTerm]);

  return (
    <div className="comidas-page">
      {/* ================= HERO ================= */}
      <section className="comidas-hero">
        <div className="hero-content">
          <h1>¿Qué quieres comer hoy?</h1>
          <p>Encuentra las mejores comidas y combos al mejor precio.</p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar comida..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="button" aria-label="Buscar">🔍</button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=90"
            alt="Hamburguesa"
          />
        </div>
      </section>

      {/* ================= CATEGORÍAS ================= */}
      <div className="comidas-categorias-wrap">
        <div className="comidas-categorias">
          {categories.map((cat) => (
            <button
              key={cat}
              className={categoryFromUrl === cat ? 'active' : ''}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ================= OFERTA ================= */}
      <section className="comidas-oferta">
        <h2>🔥 Oferta del Día</h2>
        <p>20% de descuento en todos los combos Frisby y KFC.</p>
      </section>

      {/* ================= PRODUCTOS ================= */}
      {filteredFoods.length > 0 ? (
        <section className="comidas-grid">
          {filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} variant="standard" />
          ))}
        </section>
      ) : (
        <div className="comidas-empty">
          <h3>No encontramos resultados</h3>
          <p>
            No hay comidas que coincidan con &quot;{searchTerm}&quot; en la categoría seleccionada.
          </p>
          <button
            className="category-btn active"
            onClick={() => {
              setSearchTerm('');
              setSearchParams({});
            }}
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
