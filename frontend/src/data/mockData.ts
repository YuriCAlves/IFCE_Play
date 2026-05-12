/**
 * mockData.ts — Dados fictícios centralizados do sistema IFCE Play
 */

// ============================================
// Tipos
// ============================================
export type Perfil = 'GESTOR' | 'PROFESSOR' | 'ALUNO'
export type TipoEspaco = 'LABORATORIO' | 'SALA_AULA' | 'AUDITORIO' | 'SALA_REUNIAO'
export type StatusReserva = 'PENDENTE' | 'APROVADA' | 'REJEITADA' | 'CANCELADA'
export type StatusEspaco = 'DISPONIVEL' | 'OCUPADO' | 'MANUTENCAO'

export interface Usuario {
  id: number
  nome: string
  email: string
  senha: string
  perfil: Perfil
  matricula: string
  avatar: string
}

export interface Espaco {
  id: number
  nome: string
  tipo: TipoEspaco
  bloco: string
  capacidade: number
  descricao: string
  ativo: boolean
  statusAtual: StatusEspaco
  horarioFuncionamento: string
  recursos: string[]
}

export interface Reserva {
  id: number
  usuarioId: number
  espacoId: number
  data: string
  horaInicio: string
  horaFim: string
  finalidade: string
  status: StatusReserva
  aprovadoPor: number | null
  createdAt: string
}

// ============================================
// Usuários Mock
// ============================================
export const usuarios: Usuario[] = [
  {
    id: 1,
    nome: 'Dr. Carlos Administrador',
    email: 'admin@ifce.edu.br',
    senha: 'admin123',
    perfil: 'GESTOR',
    matricula: '2024001',
    avatar: 'https://i.pravatar.cc/40?img=12',
  },
  {
    id: 2,
    nome: 'Prof. Marcos André',
    email: 'marcos@ifce.edu.br',
    senha: 'prof123',
    perfil: 'PROFESSOR',
    matricula: '2024002',
    avatar: 'https://i.pravatar.cc/40?img=3',
  },
  {
    id: 3,
    nome: 'Profa. Aline Souza',
    email: 'aline@ifce.edu.br',
    senha: 'prof123',
    perfil: 'PROFESSOR',
    matricula: '2024003',
    avatar: 'https://i.pravatar.cc/40?img=5',
  },
  {
    id: 4,
    nome: 'João Pedro Silva',
    email: 'joao@aluno.ifce.edu.br',
    senha: 'aluno123',
    perfil: 'ALUNO',
    matricula: '2024101',
    avatar: 'https://i.pravatar.cc/40?img=8',
  },
  {
    id: 5,
    nome: 'Maria Clara Oliveira',
    email: 'maria@aluno.ifce.edu.br',
    senha: 'aluno123',
    perfil: 'ALUNO',
    matricula: '2024102',
    avatar: 'https://i.pravatar.cc/40?img=9',
  },
]

// ============================================
// Espaços Mock
// ============================================
export const espacos: Espaco[] = [
  {
    id: 1,
    nome: 'Laboratório 01 — Redes',
    tipo: 'LABORATORIO',
    bloco: 'Bloco de Informática',
    capacidade: 40,
    descricao: 'Laboratório equipado com 40 computadores, projetor HDMI e sistema de som.',
    ativo: true,
    statusAtual: 'DISPONIVEL',
    horarioFuncionamento: '07:00 — 22:00',
    recursos: ['Computadores', 'Projetor HDMI', 'Ar Condicionado', 'Sistema de Som'],
  },
  {
    id: 2,
    nome: 'Laboratório 02 — Software',
    tipo: 'LABORATORIO',
    bloco: 'Bloco de Informática',
    capacidade: 35,
    descricao: 'Laboratório com estações de trabalho para desenvolvimento de software.',
    ativo: true,
    statusAtual: 'OCUPADO',
    horarioFuncionamento: '07:00 — 22:00',
    recursos: ['Computadores', 'Projetor HDMI', 'Ar Condicionado'],
  },
  {
    id: 3,
    nome: 'Auditório Central',
    tipo: 'AUDITORIO',
    bloco: 'Bloco Central',
    capacidade: 200,
    descricao: 'Auditório principal do campus com palco, sistema de som profissional e projetor.',
    ativo: true,
    statusAtual: 'DISPONIVEL',
    horarioFuncionamento: '07:00 — 22:00',
    recursos: ['Projetor', 'Sistema de Som', 'Microfone', 'Palco', 'Ar Condicionado'],
  },
  {
    id: 4,
    nome: 'Sala de Reuniões A',
    tipo: 'SALA_REUNIAO',
    bloco: 'Bloco Administrativo',
    capacidade: 15,
    descricao: 'Sala de reuniões com mesa oval, TV 55" e videoconferência.',
    ativo: true,
    statusAtual: 'DISPONIVEL',
    horarioFuncionamento: '08:00 — 18:00',
    recursos: ['TV 55"', 'Videoconferência', 'Ar Condicionado', 'Quadro Branco'],
  },
  {
    id: 5,
    nome: 'Laboratório de Física',
    tipo: 'LABORATORIO',
    bloco: 'Bloco de Ciências',
    capacidade: 30,
    descricao: 'Laboratório com bancadas e equipamentos para experimentos de física.',
    ativo: true,
    statusAtual: 'MANUTENCAO',
    horarioFuncionamento: '07:00 — 18:00',
    recursos: ['Bancadas', 'Equipamentos de Física', 'Projetor'],
  },
  {
    id: 6,
    nome: 'Sala B102',
    tipo: 'SALA_AULA',
    bloco: 'Bloco B',
    capacidade: 50,
    descricao: 'Sala de aula padrão com lousa digital e projetor.',
    ativo: true,
    statusAtual: 'DISPONIVEL',
    horarioFuncionamento: '07:00 — 22:00',
    recursos: ['Lousa Digital', 'Projetor', 'Ar Condicionado'],
  },
]

