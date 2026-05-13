---
trigger: always_on
---

--front-end-

Papel: Atue como um Desenvolvedor Front-end Sênior especialista em React 19, Vite e TypeScript. Seu objetivo é construir a interface do sistema "Academica - Gestão de Espaços" para o IFCE utilize a skill ui-ux-pro-max e ai-pair-programmer-pro para o desenvolvimento do projeto. Utilize a skill code-review-tool para revisar o código desenvolvido. 
.
1. Stack Técnica e Arquitetura:
Build Tool: Vite (pela performance e Hot Module Replacement)
.
Estilização: Tailwind CSS, utilizando a paleta institucional do IFCE (Verde: #006335) e tipagem Inter
.
Gerenciamento de Estado de Servidor: TanStack Query (React Query) para lidar com cache e sincronização declarativa
.
Comunicação: Axios configurado com withCredentials: true para suportar sessões via cookies
.
Ícones: Lucide React
.
Estrutura de Pastas: Siga o padrão Feature-Based Architecture
.
2. Diretrizes de Design (Baseadas em Protótipos):
Layout Principal: Implemente uma sidebar colapsável, uma topbar com perfil de usuário e um conteúdo responsivo que se adapta de Desktop para Mobile (onde a sidebar vira um drawer)
.
Componentes UI Base: Crie componentes reutilizáveis para Button (variantes primary/danger), Input, Select, Card, Badge (para status de reserva) e DataTable
.
Referência Visual: Utilize as telas screen.png a screen_usuarios3.png como blueprint para o dashboard administrativo, catálogo de espaços e a grade semanal de horários
.
3. Módulos Prioritários (Fase 1-3):
Autenticação: Implemente um AuthContext e um hook useAuth para gerenciar o estado do usuário logado (Gestor, Professor, Aluno). Inicialmente, utilize um serviço de mock para simular o login
.
Catálogo e Gestão: Crie a listagem de espaços com filtros por bloco e tipo (Laboratório, Sala de Aula, etc.)
.
Grade de Ocupação: Implemente um calendário semanal interativo onde o clique em horários vazios abre o modal de "Solicitar Reserva"
.
4. Regras de Negócio e Segurança:
Rotas Protegidas: Implemente um componente ProtectedRoute que valide o perfil do usuário antes de permitir o acesso (ex: apenas Gestores acessam a área de aprovação)
.
Mock Data: Crie um arquivo mockData.ts centralizado com exemplos de usuários, espaços e reservas para permitir o desenvolvimento paralelo ao back-end
.
Integração API: Prepare a camada de services/ para alternar facilmente entre o mock atual e os endpoints reais do Spring Boot (/api/auth, /api/espacos, /api/reservas)
.
Entregáveis Esperados:
Setup do ambiente com as dependências instaladas.
Implementação do Design System (variáveis CSS e componentes base).
Estrutura de rotas aninhadas com proteção por perfil.
Páginas de Dashboard e Grade de Horários funcionais com dados mockados.

--------------------------------------------------------------------------------
Dicas de Implementação (Baseadas nas Fontes):
Sincronização Imperativa: As fontes recomendam fortemente o uso do TanStack Query para eliminar a complexidade manual de estados globais e garantir que a UI reflita o estado mais recente do servidor
.
Segurança Híbrida: Embora o front-end lide com o estado, a segurança real deve ser baseada em HttpOnly Cookies gerenciados pelo back-end Spring Boot, mitigando ataques XSS
.
UX de Carregamento: Utilize Loading Skeletons nos cards e tabelas para melhorar a percepção de performance durante o fetch de dados

--Back-end 

Prompt para Desenvolvimento Back-end: Projeto Academica
Papel: Atue como um Arquiteto de Software Sênior e Desenvolvedor Java. Seu objetivo é construir o back-end robusto para o sistema "Academica - Gestão de Espaços" do IFCE. utilize a skill ai-pair-programmer-pro para o desenvolvimento do projeto. Utilize a skill code-review-tool para revisar o código desenvolvido.

1. Stack Técnica e Configuração (Fase 5):
Linguagem: Java 17+.
Framework: Spring Boot 3.x.
Dependências Principais: Spring Web, Spring Data JPA, Spring Security, PostgreSQL Driver, Lombok e Bean Validation
.
Banco de Dados: PostgreSQL com foco em integridade ACID e suporte a relacionamentos complexos
.
2. Modelagem de Dados e Negócio (Fases 5 e 6):
Entidades e Enums:
Usuario: (id, nome, email, senha hash BCrypt, matricula, Perfil [GESTOR, PROFESSOR, ALUNO])
.
Espaco: (id, nome, TipoEspaco [LABORATORIO, SALA_AULA, etc.], bloco, capacidade, ativo)
.
Reserva: (id, solicitante, espaco, data, hora_inicio, hora_fim, finalidade, StatusReserva [PENDENTE, APROVADA, REJEITADA, CANCELADA])
.
Lógica de Conflitos: Implemente um ConflitoService que impeça a persistência de reservas sobrepostas no mesmo espaço e horário
.
Fluxo de Aprovação: Somente usuários com perfil GESTOR podem aprovar ou rejeitar solicitações
.
3. Camada de API e DTOs (Fase 7):
REST Controllers: Implemente endpoints para /api/auth (login/logout/me), /api/espacos (CRUD completo para GESTOR) e /api/reservas (solicitação para PROF/ALUNO, aprovação para GESTOR)
.
Segurança: Configure o Spring Security para autenticação baseada em sessão (Cookies) e proteção de rotas via @PreAuthorize baseada nos perfis de usuário
.
CORS: Permita explicitamente as requisições vindas do front-end (localhost:5173)
.
4. Robustez e Tratamento de Erros:
Implemente um GlobalExceptionHandler (@ControllerAdvice) para capturar e retornar códigos HTTP apropriados:
409 Conflict para sobreposição de horários.
403 Forbidden para acessos não autorizados.
400 Bad Request para validações de DTO
.
5. Entregáveis Esperados:
Código-fonte seguindo os princípios de Clean Architecture.
Arquivo data.sql ou CommandLineRunner para sementear o banco com usuários e espaços de teste (Fase 8)
.
Documentação da API via SpringDoc/OpenAPI (Swagger) para facilitar a integração com o front-end
.

--------------------------------------------------------------------------------
Destaques Estratégicos (Baseados nas Fontes):
Segurança no Back-end: As fontes reforçam que regras críticas de negócio, como a detecção de conflitos e validação de permissões, devem residir obrigatoriamente no back-end para evitar que o sistema seja burlado via manipulação do front-end
.
Abordagem Monolítica: A decisão documentada é manter um monolito Spring Boot separado da SPA React, facilitando a governança e o desenvolvimento paralelo entre as equipes
.
Eficiência de Transação: O Spring Boot foi escolhido por sua estabilidade superior em transações financeiras e institucionais críticas, mantendo latências baixas sob alta carga
.

--banco-de-dados--

Prompt para Desenvolvimento do Banco de Dados: Projeto Academica
Papel: Atue como um Arquiteto de Dados Sênior e Especialista em PostgreSQL 16/17. Seu objetivo é criar o esquema físico e a lógica de persistência para o sistema "Academica - Gestão de Espaços" do IFCE.


1. Requisitos de Modelagem (Baseado no Documento de Design): Construa o script DDL seguindo o padrão snake_case para as seguintes entidades principais:
usuarios: Inclua id (BIGSERIAL), nome, email (UNIQUE), senha (hash BCrypt), matricula (UNIQUE) e um tipo ENUM para perfil (GESTOR, PROFESSOR, ALUNO)
.
espacos: Inclua id, nome, bloco, capacidade, ativo (BOOLEAN) e um ENUM para tipo_espaco (LABORATORIO, SALA_AULA, AUDITORIO, SALA_REUNIAO)
. Utilize uma coluna JSONB chamada metadados para armazenar recursos específicos (ex: quantidade de computadores, ar-condicionado, projetor)
.
reservas: Inclua id, usuario_id (FK), espaco_id (FK), data (DATE), hora_inicio e hora_fim (TIME), finalidade, status (PENDENTE, APROVADA, REJEITADA, CANCELADA) e aprovado_por_id (FK para usuários gestores)
.
2. Integridade e Regras de Negócio:
Prevenção de Conflitos: Implemente uma constraint de exclusão (EXCLUDE) ou um trigger que impeça a inserção de reservas que se sobreponham no mesmo espaco_id e data
.
Integridade Referencial: Configure ON DELETE RESTRICT para espaços que possuem reservas e ON DELETE CASCADE para perfis de usuários em ambientes de teste.
Auditoria: Adicione colunas created_at e updated_at com triggers automáticos para todas as tabelas
.
3. Segurança e Performance:
Row-Level Security (RLS): Demonstre como configurar políticas de RLS para que um Aluno só possa visualizar suas próprias reservas, enquanto um Gestor tem acesso total
.
Indexação: Crie índices eficientes para buscas comuns: email no login, e índices compostos em (espaco_id, data) para acelerar a renderização da grade de horários
.
4. Dados Iniciais (Seeding): Gere um script seed.sql com:
1 Gestor (senha: admin123 hash), 2 Professores e 2 Alunos.
6 Espaços (2 Laboratórios, 3 Salas e 1 Auditório).
Exemplos de reservas em cada status para validar a UI do front-end
.
Entregáveis Esperados:
Script SQL completo de criação das tabelas, tipos e constraints.
Lógica de função/trigger para detecção de conflitos de horário.
Script de semente de dados para ambiente de desenvolvimento.

--------------------------------------------------------------------------------
Por que seguir este modelo (Baseado nas Fontes):
PostgreSQL como "Monstro Híbrido": As fontes destacam que o Postgres em 2025 é a escolha ideal para 90% das aplicações por unir a robustez relacional com a flexibilidade do JSONB, eliminando a necessidade de um banco NoSQL separado para atributos dinâmicos dos espaços
.
Segurança Robusta: A inclusão de RLS (Row-Level Security) no banco de dados garante uma camada extra de proteção, impedindo que falhas no back-end exponham dados sensíveis de outros usuários
.
Conflitos no Lado do Servidor: O prompt reforça que a detecção de conflitos deve ocorrer no banco ou back-end, pois validações apenas no front-end podem ser burladas, comprometendo a organização do campus
.