import { useState } from 'react';

import { restaurants } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';
import './Restaurantes.css';

export default function Restaurantes() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRestaurants = restaurants.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="restaurantes-page">
      <div className="restaurantes-header">
        <h1>Restaurantes disponibles</h1>

        <div className="restaurantes-search">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Buscar por restaurante o tipo de comida..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="lista-restaurantes">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            variant="grid"
          />
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <div style={{ textAlign: 'center', padding: '50px', background: 'white', borderRadius: '16px' }}>
          <p style={{ color: '#666', fontSize: '16px' }}>
            No se encontraron restaurantes para &quot;{searchTerm}&quot;.
          </p>
        </div>
      )}
    </div>
  );
}
