import React from 'react';

/**
 * PizzaCard — Exibe as informações de uma pizza e o botão de adição ao pedido.
 *
 * @param {Object}   props.pizza       - Dados da pizza { id, nome, descricao, preco, emoji }
 * @param {Function} props.onAdicionar - Callback chamado com o objeto pizza ao clicar em "Adicionar"
 */
function PizzaCard({ pizza, onAdicionar }) {
  return (
    <div className="bg-white rounded-2xl  shadow-md hover:shadow-xl hover:shadow-red-300 transition-shadow duration-200 p-5 flex flex-col justify-between gap-4 border border-gray-100">

      {/* Cabeçalho: emoji + nome + descrição */}
      <div>
        <span className="text-5xl" role="img" aria-label={pizza.nome}>
          {pizza.emoji}
        </span>
        <h3 className="mt-3 text-lg font-bold text-gray-800 leading-tight">
          {pizza.nome}
        </h3>
        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
          {pizza.descricao}
        </p>
      </div>

      {/* Rodapé: preço + botão */}
      <div className="flex items-center justify-between">
        <span className="text-red-600 font-extrabold text-xl">
          R$ {pizza.preco.toFixed(2).replace('.', ',')}
        </span>
        <button
          onClick={() => onAdicionar(pizza)}
          className="bg-red-600 hover:bg-red-700 active:scale-95 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          + Adicionar
        </button>
      </div>
    </div>
  );
}

export default PizzaCard;
