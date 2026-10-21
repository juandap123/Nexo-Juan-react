import { useCart } from '../context/CartContext';

export default function ToastNotification() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className={`nexo-toast ${toast.type}`}>
      <span>{toast.type === 'info' ? 'ℹ️' : '🛒'}</span>
      <span>{toast.message}</span>
    </div>
  );
}
