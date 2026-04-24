import React from 'react';

/**
 * Header — Barra de navegação principal do UFood.
 * Fica fixada no topo da página com z-index alto para ficar sobre os micros.
 */
function Header() {
  return (
    <header className="bg-red-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
        {/* Logo emoji */}
        <span className="text-4xl" role="img" aria-label="Pizza">
          🍕
        </span>

        {/* Nome e tagline */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight leading-none">
            UFood
          </h1>
          <p className="text-red-200 text-xs font-medium mt-0.5">
            A melhor pizza da cidade, na sua mão
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
