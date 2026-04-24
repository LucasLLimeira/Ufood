import React from 'react';
import PizzaCard from './PizzaCard';
import pizzas from '../data/pizzas';

// Extrai categorias únicas preservando a ordem de aparição no array
const categorias = [...new Set(pizzas.map((p) => p.categoria))];

/**
 * PizzaList — Agrupa e renderiza os PizzaCards por categoria.
 *
 * @param {Function} props.onAdicionar - Repassado para cada PizzaCard
 */
function PizzaList({ onAdicionar }) {
  return (
    <div className="space-y-10">
      {categorias.map((categoria) => (
        <section key={categoria}>
          {/* Título da categoria com destaque visual */}
          <h2 className="text-xl font-bold text-gray-700 mb-5 flex items-center gap-2">
            <span className="block w-1 h-6 bg-red-600 rounded-full" aria-hidden="true" />
            {categoria}
          </h2>

          {/* Grid responsivo: 1 coluna no mobile, 2 no tablet, 3 no desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {pizzas
              .filter((p) => p.categoria === categoria)
              .map((pizza) => (
                <PizzaCard
                  key={pizza.id}
                  pizza={pizza}
                  onAdicionar={onAdicionar}
                />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default PizzaList;
