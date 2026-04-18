/**
 * Layout.jsx — Layout principal com Sidebar + Topbar + Conteúdo
 * Estrutura base que envolve todas as páginas do sistema
 */

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

// Mapeamento de placeholder de busca por rota
const searchPlaceholders = {
  '/dashboard': 'Buscar por salas ou horários...',
  '/': 'Buscar por salas ou horários...',
  '/reservas': 'Buscar sala, bloco ou docente...',
  '/espacos/novo': 'Buscar no sistema...',
  '/relatorios': 'Buscar relatórios...',
  '/solicitacoes': 'Buscar solicitações...',
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Obtém o placeholder de busca baseado na rota atual
  const pathname = window.location.pathname;
  const searchPlaceholder = searchPlaceholders[pathname] || 'Buscar no sistema...';

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Área principal */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <Topbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          searchPlaceholder={searchPlaceholder}
        />

        {/* Conteúdo da página */}
        <main className="flex-1 overflow-y-auto bg-surface-alt p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
