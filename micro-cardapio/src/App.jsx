import React from 'react';
import './index.css';
import PizzaList from './components/PizzaList';

/**
 * App do micro-cardapio.
 *
 * Responsabilidade única: renderizar o cardápio e comunicar ao restante da
 * aplicação que um item foi adicionado ao pedido.
 *
 * A comunicação é feita via CustomEvent global, mantendo o micro completamente
 * desacoplado do micro-pedido — nenhum import direto entre eles.
 */
function App() {
  /**
   * Disparado ao clicar em "+ Adicionar" em qualquer PizzaCard.
   * O micro-pedido escuta este evento via window.addEventListener.
   *
   * @param {Object} pizza - Objeto completo da pizza selecionada
   */
  const handleAdicionar = (pizza) => {
    window.dispatchEvent(
      new CustomEvent('ufood:addItem', { detail: pizza })
    );
  };

  return (
    <div className="p-6">
      <PizzaList onAdicionar={handleAdicionar} />
    </div>
  );
}

export default App;
