/**
 * Card.jsx — Componente de card reutilizável
 * Base para os cards do dashboard e demais páginas
 */

export default function Card({ children, className = '', onClick }) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 shadow-sm p-5 transition-shadow duration-200 hover:shadow-md ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
