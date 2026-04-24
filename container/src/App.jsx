import React, { lazy, Suspense } from 'react';
import './index.css';
import Header from './components/Header';

/**
 * Importação dos remotes via Module Federation + React.lazy.
 *
 * React.lazy + Suspense permite que o webpack carregue o bundle de cada micro
 * de forma assíncrona (code splitting) apenas quando necessário.
 *
 * Formato: import('<nome_declarado_em_remotes>/<componente_exposto>')
 */
const Cardapio = lazy(() => import('cardapio/Cardapio'));
const Pedido = lazy(() => import('pedido/Pedido'));

/**
 * Fallback genérico exibido enquanto um micro ainda não terminou de carregar.
 * @param {string} props.texto - Mensagem de carregamento
 */
function Carregando({ texto }) {
  return (
    <div className="flex items-center justify-center h-48 text-gray-400 text-sm animate-pulse">
      <span>{texto}</span>
    </div>
  );
}

/**
 * App do container — Orquestra o layout e integra os micro frontends.
 *
 * Layout:
 *  - Coluna principal (flex-1): micro-cardapio com a lista de pizzas
 *  - Sidebar fixa (lg:w-80):   micro-pedido com o carrinho
 */
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cabeçalho global */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6 items-start">

        {/* ── Seção do Cardápio ─────────────────────────────────────────── */}
        <section className="flex-1 min-w-0 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 pt-6 pb-3">
            <h2 className="text-2xl font-bold text-gray-800">Cardápio</h2>
            <p className="text-sm text-gray-400 mt-1">
              Escolha as suas pizzas favoritas e adicione ao pedido
            </p>
          </div>

          {/* Micro-cardapio carregado remotamente */}
          <Suspense fallback={<Carregando texto="Carregando cardápio..." />}>
            <Cardapio />
          </Suspense>
        </section>

        {/* ── Sidebar do Pedido ─────────────────────────────────────────── */}
        <aside className="w-full lg:w-80 flex-shrink-0 bg-white rounded-2xl shadow-sm overflow-hidden sticky top-24 self-start">
          <div className="px-5 pt-5 pb-3 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">🛒 Meu Pedido</h2>
          </div>

          {/* Micro-pedido carregado remotamente */}
          <Suspense fallback={<Carregando texto="Carregando pedido..." />}>
            <Pedido />
          </Suspense>
        </aside>

      </main>
    </div>
  );
}

export default App;
