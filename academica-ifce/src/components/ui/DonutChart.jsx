/**
 * DonutChart.jsx — Gráfico circular (donut) em SVG
 * Exibe o percentual de ocupação das salas
 */

export default function DonutChart({ percentage = 75, size = 200, strokeWidth = 18 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const center = size / 2;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Trilha de fundo */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Arco de progresso */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#1B5E20"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Texto central */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-text-primary">{percentage}%</span>
        <span className="text-sm text-text-secondary">Salas Ocupadas</span>
      </div>
    </div>
  );
}
