---
trigger: always_on
---

# Plano de Implementação — IFCE Play

## Visão Geral

Sistema web de gestão de espaços acadêmicos do IFCE.
**Ordem:** Frontend primeiro (React + Vite) → Backend depois (Spring Boot + PostgreSQL).
O frontend será desenvolvido inicialmente com **dados mock**, depois integrado com o backend via API REST.

---

## Fase 1 — Frontend: Fundação (React + Vite)

### 1.1 Setup do Projeto

- [ ] Criar novo projeto React com Vite (`npx create-vite@latest`)
- [ ] Instalar dependências: `react-router-dom`, `axios`, `lucide-react`
- [ ] Configurar estrutura de pastas (components, pages, services, hooks, context, routes, utils)
- [ ] Configurar variáveis de ambiente (`.env` com `VITE_API_URL`)

### 1.2 Design System e CSS Base

- [ ] Criar `index.css` com variáveis CSS (cores IFCE: verdes institucionais, neutros, alertas)
- [ ] Definir tipografia (Google Fonts — Inter ou similar)
- [ ] Implementar sistema de breakpoints para responsividade
- [ ] Definir tokens de espaçamento, bordas, sombras

### 1.3 Componentes UI Base

- [ ] `Button` — variantes: primary, secondary, danger, ghost; tamanhos: sm, md, lg
- [ ] `Input` — com label, placeholder, estado de erro
- [ ] `Select` — dropdown estilizado
- [ ] `Card` — container com sombra e padding
- [ ] `Modal` — overlay com animação de entrada/saída
- [ ] `Badge` — status (pendente, aprovado, rejeitado, cancelado)
- [ ] `DataTable` — tabela responsiva com linhas alternadas
- [ ] `EmptyState` — tela vazia com ícone e mensagem

---

## Fase 2 — Frontend: Layout e Autenticação

### 2.1 Layout Principal

- [ ] `Sidebar` — menu lateral colapsável com ícones (Lucide)
- [ ] `Topbar` — barra superior com nome do usuário, avatar, logout
- [ ] `Layout` — wrapper que combina Sidebar + Topbar + conteúdo
- [ ] Responsividade: sidebar vira drawer no mobile (hamburger menu)

### 2.2 Sistema de Rotas

- [ ] Configurar `react-router-dom` v6 com rotas aninhadas
- [ ] `AppRouter.jsx` — rotas públicas (Login) e protegidas (Dashboard, etc.)
- [ ] `ProtectedRoute` — componente que valida autenticação e perfil
- [ ] Redirecionamento automático: não logado → `/login`, logado → `/dashboard`

### 2.3 Autenticação (Mock)

- [ ] `AuthContext.jsx` — contexto global com estado do usuário logado
- [ ] `useAuth.js` — hook com funções: login, logout, isAuthenticated, usuario, perfil
- [ ] `authService.js` — mock inicial simulando login com credenciais fixas
- [ ] Página `Login.jsx` — formulário de email + senha com validação

### 2.4 Mock Data

- [ ] `mockData.js` — dados fictícios centralizados:
  - Usuários (1 gestor, 2 professores, 2 alunos)
  - Espaços (labs, salas, auditórios)
  - Reservas (pendentes, aprovadas, rejeitadas)

---

## Fase 3 — Frontend: Páginas Funcionais

### 3.1 Dashboard

- [ ] Card de **ocupação** — total de espaços, em uso, disponíveis (donut chart)
- [ ] Card de **próximas reservas** — lista das 3 próximas
- [ ] Card de **alertas de conflitos** — conflitos detectados
- [ ] Card de **estatísticas** — eficiência de uso, manutenções
- [ ] Responsivo: cards empilham no mobile

### 3.2 Gestão de Espaços (GESTOR)

- [ ] `Espacos.jsx` — listagem em tabela/cards com filtros (tipo, bloco)
- [ ] Botão "Novo Espaço" → abre modal ou página com formulário
- [ ] Formulário: nome, tipo (enum), bloco, capacidade, descrição
- [ ] Ações: editar, desativar/ativar
- [ ] Badge de status ativo/inativo

