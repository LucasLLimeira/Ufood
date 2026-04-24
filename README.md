# UFood 🍕

App de pedido para um único restaurante (estilo iFood) construído com **Micro Frontends** usando **Webpack Module Federation** e **Tailwind CSS**.

---

## Estrutura do Projeto

```
Ufood/
├── container/         → App principal que orquestra os micros   (porta 3000)
├── micro-cardapio/    → Lista de pizzas disponíveis             (porta 3001)
└── micro-pedido/      → Carrinho e resumo do pedido             (porta 3002)
```

Cada aplicação é **completamente independente**: tem seu próprio `package.json`, webpack, Tailwind e pode ser executada (e testada) sem as outras.

---

## Pré-requisitos

- **Node.js** 18 ou superior
- **npm** 9 ou superior

---

## Como Rodar

> Abra **3 terminais** — um para cada aplicação.

### 1. Micro Cardápio (porta 3001)

```bash
cd micro-cardapio
npm install
npm start
# http://localhost:3001
```

### 2. Micro Pedido (porta 3002)

```bash
cd micro-pedido
npm install
npm start
# http://localhost:3002
```

### 3. Container — App Principal (porta 3000)

> ⚠️ Os dois micros precisam estar rodando antes de iniciar o container.

```bash
cd container
npm install
npm start
# http://localhost:3000
```

A interface completa (header + cardápio + carrinho) estará disponível em **http://localhost:3000**.

---

## Como Funciona a Comunicação entre os Micros

A comunicação é feita via **CustomEvents globais do browser** (`window.dispatchEvent`), sem nenhum import direto entre os micros. Isso garante **desacoplamento total**: cada micro não sabe da existência do outro.

```
[micro-cardapio]
  └─ Usuário clica "+ Adicionar"
       └─ window.dispatchEvent(new CustomEvent('ufood:addItem', { detail: pizza }))
                                         │
                                         ▼ (evento viaja pelo window global)
[micro-pedido]
  └─ window.addEventListener('ufood:addItem', handler)
       └─ Atualiza o estado do carrinho com o item recebido
```

**No micro-cardapio** (`src/App.jsx`):
```js
const handleAdicionar = (pizza) => {
  window.dispatchEvent(new CustomEvent('ufood:addItem', { detail: pizza }));
};
```

**No micro-pedido** (`src/App.jsx`):
```js
useEffect(() => {
  const handler = (event) => {
    const pizza = event.detail;
    setItens((prev) => { /* lógica de adicionar/incrementar */ });
  };

  window.addEventListener('ufood:addItem', handler);
  return () => window.removeEventListener('ufood:addItem', handler); // cleanup
}, []);
```

---

## Module Federation

| Aplicação        | `name`    | Porta | Papel  | Expõe / Consome                        |
|------------------|-----------|-------|--------|----------------------------------------|
| `container`      | container | 3000  | Host   | Consome `cardapio/Cardapio` e `pedido/Pedido` |
| `micro-cardapio` | cardapio  | 3001  | Remote | Expõe `./Cardapio` → `./src/App`       |
| `micro-pedido`   | pedido    | 3002  | Remote | Expõe `./Pedido` → `./src/App`         |

O container importa os remotes via `React.lazy + Suspense`:

```js
const Cardapio = lazy(() => import('cardapio/Cardapio'));
const Pedido   = lazy(() => import('pedido/Pedido'));
```

`react` e `react-dom` são declarados como `singleton: true` em todos os projetos, garantindo **uma única instância de React** em toda a aplicação, mesmo com múltiplos micros carregados.

O padrão `src/index.js → import('./bootstrap')` (importação dinâmica) é obrigatório para que o webpack tenha tempo de negociar os módulos compartilhados antes de executar qualquer código React.

---

## Tecnologias

| Tecnologia               | Versão  | Papel                                        |
|--------------------------|---------|----------------------------------------------|
| React                    | 18.x    | UI de cada micro                             |
| Webpack                  | 5.x     | Bundler + Module Federation Plugin           |
| Webpack Dev Server       | 4.x     | Servidor de desenvolvimento                  |
| Tailwind CSS             | 3.x     | Estilização utilitária                       |
| PostCSS + Autoprefixer   | 8.x     | Pipeline de processamento CSS                |
| Babel                    | 7.x     | Transpilação de JSX e ES moderno             |
