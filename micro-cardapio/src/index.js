// A importação dinâmica é obrigatória no Module Federation.
// Ela permite que o webpack negocie os módulos compartilhados (react, react-dom)
// com os outros micros ANTES de executar qualquer código da aplicação.
import('./bootstrap');
