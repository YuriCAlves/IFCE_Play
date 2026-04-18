/**
 * AppRouter.jsx — Configuração de rotas do sistema
 * Define todas as rotas com React Router DOM v6
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Dashboard from '../pages/Dashboard';
import Reservas from '../pages/Reservas';
import NovoEspaco from '../pages/NovoEspaco';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Redireciona a raiz para o dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/espacos/novo" element={<NovoEspaco />} />
          {/* Rotas placeholder para itens futuros do menu */}
          <Route path="/relatorios" element={<Dashboard />} />
          <Route path="/solicitacoes" element={<NovoEspaco />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