// ============================================
// Reservas Mock
// ============================================
export const reservas: Reserva[] = [
  {
    id: 1,
    usuarioId: 2,
    espacoId: 1,
    data: '2026-05-12',
    horaInicio: '08:00',
    horaFim: '10:00',
    finalidade: 'Aula de Redes de Computadores — Turma 2024.1',
    status: 'APROVADA',
    aprovadoPor: 1,
    createdAt: '2026-05-10T10:00:00',
  },
  {
    id: 2,
    usuarioId: 2,
    espacoId: 2,
    data: '2026-05-13',
    horaInicio: '14:00',
    horaFim: '16:00',
    finalidade: 'Laboratório de Engenharia de Software',
    status: 'APROVADA',
    aprovadoPor: 1,
    createdAt: '2026-05-10T11:00:00',
  },
  {
    id: 3,
    usuarioId: 3,
    espacoId: 3,
    data: '2026-05-14',
    horaInicio: '09:00',
    horaFim: '12:00',
    finalidade: 'Palestra: Inteligência Artificial na Educação',
    status: 'PENDENTE',
    aprovadoPor: null,
    createdAt: '2026-05-11T08:00:00',
  },
  {
    id: 4,
    usuarioId: 4,
    espacoId: 1,
    data: '2026-05-12',
    horaInicio: '14:00',
    horaFim: '16:00',
    finalidade: 'Grupo de Estudos — Algoritmos',
    status: 'PENDENTE',
    aprovadoPor: null,
    createdAt: '2026-05-11T09:00:00',
  },
  {
    id: 5,
    usuarioId: 5,
    espacoId: 4,
    data: '2026-05-15',
    horaInicio: '10:00',
    horaFim: '11:30',
    finalidade: 'Reunião do Diretório Acadêmico',
    status: 'REJEITADA',
    aprovadoPor: 1,
    createdAt: '2026-05-10T15:00:00',
  },
  {
    id: 6,
    usuarioId: 2,
    espacoId: 6,
    data: '2026-05-16',
    horaInicio: '08:00',
    horaFim: '10:00',
    finalidade: 'Aula de Estrutura de Dados',
    status: 'APROVADA',
    aprovadoPor: 1,
    createdAt: '2026-05-09T14:00:00',
  },
  {
    id: 7,
    usuarioId: 3,
    espacoId: 1,
    data: '2026-05-12',
    horaInicio: '10:00',
    horaFim: '12:00',
    finalidade: 'Projeto Integrador — Orientação',
    status: 'APROVADA',
    aprovadoPor: 1,
    createdAt: '2026-05-08T10:00:00',
  },
  {
    id: 8,
    usuarioId: 4,
    espacoId: 2,
    data: '2026-05-14',
    horaInicio: '16:00',
    horaFim: '18:00',
    finalidade: 'Prática de Programação Web',
    status: 'CANCELADA',
    aprovadoPor: null,
    createdAt: '2026-05-10T16:00:00',
  },
]

// ============================================
// Dados auxiliares
// ============================================
export const blocos = [
  'Bloco de Informática',
  'Bloco Central',
  'Bloco Administrativo',
  'Bloco de Ciências',
  'Bloco B',
]

export const tipoEspacoLabels: Record<TipoEspaco, string> = {
  LABORATORIO: 'Laboratório',
  SALA_AULA: 'Sala de Aula',
  AUDITORIO: 'Auditório',
  SALA_REUNIAO: 'Sala de Reunião',
}

export const statusReservaLabels: Record<StatusReserva, string> = {
  PENDENTE: 'Pendente',
  APROVADA: 'Aprovada',
  REJEITADA: 'Rejeitada',
  CANCELADA: 'Cancelada',
}

export const statusEspacoLabels: Record<StatusEspaco, string> = {
  DISPONIVEL: 'Disponível',
  OCUPADO: 'Ocupado',
  MANUTENCAO: 'Em Manutenção',
}

// ============================================
// Itens do menu da sidebar
// ============================================
export const menuItemsGestor = [
  { id: 'dashboard', label: 'Dashboard', rota: '/dashboard', icone: 'LayoutDashboard' },
  { id: 'espacos', label: 'Espaços', rota: '/espacos', icone: 'Building2' },
  { id: 'reservas', label: 'Reservas', rota: '/reservas', icone: 'CalendarDays' },
  { id: 'solicitacoes', label: 'Solicitações', rota: '/solicitacoes', icone: 'ClipboardList', badge: 2 },
]

export const menuItemsUsuario = [
  { id: 'dashboard', label: 'Dashboard', rota: '/dashboard', icone: 'LayoutDashboard' },
  { id: 'espacos', label: 'Catálogo', rota: '/espacos', icone: 'Building2' },
  { id: 'reservas', label: 'Reservas', rota: '/reservas', icone: 'CalendarDays' },
  { id: 'minhas-reservas', label: 'Minhas Reservas', rota: '/minhas-reservas', icone: 'BookOpen' },
]

// ============================================
// Dias e horários
// ============================================
export const diasSemana = ['SEG', 'TER', 'QUA', 'QUI', 'SEX']

export const horariosGrade = Array.from({ length: 16 }, (_, i) => {
  const hora = 7 + i
  return `${hora.toString().padStart(2, '0')}:00`
})
