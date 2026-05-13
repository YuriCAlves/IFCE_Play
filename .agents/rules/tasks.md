🗄️ Módulo 1: Banco de Dados (PostgreSQL)
A fundação do sistema será baseada em modelagem relacional forte com flexibilidade para metadados
.
Task 1.1: Setup e DDL Inicial
Criar o banco de dados ifce_academica
.
Criar os ENUMs no banco: perfil (GESTOR, PROFESSOR, ALUNO), tipo de espaço (LABORATORIO, SALA_AULA, etc.) e status da reserva (PENDENTE, APROVADA, etc.)
.
Task 1.2: Criação das Tabelas Principais
Implementar tabela usuarios com restrições de unicidade (email, matricula)
.
Implementar tabela espacos utilizando o tipo JSONB para os metadados flexíveis (equipamentos e características específicas)
.
Implementar tabela reservas com chaves estrangeiras (usuario_id, espaco_id, aprovado_por)
.
Task 1.3: Integridade e Regras de Conflito
Criar constraints (ex: EXCLUDE) ou triggers nativas no PostgreSQL para impedir a inserção de reservas com sobreposição de horários no mesmo espaço e data
.
Task 1.4: Script de Semente (Seed Data)
Desenvolver um script data.sql populando o banco com 1 Gestor, 2 Professores, 2 Alunos, 6 Espaços e algumas reservas de exemplo para agilizar o desenvolvimento do front-end
.

--------------------------------------------------------------------------------
⚙️ Módulo 2: Back-end (Java + Spring Boot)
O back-end servirá como o motor de regras de negócios e segurança, expondo a API REST
.
Task 2.1: Estrutura do Projeto e Configuração
Inicializar o projeto via Spring Initializr (Java 17+, Spring Web, Data JPA, Security, PostgreSQL Driver, Lombok)
.
Configurar a string de conexão, CORS e inicialização do OpenAPI/Swagger (Design-First)
.
Task 2.2: Mapeamento Objeto-Relacional (JPA)
Criar as entidades @Entity (Usuario, Espaco, Reserva) espelhando as tabelas e enums do banco
.
Criar as interfaces de Repository (ex: EspacoRepository.findByAtivo(), ReservaRepository.findByEspacoIdAndData())
.
Task 2.3: Segurança e Autenticação
Configurar o Spring Security utilizando Sessão baseada em JWT com HttpOnly Cookies
.
Implementar a proteção das rotas com anotações @PreAuthorize baseadas nos perfis (GESTOR vs PROF/ALUNO)
.
Task 2.4: Lógica de Negócios (Services)
Criar o AuthService para login/logout
.
Criar o EspacoService para o CRUD de espaços
.
Criar o ReservaService e o ConflitoService para gerenciar solicitações, aprovações, rejeições e garantir que não existam choques de horários na camada de aplicação
.
Task 2.5: Controllers e Tratamento de Erros
Implementar DTOs de Request e Response (com @Valid, @NotBlank, etc.) para não expor entidades diretamente
.
Desenvolver os Endpoints REST (/api/auth, /api/espacos, /api/reservas)
.
Implementar um GlobalExceptionHandler (@ControllerAdvice) para padronizar retornos 400 (Bad Request), 403 (Forbidden) e 409 (Conflict)
.

--------------------------------------------------------------------------------
🎨 Módulo 3: Front-end (React + Vite + TypeScript)
O desenvolvimento da UI deve refletir estritamente os protótipos discutidos na nossa conversa, utilizando dados fictícios inicialmente
.
Task 3.1: Setup e Design System
Inicializar o projeto com Vite, configurar TypeScript e instalar dependências (react-router-dom, axios, lucide-react, tailwindcss)
.
Configurar o tema do Tailwind com a paleta institucional do IFCE e tipografia
.
Task 3.2: Biblioteca de Componentes Base
Criar componentes reutilizáveis: Button, Input, Select, Card, Badge (para status), e DataTable
.
Desenvolver o componente base da grade de calendário (Timeline/Calendar Grid).
Task 3.3: Layout Base e Rotas
Desenvolver a Sidebar com roteamento específico por perfil, a Topbar (com busca, notificações e perfil) e a área de conteúdo central responsiva
.
Criar o painel overlay de Notificações que se abre ao clicar no sino da Topbar.
Implementar o componente ProtectedRoute para validação de acesso.
Task 3.4: Telas de "Espaços"
Catálogo (Usuários): Implementar lista em cards com filtros, badges de status, botão "Detalhes" e painéis informativos de "Política de Uso"
.
Gestão (Gestor): Implementar DataTable completa de espaços com ações de edição/status e exportação.
Task 3.5: Telas de "Já Reservados" e "Solicitação"
Já Reservados (Comum): Implementar calendário semanal com widget lateral de "Agendamento Rápido" e modal de reserva.
Já Reservados (Gestor): Implementar calendário semanal em visão macro com filtros avançados por blocos e espaços.
Solicitação (Gestor): Implementar formulário dividido em 4 etapas visuais para alocação direta.
Task 3.6: Gerenciamento de Estado e API (Integração Final)
Implementar AuthContext para gerenciar a sessão localmente e redirecionamentos
.
Configurar instância do Axios com interceptadores para envio e tratamento de Cookies.
Implementar o TanStack Query para realizar o fetching, caching e sincronização em tempo real das requisições REST criadas no back-end
.