import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { foods, getFoodBySlug, getFoodByOriginalFile } from '../data/foods';
import { useCart } from '../context/CartContext';
import FoodCard from '../components/FoodCard';
import './FoodDetail.css';

export default function FoodDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, formatPrice, showToast } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Look up food item
  const food = useMemo(() => {
    return getFoodBySlug(slug) || getFoodByOriginalFile(slug) || foods[0];
  }, [slug]);

  // Related foods from the same restaurant or category
  const relatedFoods = useMemo(() => {
    return foods
      .filter(f => f.id !== food.id && (f.restaurantId === food.restaurantId || f.category === food.category))
      .slice(0, 4);
  }, [food]);

  const handleAddToCart = () => {
    addToCart(food, quantity);
  };

  const handleBuyNow = () => {
    addToCart(food, quantity);
    navigate('/carrito');
  };

  const handleSendRating = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      showToast('Por favor escribe un comentario para tu reseña.', 'info');
      return;
    }
    setReviewSubmitted(true);
    showToast('¡Gracias por tu calificación! Reseña guardada con éxito.');
    setComment('');
  };

  const displayPrice = food.price ? formatPrice(food.price) : food.priceFormatted || '$ 20.000';

  return (
    <div className="food-detail-page">
      <div className="food-detail-container">
        {/* TÍTULO */}
        <div className="food-detail-titulo">
          <h1>{food.title || food.name}</h1>
          <p>{food.subtitle || food.description}</p>
        </div>

        {/* ÁREA DEL PRODUCTO */}
        <section className="zona-producto">
          {/* INFORMACIÓN DEL PRODUCTO */}
          <div className="producto-col">
            {/* ESTRELLAS INTERACTIVAS */}
            <div className="estrellas-producto">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setUserRating(star)}
                  style={{ color: star <= userRating ? '#ffc107' : '#e0e0e0' }}
                  title={`${star} estrellas`}
                >
                  ★
                </span>
              ))}
            </div>

            {/* COMENTARIO */}
            <textarea
              placeholder="Escribe un comentario o reseña..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            {/* FOTO */}
            <div className="food-image-frame">
              <img src={food.image} alt={food.title} />
            </div>

            {/* RESTAURANTE */}
            <h2>{food.restaurantName}</h2>

            {/* PRECIO */}
            <span className="precio-tag">{displayPrice}</span>

            {/* SELECTOR DE CANTIDAD */}
            <div className="detail-qty-control">
              <button
                type="button"
                className="detail-qty-btn"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="detail-qty-num">{quantity}</span>
              <button
                type="button"
                className="detail-qty-btn"
                onClick={() => setQuantity(q => q + 1)}
              >
                +
              </button>
            </div>

            {/* BOTONES ACCIÓN */}
            <div className="btn-group-product">
              <button
                type="button"
                className="boton-carrito"
                onClick={handleAddToCart}
              >
                Agregar al carrito ({formatPrice(food.price * quantity)})
              </button>

              <button
                type="button"
                className="boton-comprar"
                onClick={handleBuyNow}
              >
                Comprar ahora
              </button>
            </div>
          </div>

          {/* DETALLES DEL PRODUCTO */}
          <div className="detalles-col">
            <h3>Detalles Del Producto</h3>

            <ul>
              {food.details && food.details.length > 0 ? (
                food.details.map((point, index) => (
                  <li key={index}>{point}</li>
                ))
              ) : (
                <>
                  <li>Platillo preparado con ingredientes selectos y frescos.</li>
                  <li>Receta tradicional de {food.restaurantName} para el deleite de tu paladar.</li>
                  <li>Excelente combinación de sabor, textura y aroma.</li>
                  <li>Empacado térmicamente para llegar caliente y delicioso a tu puerta.</li>
                </>
              )}
            </ul>

            <button
              type="button"
              className="boton-calificar"
              onClick={handleSendRating}
            >
              {reviewSubmitted ? '✓ Calificación enviada' : 'Enviar calificación'}
            </button>
          </div>
        </section>

        {/* PLATOS RECOMENDADOS */}
        {relatedFoods.length > 0 && (
          <section className="related-section">
            <h2>Más platillos para ti</h2>
            <div className="related-grid">
              {relatedFoods.map((relFood) => (
                <FoodCard key={relFood.id} food={relFood} variant="standard" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
