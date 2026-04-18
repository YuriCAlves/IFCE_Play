/**
 * mockData.js — Dados fictícios centralizados do sistema Academica IFCE
 * Todos os dados mockados utilizados nas telas ficam neste arquivo.
 */

// ============================================
// Dados de Ocupação
// ============================================
export const dadosOcupacao = {
  total: 56,
  emUso: 42,
  disponiveis: 14,
  percentual: 75,
};

// ============================================
// Próximas Reservas
// ============================================
export const proximasReservas = [
  {
    id: 1,
    espaco: 'Laboratório de Redes II',
    tipo: 'laboratorio',
    responsavel: 'Prof. Marcos André',
    finalidade: 'Engenharia de Redes',
    horarioInicio: '14:00',
    horarioFim: '16:00',
    status: 'confirmado',
  },
  {
    id: 2,
    espaco: 'Auditório Central',
    tipo: 'auditorio',
    responsavel: 'Secretaria Acadêmica',
    finalidade: 'Palestra Inaugural',
    horarioInicio: '15:30',
    horarioFim: '18:00',
    status: 'confirmado',
  },
  {
    id: 3,
    espaco: 'Sala de Reunião A2',
    tipo: 'reuniao',
    responsavel: 'Gabinete da Direção',
    finalidade: 'Reunião Extraordinária',
    horarioInicio: '18:00',
    horarioFim: '19:00',
    status: 'pendente',
  },
];

// ============================================
// Alertas de Conflitos
// ============================================
export const alertasConflitos = [
  {
    id: 1,
    titulo: 'Sobreposição de Horário — Bloco B',
    descricao: 'Sala B102 possui duas reservas para hoje às 19:00.',
    acao: 'Resolver',
  },
  {
    id: 2,
    titulo: 'Pendência de Chaves',
    descricao: 'Laboratório de Física não foi liberado após o uso das 10h.',
    acao: 'Notificar',
  },
];

// ============================================
// Manutenções do Dia
// ============================================
export const manutencoesHoje = {
  total: 4,
  proximaHora: '16:30',
};

// ============================================
// Eficiência de Uso
// ============================================
export const eficienciaUso = {
  percentual: 92,
};

// ============================================
// Gestores Online
// ============================================
export const gestoresOnline = {
  avatares: [
    'https://i.pravatar.cc/40?img=1',
    'https://i.pravatar.cc/40?img=2',
    'https://i.pravatar.cc/40?img=3',
  ],
  extras: 12,
  mensagem: 'Monitorando o Campus Central agora.',
};

// ============================================
// Usuário Logado
// ============================================
export const usuarioLogado = {
  nome: 'Dr. Marcos Silva',
  cargo: 'Docente - TI',
  avatar: 'https://i.pravatar.cc/40?img=12',
};

// ============================================
// Espaços Disponíveis
// ============================================
export const espacosDisponiveis = [
  { id: 1, nome: 'Laboratório 01 - Redes', tipo: 'laboratorio', bloco: 'Bloco de Informática' },
  { id: 2, nome: 'Laboratório 02 - Software', tipo: 'laboratorio', bloco: 'Bloco de Informática' },
  { id: 3, nome: 'Sala de Reuniões A', tipo: 'reuniao', bloco: 'Bloco Administrativo' },
  { id: 4, nome: 'Auditório Central', tipo: 'auditorio', bloco: 'Bloco Central' },
  { id: 5, nome: 'Laboratório de Física', tipo: 'laboratorio', bloco: 'Bloco de Ciências' },
  { id: 6, nome: 'Sala de Reunião A2', tipo: 'reuniao', bloco: 'Bloco Administrativo' },
];

// ============================================
// Reservas do Calendário Semanal
// ============================================
export const reservasCalendario = [
  {
    id: 1,
    titulo: 'ALGORITMOS I',
    responsavel: 'Prof. Carlos Gomes',
    sala: 'LAB 01',
    diaSemana: 0, // segunda
    horaInicio: 8,
    horaFim: 9.5,
    cor: 'medio', // verde médio
  },
  {
    id: 2,
    titulo: 'PROJETO INTEG...',
    responsavel: 'Minha Reserva',
    sala: 'LAB 02',
    diaSemana: 1, // terça
    horaInicio: 9,
    horaFim: 10.5,
    cor: 'escuro', // verde escuro
  },
  {
    id: 3,
    titulo: 'MANUTENÇÃO',
    responsavel: 'TI Campus',
    sala: '',
    diaSemana: 3, // quinta
    horaInicio: 7,
    horaFim: 8.5,
    cor: 'manutencao', // rosa/vermelho
  },
  {
    id: 4,
    titulo: 'ESTRUTURA DE...',
    responsavel: 'Dra. Aline Souza',
    sala: 'LAB 01',
    diaSemana: 4, // sexta
    horaInicio: 10,
    horaFim: 11.5,
    cor: 'claro', // verde claro
  },
];

// ============================================
// Campi disponíveis
// ============================================
export const campi = [
  { id: 1, nome: 'Fortaleza - Benfica' },
  { id: 2, nome: 'Fortaleza - Aldeota' },
  { id: 3, nome: 'Maracanaú' },
];

// ============================================
// Setores / Blocos
// ============================================
export const setores = [
  { id: 1, nome: 'Bloco de Informática' },
  { id: 2, nome: 'Bloco de Ciências' },
  { id: 3, nome: 'Bloco Administrativo' },
  { id: 4, nome: 'Bloco Central' },
];

// ============================================
// Salas filtráveis
// ============================================
export const salasFiltraveis = [
  { id: 1, nome: 'Laboratório 01 - Redes', selecionada: true },
  { id: 2, nome: 'Laboratório 02 - Software', selecionada: true },
  { id: 3, nome: 'Sala de Reuniões A', selecionada: false },
];

// ============================================
// Recursos e equipamentos
// ============================================
export const recursosEquipamentos = [
  { id: 1, nome: 'Projetor HDMI', selecionado: false },
  { id: 2, nome: 'Ar Condicionado', selecionado: true },
  { id: 3, nome: 'Sistema de Som', selecionado: false },
  { id: 4, nome: 'Cadeiras Extras', selecionado: false },
  { id: 5, nome: 'Lousa Digital', selecionado: false },
  { id: 6, nome: 'Outros', selecionado: false },
];

// ============================================
// Itens do menu da sidebar
// ============================================
export const menuItems = [
  { id: 'dashboard', label: 'Dashboard', rota: '/dashboard', icone: 'LayoutDashboard' },
  { id: 'reservas', label: 'Reservas', rota: '/reservas', icone: 'CalendarDays' },
  { id: 'espacos', label: 'Espaços', rota: '/espacos/novo', icone: 'Building2' },
  { id: 'relatorios', label: 'Relatórios', rota: '/relatorios', icone: 'BarChart3' },
  { id: 'solicitacoes', label: 'Solicitações', rota: '/solicitacoes', icone: 'ClipboardList' },
];

// ============================================
// Dias da semana para o calendário
// ============================================
export const diasSemana = [
  { abreviacao: 'SEG', dia: 18 },
  { abreviacao: 'TER', dia: 19 },
  { abreviacao: 'QUA', dia: 20 },
  { abreviacao: 'QUI', dia: 21 },
  { abreviacao: 'SEX', dia: 22 },
];

// ============================================
// Horários do calendário (07:00 às 18:00)
// ============================================
export const horariosCalendario = Array.from({ length: 12 }, (_, i) => {
  const hora = 7 + i;
  return `${hora.toString().padStart(2, '0')}:00`;
});
