import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cards.css';

export default function FoodCard({ food, variant = 'standard' }) {
  const { addToCart, formatPrice } = useCart();

  if (!food) return null;

  const displayName = food.title || food.name;
  const displayPrice = food.price ? formatPrice(food.price) : food.priceFormatted || '$ 20.000';
  const foodLink = `/comida/${food.slug || food.id}`;

  if (variant === 'combo') {
    return (
      <article className="combo-card">
        <h3>{displayName}</h3>

        <Link to={foodLink} className="combo-image">
          <img src={food.image} alt={displayName} loading="lazy" />
        </Link>

        <p>{food.subtitle || food.description}</p>

        <div className="combo-bottom">
          <strong>{displayPrice}</strong>

          <button
            className="btn-add-circle"
            title="Agregar al carrito"
            onClick={() => addToCart(food, 1)}
            aria-label={`Agregar ${displayName} al carrito`}
          >
            +
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="food-card">
      <Link to={foodLink} className="food-card-img-wrap">
        <img src={food.image} alt={displayName} loading="lazy" />
        {food.restaurantName && (
          <span className="restaurant-tag">{food.restaurantName}</span>
        )}
      </Link>

      <div className="info">
        <h3>{displayName}</h3>
        <p className="food-desc">{food.subtitle || food.description}</p>
        <div className="stars">★★★★★</div>
        <div className="price">{displayPrice}</div>

        <div className="food-card-actions">
          <Link to={foodLink} className="btn-view">
            Ver Producto
          </Link>
          <button
            className="btn-add-quick"
            title="Agregar al carrito"
            onClick={() => addToCart(food, 1)}
            aria-label={`Agregar ${displayName} al carrito`}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
