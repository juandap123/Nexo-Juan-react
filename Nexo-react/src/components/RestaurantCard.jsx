import { Link } from 'react-router-dom';
import './Cards.css';

export default function RestaurantCard({ restaurant, variant = 'featured' }) {
  if (!restaurant) return null;

  const restLink = `/restaurante/${restaurant.id || restaurant.slug}`;

  const getLogoClass = (id) => {
    switch (id) {
      case 'frisby': return 'frisby-logo';
      case 'kfc': return 'kfc-logo';
      case 'pizza-hut': return 'pizza-logo';
      case 'mcdonalds': return 'mcdonalds-logo';
      case 'subway': return 'subway-logo';
      case 'santa-rosa': return 'santa-rosa-logo';
      default: return 'burger-logo';
    }
  };

  if (variant === 'grid') {
    return (
      <div className="restaurant-grid-card">
        <img src={restaurant.logo} alt={`Logo ${restaurant.name}`} loading="lazy" />
        <h2>{restaurant.name}</h2>
        <p>{restaurant.category || restaurant.description}</p>
        <div className="estrellas">★★★★★</div>
        <Link to={restLink} className="boton">
          Ver restaurante
        </Link>
      </div>
    );
  }

  return (
    <Link to={restLink} className="restaurant-card">
      <div className={`restaurant-logo ${getLogoClass(restaurant.id)}`}>
        <img src={restaurant.logo} alt={`Logo ${restaurant.name}`} loading="lazy" />
      </div>

      <div className="restaurant-info">
        <h3>{restaurant.name}</h3>
        <p>{restaurant.category || restaurant.tags?.join(' • ')}</p>
        <div className="rating">
          ⭐ {restaurant.rating || '4.8'} ({restaurant.reviews || '2k'})
        </div>
      </div>

      <span className="restaurant-arrow">›</span>
    </Link>
  );
}
