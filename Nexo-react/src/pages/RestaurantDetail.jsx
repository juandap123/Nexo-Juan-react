import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurantById, restaurants } from '../data/restaurants';
import { getFoodsByRestaurant } from '../data/foods';
import FoodCard from '../components/FoodCard';
import './RestaurantDetail.css';

export default function RestaurantDetail() {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Find restaurant
  const restaurant = getRestaurantById(id) || restaurants[0];
  const allFoods = useMemo(() => getFoodsByRestaurant(restaurant.id), [restaurant.id]);

  // Extract unique categories for this restaurant
  const restaurantCategories = useMemo(() => {
    const cats = new Set(allFoods.map(f => f.category));
    return ['Todos', ...Array.from(cats)];
  }, [allFoods]);

  // Filter foods by selected tab
  const displayedFoods = useMemo(() => {
    if (selectedCategory === 'Todos') return allFoods;
    return allFoods.filter(f => f.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [allFoods, selectedCategory]);

  // Group by category if "Todos" is selected
  const groupedFoods = useMemo(() => {
    if (selectedCategory !== 'Todos') {
      return { [selectedCategory]: displayedFoods };
    }
    const groups = {};
    allFoods.forEach(food => {
      const cat = food.category || 'Varios';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(food);
    });
    return groups;
  }, [allFoods, selectedCategory, displayedFoods]);

  return (
    <div className="restaurant-detail-page">
      {/* BANNER ENCABEZADO */}
      <section className="restaurant-hero-banner">
        <div className="restaurant-hero-logo">
          <img src={restaurant.logo} alt={`Logo ${restaurant.name}`} />
        </div>

        <div className="restaurant-hero-info">
          <h1>{restaurant.name}</h1>
          <p>{restaurant.description || restaurant.category}</p>

          <div className="restaurant-meta-pills">
            <span>⭐ {restaurant.rating} ({restaurant.reviews} reseñas)</span>
            <span>🕒 {restaurant.deliveryTime}</span>
            <span>🛵 Domicilio $3.000</span>
          </div>
        </div>
      </section>

      {/* TABS DE CATEGORÍA */}
      <div className="restaurant-nav-tabs">
        {restaurantCategories.map((cat) => (
          <button
            key={cat}
            className={`restaurant-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MENÚ AGRUPADO POR CATEGORÍA */}
      <main className="restaurant-menu-content">
        {Object.entries(groupedFoods).map(([catName, items]) => (
          <section key={catName} className="restaurant-category-section">
            <h2>{catName}</h2>
            <div className="restaurant-products-grid">
              {items.map((food) => (
                <FoodCard key={food.id} food={food} variant="standard" />
              ))}
            </div>
          </section>
        ))}

        {displayedFoods.length === 0 && (
          <div style={{ textAlign: 'center', padding: '50px', background: 'white', borderRadius: '16px' }}>
            <p style={{ color: '#666' }}>No hay platillos disponibles en esta categoría.</p>
          </div>
        )}
      </main>
    </div>
  );
}