### 3.3 Reservas

- [ ] `Reservas.jsx` — calendário semanal com visualização de horários ocupados
- [ ] Seleção de espaço via dropdown → mostra calendário do espaço
- [ ] Clique em horário vazio → abre modal de "Solicitar Reserva"
- [ ] Modal com: espaço (pré-selecionado), data, hora início, hora fim, finalidade
- [ ] Validação visual: horários já ocupados ficam bloqueados/cinza

### 3.4 Minhas Reservas (PROF/ALUNO)

- [ ] Lista de reservas do usuário logado
- [ ] Filtros: por status (pendente, aprovada, rejeitada, cancelada)
- [ ] Ação: cancelar reserva pendente
- [ ] Badge colorido por status

### 3.5 Solicitações (GESTOR)

- [ ] `Solicitacoes.jsx` — lista de reservas com status PENDENTE
- [ ] Mostra: solicitante, espaço, data/horário, finalidade
- [ ] Ações: botão Aprovar (verde) e Rejeitar (vermelho)
- [ ] Após ação: item some da lista ou muda de status
- [ ] Indicador de quantidade no menu lateral (badge com número)

---

## Fase 4 — Frontend: Polimento

### 4.1 Micro-interações e UX

- [ ] Transições suaves entre páginas (fade/slide)
- [ ] Loading skeletons nos cards e tabelas
- [ ] Toast/snackbar para feedback (reserva criada, aprovada, erro)
- [ ] Hover effects nos cards e botões
- [ ] Animação do sidebar (abrir/fechar)

### 4.2 Responsividade Final

- [ ] Testar todas as páginas em 3 breakpoints: desktop (1200+), tablet (768-1199), mobile (< 768)
- [ ] Sidebar colapsa em drawer no mobile
- [ ] Tabelas viram cards no mobile
- [ ] Calendário adapta para visualização diária no mobile

### 4.3 Preparação para Integração

- [ ] Criar camada `services/` com todas as chamadas API (Axios)
- [ ] `api.js` — instância Axios com baseURL, interceptors, withCredentials
- [ ] `authService.js` — login(), logout(), me()
- [ ] `espacoService.js` — listar(), criar(), editar(), desativar()
- [ ] `reservaService.js` — listar(), minhas(), solicitar(), aprovar(), rejeitar(), cancelar()
- [ ] Cada service tem flag para alternar entre mock e API real

---

## Fase 5 — Backend: Fundação (Spring Boot)

### 5.1 Setup do Projeto

- [ ] Criar projeto Spring Boot via Spring Initializr:
  - Java 17+
  - Spring Web, Spring Data JPA, Spring Security
  - PostgreSQL Driver, Lombok, Validation
- [ ] Configurar `application.properties` (datasource, JPA, CORS)
- [ ] Criar banco PostgreSQL (`ifce_academica`)

### 5.2 Entidades e Enums

- [ ] `Perfil.java` — enum (GESTOR, PROFESSOR, ALUNO)
- [ ] `TipoEspaco.java` — enum (LABORATORIO, SALA_AULA, AUDITORIO, SALA_REUNIAO)
- [ ] `StatusReserva.java` — enum (PENDENTE, APROVADA, REJEITADA, CANCELADA)
- [ ] `Usuario.java` — entidade JPA com anotações (@Entity, @Id, @Enumerated)
- [ ] `Espaco.java` — entidade JPA
- [ ] `Reserva.java` — entidade JPA com @ManyToOne para Usuario e Espaco

### 5.3 Repositories

- [ ] `UsuarioRepository` — findByEmail()
- [ ] `EspacoRepository` — findByTipo(), findByAtivo()
- [ ] `ReservaRepository` — findByUsuarioId(), findByEspacoIdAndData(), query de conflito

