// Restaurantes oficiales de NEXO
export const restaurants = [
  {
    "id": "frisby",
    "name": "Frisby",
    "slug": "frisby",
    "category": "Pollo colombiano y combos",
    "tags": [
      "Pollo",
      "Combos",
      "Acompañamientos",
      "Bebidas"
    ],
    "rating": 4.8,
    "reviews": "2.5k",
    "deliveryTime": "25-35 min",
    "deliveryFee": 3000,
    "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgNmj5WK5pWhkHPBYBW33XAc3QnMS1Y0YS9U6ACg6Aog&s=10",
    "banner": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80",
    "bgColor": "#f58220",
    "description": "El pollo más crujiente y delicioso con el inconfundible sabor colombiano."
  },
  {
    "id": "kfc",
    "name": "KFC",
    "slug": "kfc",
    "category": "Pollo frito y combos familiares",
    "tags": [
      "Pollo",
      "Alitas",
      "Tenders",
      "Combos"
    ],
    "rating": 4.7,
    "reviews": "1.8k",
    "deliveryTime": "30-40 min",
    "deliveryFee": 3000,
    "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr3g3D_Tan0wPlrY-Yyl1HprPhfWAmjLlOtAEAnGO894p6a1PsAVGYvUK9&s=10",
    "banner": "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&w=1200&q=80",
    "bgColor": "#d71920",
    "description": "Receta secreta de 11 hierbas y especias. Para chuparse los dedos."
  },
  {
    "id": "mcdonalds",
    "name": "McDonald's",
    "slug": "mcdonalds",
    "category": "Hamburguesas, combos y bebidas",
    "tags": [
      "Hamburguesas",
      "Combos",
      "Papas",
      "Postres",
      "Bebidas"
    ],
    "rating": 4.8,
    "reviews": "3.1k",
    "deliveryTime": "20-30 min",
    "deliveryFee": 3000,
    "logo": "https://1000marcas.net/wp-content/uploads/2019/11/McDonalds-logo.png",
    "banner": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
    "bgColor": "#ffbc0d",
    "description": "Las hamburguesas más famosas del mundo, papas doradas y postres únicos."
  },
  {
    "id": "subway",
    "name": "Subway",
    "slug": "subway",
    "category": "Sándwiches frescos y bebidas",
    "tags": [
      "Sándwiches",
      "Wraps",
      "Bebidas",
      "Saludable"
    ],
    "rating": 4.6,
    "reviews": "1.5k",
    "deliveryTime": "25-35 min",
    "deliveryFee": 3000,
    "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc8HgNSp_Gpo4Hzm-KAL146u27IQuiQOrTS_DCQQhLxA&s",
    "banner": "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=1200&q=80",
    "bgColor": "#008938",
    "description": "Sándwiches y wraps frescos hechos a tu gusto en cada pedido."
  },
  {
    "id": "pizza-hut",
    "name": "Pizza Hut",
    "slug": "pizza-hut",
    "category": "Pizzas, promociones y combos",
    "tags": [
      "Pizzas",
      "Entradas",
      "Postres",
      "Bebidas"
    ],
    "rating": 4.6,
    "reviews": "1.2k",
    "deliveryTime": "35-45 min",
    "deliveryFee": 3000,
    "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIQrGq4t4Gd7zjRrDFCtlMQcSHGktuGa4RQxntroyH40okvjHMrIgco_yV&s=10",
    "banner": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=80",
    "bgColor": "#ee3124",
    "description": "Pizzas recién horneadas con masa crujiente y abundante queso fundido."
  },
  {
    "id": "santa-rosa",
    "name": "Santa Rosa",
    "slug": "santa-rosa",
    "category": "Comida variada y platos especiales",
    "tags": [
      "Helados",
      "Postres",
      "Chocolatería",
      "Waffles",
      "Bebidas"
    ],
    "rating": 4.9,
    "reviews": "950",
    "deliveryTime": "20-30 min",
    "deliveryFee": 3000,
    "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5LbVGUfKk77I4Wgjt4rG6DNFo_vGytVCEXfLBWSQ6Nw&s",
    "banner": "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80",
    "bgColor": "#8a2be2",
    "description": "Exquisitos helados artesanales, repostería fina, chocolates y waffles premium."
  }
];

export function getRestaurantById(id) {
  if (!id) return null;
  const cleanId = id.toLowerCase();
  return restaurants.find(r => r.id === cleanId || r.slug === cleanId) || null;
}
