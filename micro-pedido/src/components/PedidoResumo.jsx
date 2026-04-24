import React from 'react';

/**
 * PedidoResumo — Mostra o total do pedido e o botão de finalização.
 *
 * @param {number}   props.total      - Valor total calculado pelo App pai
 * @param {Function} props.onFinalizar - Callback disparado ao confirmar o pedido
 */
function PedidoResumo({ total, onFinalizar }) {
  const totalFormatado = total.toFixed(2).replace('.', ',');

  return (
    <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
      {/* Linha do total */}
      <div className="flex justify-between items-center">
        <span className="text-gray-500 font-medium">Total</span>
        <span className="text-2xl font-extrabold text-gray-800">
          R$ {totalFormatado}
        </span>
      </div>

      {/* Botão de confirmação */}
      <button
        onClick={onFinalizar}
        className="w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold py-3.5 rounded-2xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Finalizar Pedido
      </button>
    </div>
  );
}

export default PedidoResumo;
