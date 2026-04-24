/**
 * pizzas.js — Cardápio estático do UFood.
 * Cada pizza contém: id, nome, descricao, preco, categoria e emoji.
 * Para adicionar novos itens, basta incluir um novo objeto neste array.
 */
const pizzas = [
  // ── Tradicionais ──────────────────────────────────────────────────────────
  {
    id: 1,
    nome: 'Margherita',
    descricao: 'Molho de tomate artesanal, mussarela de búfala e manjericão fresco',
    preco: 39.9,
    categoria: 'Tradicionais',
    emoji: '🍕',
  },
  {
    id: 2,
    nome: 'Calabresa',
    descricao: 'Molho de tomate, calabresa fatiada, cebola roxa e azeitonas',
    preco: 37.9,
    categoria: 'Tradicionais',
    emoji: '🍕',
  },
  {
    id: 3,
    nome: 'Frango c/ Catupiry',
    descricao: 'Frango desfiado temperado, catupiry original e milho',
    preco: 41.9,
    categoria: 'Tradicionais',
    emoji: '🍕',
  },

  // ── Especiais ─────────────────────────────────────────────────────────────
  {
    id: 4,
    nome: 'Quatro Queijos',
    descricao: 'Mussarela, provolone, gorgonzola e parmesão ralado na hora',
    preco: 45.9,
    categoria: 'Especiais',
    emoji: '🧀',
  },
  {
    id: 5,
    nome: 'Portuguesa',
    descricao: 'Presunto, ovo, cebola, palmito, ervilha e azeitonas',
    preco: 43.9,
    categoria: 'Especiais',
    emoji: '🍕',
  },
  {
    id: 6,
    nome: 'Pepperoni',
    descricao: 'Molho de tomate, mussarela e fatias generosas de pepperoni defumado',
    preco: 47.9,
    categoria: 'Especiais',
    emoji: '🌶️',
  },

  // ── Doces ─────────────────────────────────────────────────────────────────
  {
    id: 7,
    nome: 'Chocolate',
    descricao: 'Cobertura cremosa de chocolate ao leite com granulado e leite condensado',
    preco: 35.9,
    categoria: 'Doces',
    emoji: '🍫',
  },
  {
    id: 8,
    nome: 'Banana c/ Nutella',
    descricao: 'Banana fatiada, Nutella generosa e granulado de chocolate',
    preco: 38.9,
    categoria: 'Doces',
    emoji: '🍌',
  },
  {
    id: 9,
    nome: 'Romeu e Julieta',
    descricao: 'Goiabada cremosa derretida com mussarela fresca',
    preco: 36.9,
    categoria: 'Doces',
    emoji: '🍓',
  },
];

export default pizzas;
