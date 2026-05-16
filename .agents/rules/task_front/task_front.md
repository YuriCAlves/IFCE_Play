Tasks--Front-end 

Você é um desenvolvedor frontend sênior. Crie o projeto "Academica - Gestão de Espaços" do IFCE com a stack abaixo.

EXECUTE EM ORDEM:

1. Crie o projeto:
npm create vite@latest academica-frontend -- --template react
cd academica-frontend

2. Instale as dependências:
npm install react-router-dom axios @tanstack/react-query lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

3. Configure tailwind.config.js:
content: ["./index.html","./src/**/*.{js,jsx}"]
Adicione a cor IFCE em extend.colors: { primary: { DEFAULT:'#006335', dark:'#004d28', light:'#e8f5ef' } }

4. Configure index.css com variáveis CSS:
--color-primary: #006335
--font-sans: 'Inter', sans-serif
Importe Inter via @import no topo ou adicione no index.html.

5. Crie o arquivo .env:
VITE_API_URL=http://localhost:8080/api

6. Crie a estrutura de pastas dentro de src/:
components/ui/
components/layout/
components/shared/
pages/
services/
hooks/
context/
routes/
utils/

ENTREGUE: package.json final, tailwind.config.js, index.css com variáveis, .env.example e print da estrutura de pastas.

Você é um desenvolvedor frontend sênior. Crie os componentes UI base do Academica — IFCE. Use Tailwind CSS e a cor primária #006335.

Crie cada arquivo abaixo em src/components/ui/:

