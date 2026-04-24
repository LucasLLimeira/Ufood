import React from 'react';

/**
 * PedidoItem — Exibe um item do carrinho com controles de quantidade e remoção.
 *
 * @param {Object}   props.item       - Item { id, nome, preco, quantidade }
 * @param {Function} props.onAumentar - Incrementa a quantidade do item
 * @param {Function} props.onDiminuir - Decrementa a quantidade (remove se chegar a 0)
 * @param {Function} props.onRemover  - Remove o item independente da quantidade
 */
function PedidoItem({ item, onAumentar, onDiminuir, onRemover }) {
  // Subtotal deste item: preço unitário × quantidade
  const subtotal = (item.preco * item.quantidade).toFixed(2).replace('.', ',');

  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">

      {/* Emoji da pizza */}
      <span className="text-2xl flex-shrink-0" role="img" aria-label={item.nome}>
        {item.emoji}
      </span>

      {/* Nome e subtotal */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 text-sm truncate">{item.nome}</p>
        <p className="text-xs text-gray-400 mt-0.5">R$ {subtotal}</p>
      </div>

      {/* Controles de quantidade */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {/* Diminuir */}
        <button
          onClick={() => onDiminuir(item.id)}
          aria-label={`Diminuir quantidade de ${item.nome}`}
          className="w-7 h-7 flex items-center justify-center rounded-full border border-red-300 text-red-600 hover:bg-red-50 transition-colors font-bold text-base leading-none"
        >
          −
        </button>

        {/* Quantidade atual */}
        <span className="w-5 text-center text-sm font-bold text-gray-700">
          {item.quantidade}
        </span>

        {/* Aumentar */}
        <button
          onClick={() => onAumentar(item.id)}
          aria-label={`Aumentar quantidade de ${item.nome}`}
          className="w-7 h-7 flex items-center justify-center rounded-full border border-red-300 text-red-600 hover:bg-red-50 transition-colors font-bold text-base leading-none"
        >
          +
        </button>

        {/* Remover */}
        <button
          onClick={() => onRemover(item.id)}
          aria-label={`Remover ${item.nome} do pedido`}
          className="w-7 h-7 flex items-center justify-center rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors ml-1 text-xs"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default PedidoItem;
