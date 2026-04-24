import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Monta o micro-cardapio de forma independente no elemento #root
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