--- Button.jsx ---
Props: variant (primary|secondary|danger|ghost), size (sm|md|lg), loading, disabled, onClick, children
- primary: bg-[#006335] text-white hover:bg-[#004d28]
- secondary: border border-[#006335] text-[#006335] hover:bg-[#e8f5ef]
- danger: bg-red-600 text-white hover:bg-red-700
- ghost: text-gray-600 hover:bg-gray-100
- loading: mostra spinner (Lucide Loader2 animando) e desabilita o botão

--- Input.jsx ---
Props: label, placeholder, value, onChange, error (string), type, disabled, icon (componente Lucide opcional)
- label acima, bordas rounded, foco com ring verde
- Se error: borda vermelha + mensagem vermelha abaixo

--- Select.jsx ---
Props: label, options ([{value, label}]), value, onChange, error, placeholder, disabled
- Estilo igual ao Input, seta customizada

--- Card.jsx ---
Props: children, className, onClick (se passado, adiciona cursor-pointer e hover:shadow-md)
- bg-white border border-gray-200 rounded-xl p-5

--- Badge.jsx ---
Props: status (PENDENTE|APROVADA|REJEITADA|CANCELADA) ou variant (success|warning|danger|neutral)
- PENDENTE → bg-amber-100 text-amber-800
- APROVADA → bg-green-100 text-green-800
- REJEITADA → bg-red-100 text-red-800
- CANCELADA → bg-gray-100 text-gray-600

--- Modal.jsx ---
Props: isOpen, onClose, title, children, footer
- Overlay escuro com fade, painel centralizado
- Fechar com ESC (useEffect + addEventListener) e clique fora
- Header com título + botão X (Lucide X)

--- DataTable.jsx ---
Props: columns ([{key, label, render}]), data, loading, emptyMessage
- loading: 5 linhas skeleton (animate-pulse bg-gray-200)
- sem dados: mensagem centralizada com ícone Inbox do Lucide

Você é um desenvolvedor frontend sênior. Crie o layout principal do Academica — IFCE.

--- src/components/layout/Sidebar.jsx ---
- Fundo: bg-[#006335], texto branco
- Estado: expandido (240px) e colapsado (64px), transição suave
- Item ativo: bg-[#004d28] rounded-lg
- Itens de menu com ícone Lucide + label:
  * LayoutDashboard → /dashboard (todos os perfis)
  * CalendarDays → /reservas (todos)
  * BookOpen → /minhas-reservas (PROF/ALUNO)
  * Building2 → /espacos (todos)
  * ClipboardList → /solicitacoes (somente GESTOR)
  * LogOut → logout
- No mobile (< 768px): drawer que abre por cima com overlay escuro

--- src/components/layout/Topbar.jsx ---
- À esquerda: ícone hamburguer (Menu) para toggle da sidebar
- Ao centro/direita: nome "Academica" em fonte média
- À direita: avatar com iniciais do usuário (círculo verde), nome e badge do perfil (GESTOR|PROF|ALUNO)

--- src/components/layout/Layout.jsx ---
- Combina Sidebar + Topbar + <main>
- main: padding p-6, bg-gray-50 min-h-screen
- Estado: isCollapsed (boolean), isMobileOpen (boolean)
- Responsive: sidebar normal no desktop, drawer no mobile

Use useContext(AuthContext) para pegar usuario e perfil.

Você é um desenvolvedor frontend sênior. Configure o sistema de rotas do Academica — IFCE com react-router-dom v6.

--- src/routes/ProtectedRoute.jsx ---
Props: perfis (array, opcional — ex: ['GESTOR'])
- Usa useAuth() para checar isAuthenticated
- Se não autenticado: <Navigate to="/login" replace />
- Se perfil não permitido: <Navigate to="/dashboard" replace />
- Se ok: renderiza <Outlet />

--- src/routes/AppRouter.jsx ---
Use createBrowserRouter e RouterProvider.

Estrutura:
/ → redireciona para /dashboard se logado, senão /login
/login → <Login /> (sem layout)
/dashboard → protegido (todos) → <Dashboard />
/espacos → protegido (todos) → <Espacos />
/reservas → protegido (todos) → <Reservas />
/minhas-reservas → protegido (PROFESSOR, ALUNO) → <MinhasReservas />
/solicitacoes → protegido (GESTOR) → <Solicitacoes />

Rotas protegidas devem renderizar dentro de <Layout />.

--- src/main.jsx ---
Envolva RouterProvider com:
<QueryClientProvider client={queryClient}>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
</QueryClientProvider>

Crie placeholders simples para cada página (só um <h1> com o nome da página) para o sistema de rotas funcionar já.

Você é um desenvolvedor frontend sênior. Implemente autenticação mock para o Academica — IFCE.

--- src/utils/mockData.js ---
Exporte arrays:
- usuarios: [
    { id:1, nome:'Admin IFCE', email:'admin@ifce.edu.br', senha:'admin123', perfil:'GESTOR', matricula:'G001' },
    { id:2, nome:'Prof. João Silva', email:'joao@ifce.edu.br', senha:'prof123', perfil:'PROFESSOR', matricula:'P001' },
    { id:3, nome:'Prof. Maria Lima', email:'maria@ifce.edu.br', senha:'prof123', perfil:'PROFESSOR', matricula:'P002' },
    { id:4, nome:'Pedro Aluno', email:'pedro@ifce.edu.br', senha:'aluno123', perfil:'ALUNO', matricula:'A001' },
    { id:5, nome:'Ana Aluna', email:'ana@ifce.edu.br', senha:'aluno123', perfil:'ALUNO', matricula:'A002' },
  ]
- espacos: 6 espaços (Lab Info 1, Lab Química, Sala A101, Sala B202, Sala C303, Auditório Principal) com campos: id, nome, tipo, bloco, capacidade, descricao, ativo
- reservas: 6 reservas com status variados (PENDENTE×2, APROVADA×2, REJEITADA×1, CANCELADA×1)

--- src/context/AuthContext.jsx ---
Provê: usuario, perfil, isAuthenticated, loading, login(email,senha), logout()
- Persiste usuario no localStorage
- loading=true enquanto verifica localStorage no mount

--- src/hooks/useAuth.js ---
Consome AuthContext. Retorna tudo do contexto + helpers:
isGestor(), isProfessor(), isAluno()

--- src/services/authService.js ---
login(email, senha): busca em mockData.usuarios, retorna usuario sem campo senha ou lança Error('Credenciais inválidas')

--- src/pages/Login.jsx ---
- Formulário: campo email + campo senha (tipo password) + botão "Entrar"
- Validação básica: campos não podem estar vazios
- Chama useAuth().login, redireciona para /dashboard se ok
- Exibe mensagem de erro se credencial inválida
- Visual: card centralizado na tela, logo "Academica" em verde #006335

Você é um desenvolvedor frontend sênior. Crie o Dashboard do Academica — IFCE.

--- src/pages/Dashboard.jsx ---

Importe dados de mockData. Simule loading de 800ms com useState+useEffect.

LAYOUT (grid responsivo: 2 colunas desktop, 1 coluna mobile):

1. Cards de métricas (faixa superior, 4 cards):
   - Total de Espaços → ícone Building2
   - Espaços Ativos → ícone CheckCircle (verde)
   - Reservas Pendentes → ícone Clock (âmbar) — número destacado
   - Reservas Hoje → ícone CalendarDays

2. Card "Próximas Reservas" (coluna esquerda):
   - Lista as 3 reservas APROVADAS mais próximas
   - Cada item: nome do espaço, horário, solicitante, Badge de status

3. Card "Reservas por status" (coluna direita):
   - Barra horizontal para cada status
   - Percentual calculado sobre total de reservas
   - Cores: PENDENTE=âmbar, APROVADA=verde, REJEITADA=vermelho, CANCELADA=cinza

4. Para perfil GESTOR: banner/card de atalho para /solicitacoes se houver pendentes

LOADING STATE:
Crie SkeletonCard (div animate-pulse bg-gray-200 rounded-xl) e exiba enquanto loading=true

Você é um desenvolvedor frontend sênior. Crie as 4 páginas restantes do Academica — IFCE usando mockData.

--- src/pages/Espacos.jsx ---
- Tabela com: Nome, Tipo (Badge colorido), Bloco, Capacidade, Status (ativo/inativo), Ações (GESTOR)
- Filtros: input de busca por nome + select de tipo
- Botão "Novo Espaço" (só GESTOR) → abre Modal com formulário (nome, tipo, bloco, capacidade, descrição)
- Ações por linha (GESTOR): botão editar (abre modal preenchido) + toggle ativar/desativar
- Toast de feedback ao salvar/desativar

--- src/pages/Reservas.jsx ---
- Select para escolher o espaço
- Navegação de semana: botões < semana | semana atual | semana > com data exibida
- Grade: linhas = horários (07h–22h de 1h em 1h), colunas = Seg a Sex
- Célula ocupada (APROVADA): fundo verde + nome do solicitante truncado
- Célula ocupada (PENDENTE): fundo âmbar + nome truncado
- Célula vazia: hover com fundo verde claro, cursor pointer → abre modal de solicitação
- Modal de solicitação: campos data, hora início, hora fim, finalidade. Ao salvar: adiciona no estado local com status PENDENTE + toast

--- src/pages/MinhasReservas.jsx ---
- Lista reservas do usuário logado (filtra mockData por usuario_id)
- Filtro por status com chips clicáveis (Todos | Pendente | Aprovada | ...)
- Card por reserva: espaço, data+hora, finalidade, Badge de status
- Botão "Cancelar" (só em PENDENTE) com modal de confirmação

--- src/pages/Solicitacoes.jsx (GESTOR) ---
- Tabela: Solicitante, Espaço, Data, Horário, Finalidade, Ações
- Botão Aprovar (verde, ícone Check) e Rejeitar (vermelho, ícone X) por linha
- Ao aprovar/rejeitar: muda status no estado local + remove da lista + toast

Você é um desenvolvedor frontend sênior. Crie a camada de serviços do Academica — IFCE.

--- src/services/api.js ---
import axios from 'axios'
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})
Interceptor de response: se status 401 → window.location.href = '/login'
Interceptor de response: se status 409 → dispara evento customizado 'conflito-horario'
export default api

--- src/services/authService.js ---
const USE_MOCK = true
export const login(email, senha): USE_MOCK ? mock : api.post('/auth/login', {email, senha})
export const logout(): USE_MOCK ? limpa state : api.post('/auth/logout')
export const me(): USE_MOCK ? localStorage : api.get('/auth/me')

--- src/services/espacoService.js ---
export const listar(filtros): USE_MOCK ? filtra mockData : api.get('/espacos', {params: filtros})
export const criar(data): USE_MOCK ? push mockData : api.post('/espacos', data)
export const editar(id, data): USE_MOCK ? atualiza mockData : api.put('/espacos/'+id, data)
export const desativar(id): USE_MOCK ? toggle ativo : api.delete('/espacos/'+id)

--- src/services/reservaService.js ---
export const listar(filtros): GET /reservas
export const minhas(): GET /reservas/minhas
export const solicitar(data): POST /reservas
export const aprovar(id): PUT /reservas/{id}/aprovar
export const rejeitar(id): PUT /reservas/{id}/rejeitar
export const cancelar(id): DELETE /reservas/{id}

--- src/context/ToastContext.jsx ---
Provê: toast.success(msg), toast.error(msg), toast.warning(msg)
- Toasts aparecem no canto inferior direito
- Auto-dismiss em 3 segundos
- Máximo 3 toasts simultâneos
Hook: useToast()

--- vite.config.js ---
Adicione proxy:
server: { proxy: { '/api': { target: 'http://localhost:8080', changeOrigin: true } } }