/**
 * Topbar.jsx — Barra superior com busca, notificações e perfil do usuário
 */

import { Search, Bell, Menu } from 'lucide-react';
import { usuarioLogado } from '../../data/mockData';

export default function Topbar({ onMenuToggle, searchPlaceholder = 'Buscar no sistema...' }) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 md:px-6 gap-4 sticky top-0 z-30">
      {/* Botão hamburguer — apenas mobile */}
      <button
        onClick={onMenuToggle}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        aria-label="Abrir menu"
      >
        <Menu className="w-5 h-5 text-text-secondary" />
      </button>

      {/* Campo de busca */}
      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full bg-surface-alt border-0 rounded-lg pl-10 pr-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
        />
      </div>

      {/* Ações à direita */}
      <div className="flex items-center gap-3 md:gap-4 ml-auto">
        {/* Link Suporte */}
        <a
          href="#"
          className="hidden md:inline-flex text-sm text-text-secondary hover:text-primary transition-colors font-medium"
        >
          Suporte
        </a>

        {/* Notificações */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <Bell className="w-5 h-5 text-text-secondary" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Avatar e nome do usuário */}
        <div className="hidden md:flex items-center gap-2.5">
          <div className="text-right">
            <p className="text-sm font-semibold text-text-primary leading-tight">{usuarioLogado.nome}</p>
            <p className="text-xs text-text-secondary uppercase tracking-wide">{usuarioLogado.cargo}</p>
          </div>
          <img
            src={usuarioLogado.avatar}
            alt={usuarioLogado.nome}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100"
          />
        </div>
      </div>
    </header>
  );
}