---

## Fase 6 — Backend: Regras de Negócio

### 6.1 Services

- [ ] `AuthService` — autenticar(email, senha), buscar usuário logado
- [ ] `EspacoService` — CRUD + desativação (cancela pendentes ao desativar)
- [ ] `ReservaService` — solicitar, aprovar, rejeitar, cancelar, listar com filtros
- [ ] `ConflitoService` — validar sobreposição de horários antes de salvar

### 6.2 DTOs e Validação

- [ ] `LoginRequest` — @NotBlank email, senha
- [ ] `ReservaRequest` — @NotNull espacoId, data, horaInicio, horaFim, @NotBlank finalidade
- [ ] `EspacoRequest` — @NotBlank nome, tipo, bloco
- [ ] Response DTOs para não expor entidades diretamente

---

## Fase 7 — Backend: Controllers e Security

### 7.1 Spring Security

- [ ] `SecurityConfig` — configurar sessão, CORS, proteção CSRF
- [ ] Permitir `/api/auth/login` sem autenticação
- [ ] Proteger demais rotas por perfil (@PreAuthorize)
- [ ] `CorsConfig` — permitir origin do React (localhost:5173)

### 7.2 REST Controllers

- [ ] `AuthController` — POST /login, POST /logout, GET /me
- [ ] `EspacoController` — CRUD com validação de perfil GESTOR
- [ ] `ReservaController` — solicitar (PROF/ALUNO), aprovar/rejeitar (GESTOR)

### 7.3 Tratamento de Erros

- [ ] `GlobalExceptionHandler` — @ControllerAdvice
- [ ] Exceção customizada: `ConflitoDeHorarioException` → 409
- [ ] Exceção customizada: `AcessoNegadoException` → 403
- [ ] Validação de DTOs: @Valid → 400 com mensagens claras

---

## Fase 8 — Integração Frontend ↔ Backend

### 8.1 Conectar Services

- [ ] Trocar mock por chamadas API reais em todos os services do React
- [ ] Testar fluxo completo: login → dashboard → reservar → aprovar
- [ ] Configurar proxy no Vite para evitar problemas de CORS em dev

### 8.2 Seed de Dados

- [ ] Criar `data.sql` ou `CommandLineRunner` com dados iniciais:
  - 1 gestor (admin@ifce.edu.br / admin123)
  - 2 professores
  - 2 alunos
  - 6 espaços (labs, salas, auditórios)
  - 5 reservas de exemplo

### 8.3 Testes de Integração

- [ ] Testar todos os endpoints via Postman/Insomnia
- [ ] Testar fluxo E2E no navegador (3 perfis diferentes)
- [ ] Validar detecção de conflitos com reservas sobrepostas
- [ ] Testar responsividade no celular

---

## Resumo de Entregáveis por Fase

| Fase | Entregável | Estimativa |
|------|-----------|------------|
| 1 | Projeto React configurado + componentes UI | 1-2 dias |
| 2 | Layout + rotas + auth mock | 1-2 dias |
| 3 | Todas as 5 páginas funcionais com mock | 3-4 dias |
| 4 | Polimento visual + responsividade | 1-2 dias |
| 5 | Projeto Spring Boot + entidades + repos | 1-2 dias |
| 6 | Services + detecção de conflitos | 1-2 dias |
| 7 | Controllers + Security + erros | 1-2 dias |
| 8 | Integração + testes E2E | 1-2 dias |
| **Total** | **Sistema completo V1** | **~10-16 dias** |

---

## Verificação Final

### Critérios de Aceite da V1

- [ ] Login funciona com 3 perfis diferentes
- [ ] Gestor cria/edita/desativa espaços
- [ ] Professor e aluno solicitam reservas
- [ ] Gestor aprova/rejeita reservas pendentes
- [ ] Sistema impede reservas com conflito de horário
- [ ] Interface responsiva (desktop + mobile)
- [ ] Dados persistem no PostgreSQL
