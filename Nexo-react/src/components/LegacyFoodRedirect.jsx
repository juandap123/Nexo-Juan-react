import { Navigate, useLocation } from 'react-router-dom';
import { originalHtmlToFileMap, getFoodByOriginalFile } from '../data/foods';

export default function LegacyFoodRedirect() {
  const location = useLocation();
  const rawPath = location.pathname.replace(/^\//, '');
  const decoded = decodeURIComponent(rawPath);

  const slug = originalHtmlToFileMap[decoded.toLowerCase()] || originalHtmlToFileMap[rawPath.toLowerCase()];

  if (slug) {
    return <Navigate to={`/comida/${slug}`} replace />;
  }

  const food = getFoodByOriginalFile(decoded);
  if (food) {
    return <Navigate to={`/comida/${food.slug}`} replace />;
  }

  return <Navigate to="/comidas" replace />;
}
