import React, { useState, useEffect } from 'react';
import './index.css';
import PedidoItem from './components/PedidoItem';
import PedidoResumo from './components/PedidoResumo';

/**
 * App do micro-pedido.
 *
 * Gerencia o estado do carrinho e escuta o evento global 'ufood:addItem'
 * disparado pelo micro-cardapio. A comunicação é totalmente desacoplada:
 * este micro não importa nada do micro-cardapio diretamente.
 */
function App() {
  // Estado do carrinho: array de itens { ...pizza, quantidade }
  const [itens, setItens] = useState([]);

  // Registra o listener ao montar e remove ao desmontar (cleanup)
  useEffect(() => {
    /**
     * Recebe uma pizza do cardápio via CustomEvent.
     * Se a pizza já existe no carrinho, incrementa a quantidade.
     * Caso contrário, adiciona com quantidade = 1.
     */
    const handleAddItem = (event) => {
      const pizza = event.detail;

      setItens((prev) => {
        const existente = prev.find((i) => i.id === pizza.id);

        if (existente) {
          // Pizza já no carrinho — apenas incrementa a quantidade
          return prev.map((i) =>
            i.id === pizza.id ? { ...i, quantidade: i.quantidade + 1 } : i
          );
        }

        // Nova pizza — adiciona ao carrinho com quantidade inicial 1
        return [...prev, { ...pizza, quantidade: 1 }];
      });
    };

    window.addEventListener('ufood:addItem', handleAddItem);

    // Cleanup: remove o listener quando o componente é desmontado,
    // evitando memory leaks e handlers duplicados
    return () => window.removeEventListener('ufood:addItem', handleAddItem);
  }, []); // [] garante que o efeito roda apenas uma vez

  // ── Handlers de manipulação do carrinho ──────────────────────────────────

  /** Incrementa a quantidade de um item pelo id */
  const aumentar = (id) =>
    setItens((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantidade: i.quantidade + 1 } : i))
    );

  /** Decrementa a quantidade; remove o item se chegar a 0 */
  const diminuir = (id) =>
    setItens((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item.quantidade === 1) return prev.filter((i) => i.id !== id);
      return prev.map((i) =>
        i.id === id ? { ...i, quantidade: i.quantidade - 1 } : i
      );
    });

  /** Remove um item diretamente do carrinho, independente da quantidade */
  const remover = (id) =>
    setItens((prev) => prev.filter((i) => i.id !== id));

  // Valor total: soma de (preço × quantidade) de todos os itens
  const total = itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0);

  /** Confirma o pedido, exibe resumo e limpa o carrinho */
  const finalizar = () => {
    if (itens.length === 0) return;
    alert(
      `✅ Pedido confirmado!\nTotal: R$ ${total.toFixed(2).replace('.', ',')}\n\nObrigado por escolher o UFood! 🍕`
    );
    setItens([]);
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="p-4">
      {itens.length === 0 ? (
        /* Estado vazio — orienta o usuário a adicionar itens */
        <div className="flex flex-col items-center justify-center py-14 text-gray-400 select-none">
          <span className="text-5xl mb-3" role="img" aria-label="Carrinho vazio">
            🛒
          </span>
          <p className="text-sm font-medium">Seu pedido está vazio</p>
          <p className="text-xs mt-1">Adicione pizzas do cardápio!</p>
        </div>
      ) : (
        <>
          {/* Lista de itens adicionados */}
          <div>
            {itens.map((item) => (
              <PedidoItem
                key={item.id}
                item={item}
                onAumentar={aumentar}
                onDiminuir={diminuir}
                onRemover={remover}
              />
            ))}
          </div>

          {/* Resumo com total e botão de finalização */}
          <PedidoResumo total={total} onFinalizar={finalizar} />
        </>
      )}
    </div>
  );
}

export default App;
