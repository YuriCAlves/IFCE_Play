/**
 * Sidebar.jsx — Barra lateral de navegação
 * Contém logo, menu de navegação, informações do usuário e botão de nova reserva
 */

import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Building2,
  BarChart3,
  ClipboardList,
  Plus,
  X,
} from 'lucide-react';
import { menuItems, usuarioLogado } from '../../data/mockData';

// Mapeamento dos nomes de ícones para componentes Lucide
const iconMap = {
  LayoutDashboard,
  CalendarDays,
  Building2,
  BarChart3,
  ClipboardList,
};

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (rota) => {
    navigate(rota);
    onClose?.();
  };

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-white border-r border-gray-100 flex flex-col z-50 sidebar-transition
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:z-auto`}
      >
        {/* Logo */}
        <div className="px-5 pt-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-text-primary text-sm leading-tight">Academica IFCE</h1>
              <p className="text-xs text-text-secondary">Gestão de Espaços</p>
            </div>
          </div>
          {/* Botão fechar no mobile */}
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Menu de navegação */}
        <nav className="flex-1 px-3 py-2">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = iconMap[item.icone];
              const isActive = location.pathname === item.rota || 
                (item.rota === '/dashboard' && location.pathname === '/');
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.rota)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                      ${
                        isActive
                          ? 'bg-primary-bg-light text-primary border-l-[3px] border-primary'
                          : 'text-text-secondary hover:bg-gray-50 border-l-[3px] border-transparent'
                      }`}
                  >
                    {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Rodapé: info do usuário */}
        <div className="px-4 py-3 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={usuarioLogado.avatar}
              alt={usuarioLogado.nome}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-primary-bg-light"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-text-primary truncate">{usuarioLogado.nome}</p>
              <p className="text-xs text-text-secondary truncate">{usuarioLogado.cargo}</p>
            </div>
          </div>

          {/* Botão Nova Reserva */}
          <button
            onClick={() => handleNavigation('/espacos/novo')}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-light transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Nova Reserva
          </button>
        </div>
      </aside>
    </>
  );
}
