---
trigger: always_on
---

# 🎓 IFCE Play — Gestão de Espaços Acadêmicos

## Documento de Design (Brainstorming)

> Gerado em: 12/05/2026
> Status: ✅ Design validado — pronto para implementação

---

## 1. Resumo do Entendimento

- **O que:** Sistema web de gestão de espaços acadêmicos para o IFCE
- **Por quê:** Organizar e controlar reservas de salas, laboratórios e auditórios, evitando conflitos de horário
- **Para quem:** Gestores (administram tudo), Professores (solicitam reservas) e Alunos (solicitam reservas com aprovação)
- **Plataforma:** Web responsivo — desktop-first, acessível pelo celular
- **Escala:** Uso real em um campus, centenas de usuários
- **Stack:** Java/Spring Boot + PostgreSQL (backend) | React + Vite (frontend)

### Funcionalidades da V1

| # | Funcionalidade | Descrição |
|---|----------------|-----------|
| 1 | Autenticação | Spring Security com sessão, 3 perfis (GESTOR, PROFESSOR, ALUNO) |
| 2 | Gestão de Espaços | CRUD de salas, laboratórios, auditórios |
| 3 | Reservas com Aprovação | Professor/aluno solicita → gestor aprova/rejeita |
| 4 | Detecção de Conflitos | Impede automaticamente sobreposição de horários |

### Fora do Escopo (V1)

- Multi-campus
- Notificações por e-mail
- Relatórios avançados
- Manutenções
- Gestão de recursos/equipamentos

---

## 2. Arquitetura Geral

```
┌──────────────────┐       REST API        ┌──────────────────────┐
│   React + Vite   │  ◄──────────────────►  │  Spring Boot (Java)  │
│   (SPA Frontend) │       JSON/HTTP        │  Monolito + JPA      │
│   Port: 5173     │     Cookie Session     │  Spring Security     │
└──────────────────┘                        │  PostgreSQL          │
                                            │  Port: 8080          │
                                            └──────────────────────┘
```

**Decisão:** Monolito Spring Boot + SPA React separado (Abordagem A).
Dois projetos independentes, comunicação via API REST com sessão via cookies.

---

## 3. Modelo de Dados (PostgreSQL)

### Entidade: `usuario`

| Campo | Tipo | Restrições |
|-------|------|------------|
| id | BIGSERIAL | PK |
| nome | VARCHAR(255) | NOT NULL |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| senha | VARCHAR(255) | NOT NULL (BCrypt hash) |
| perfil | ENUM | GESTOR, PROFESSOR, ALUNO |
| matricula | VARCHAR(50) | UNIQUE |
| created_at | TIMESTAMP | DEFAULT NOW() |

### Entidade: `espaco`

| Campo | Tipo | Restrições |
|-------|------|------------|
| id | BIGSERIAL | PK |
| nome | VARCHAR(255) | NOT NULL |
| tipo | ENUM | LABORATORIO, SALA_AULA, AUDITORIO, SALA_REUNIAO |
| bloco | VARCHAR(100) | NOT NULL |
| capacidade | INTEGER | |
| descricao | TEXT | |
| ativo | BOOLEAN | DEFAULT TRUE |
| created_at | TIMESTAMP | DEFAULT NOW() |

### Entidade: `reserva`

| Campo | Tipo | Restrições |
|-------|------|------------|
| id | BIGSERIAL | PK |
| usuario_id | BIGINT | FK → usuario(id), NOT NULL |
| espaco_id | BIGINT | FK → espaco(id), NOT NULL |
| data | DATE | NOT NULL |
| hora_inicio | TIME | NOT NULL |
| hora_fim | TIME | NOT NULL |
| finalidade | VARCHAR(500) | NOT NULL |
| status | ENUM | PENDENTE, APROVADA, REJEITADA, CANCELADA |
| aprovado_por | BIGINT | FK → usuario(id), NULLABLE |
| created_at | TIMESTAMP | DEFAULT NOW() |

### Relacionamentos

- `Usuario 1 → N Reserva` (solicitante)
- `Espaco 1 → N Reserva`
- `Usuario 1 → N Reserva.aprovado_por` (gestor aprovador)

---

## 4. Backend — Spring Boot

### Estrutura de Pacotes

```
com.ifce.academica/
├── config/
│   ├── SecurityConfig.java        # Spring Security + sessão
│   └── CorsConfig.java            # CORS para React
├── model/
│   ├── Usuario.java
│   ├── Espaco.java
│   └── Reserva.java
├── repository/
│   ├── UsuarioRepository.java
│   ├── EspacoRepository.java
│   └── ReservaRepository.java
├── service/
│   ├── AuthService.java
│   ├── EspacoService.java
│   ├── ReservaService.java
│   └── ConflitoService.java       # Detecta sobreposições
├── controller/
│   ├── AuthController.java
│   ├── EspacoController.java
│   └── ReservaController.java
├── dto/
│   ├── LoginRequest.java
│   ├── ReservaRequest.java
│   └── ReservaResponse.java
└── enums/
    ├── Perfil.java
    ├── TipoEspaco.java
    └── StatusReserva.java
```

### Endpoints da API REST

#### Autenticação

| Método | Rota | Permissão | Descrição |
|--------|------|-----------|-----------|
| POST | `/api/auth/login` | Público | Login |
| POST | `/api/auth/logout` | Autenticado | Logout |
| GET | `/api/auth/me` | Autenticado | Dados do usuário logado |

#### Espaços

| Método | Rota | Permissão | Descrição |
|--------|------|-----------|-----------|
| GET | `/api/espacos` | Autenticado | Listar espaços |
| GET | `/api/espacos/{id}` | Autenticado | Detalhe do espaço |
| POST | `/api/espacos` | GESTOR | Criar espaço |
| PUT | `/api/espacos/{id}` | GESTOR | Editar espaço |
| DELETE | `/api/espacos/{id}` | GESTOR | Desativar espaço |

#### Reservas

| Método | Rota | Permissão | Descrição |
|--------|------|-----------|-----------|
| GET | `/api/reservas` | Autenticado | Listar reservas (filtros por data, espaço, status) |
| GET | `/api/reservas/minhas` | Autenticado | Reservas do usuário logado |
| POST | `/api/reservas` | PROF/ALUNO | Solicitar reserva |
| PUT | `/api/reservas/{id}/aprovar` | GESTOR | Aprovar reserva |
| PUT | `/api/reservas/{id}/rejeitar` | GESTOR | Rejeitar reserva |
| DELETE | `/api/reservas/{id}` | Dono/GESTOR | Cancelar reserva |

### Lógica de Detecção de Conflitos

```java
// ConflitoService.java
public void validarConflito(Long espacoId, LocalDate data, 
                             LocalTime horaInicio, LocalTime horaFim) {
    boolean conflito = reservaRepository
        .existsByEspacoIdAndDataAndHorarioSobreposto(
            espacoId, data, horaInicio, horaFim,
            List.of(StatusReserva.PENDENTE, StatusReserva.APROVADA)
        );
    if (conflito) {
        throw new ConflitoDeHorarioException(
            "Já existe uma reserva para este espaço neste horário."
        );
    }
}
```

```sql
-- Query JPA equivalente
SELECT COUNT(*) > 0 FROM reserva 
WHERE espaco_id = :espacoId 
  AND data = :data
  AND status IN ('PENDENTE', 'APROVADA')
  AND hora_inicio < :horaFim 
  AND hora_fim > :horaInicio;
```

---

## 5. Frontend — React + Vite

### Estrutura de Pastas

```
src/
├── assets/                # Imagens, ícones, fontes
├── components/
│   ├── ui/                # Button, Input, Card, Modal, Badge, Select
│   ├── layout/            # Sidebar, Topbar, Layout
│   └── shared/            # StatusBadge, CalendarGrid, DataTable
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Espacos.jsx        # Listagem + CRUD
│   ├── Reservas.jsx       # Calendário + solicitação
│   └── Solicitacoes.jsx   # Gestor: aprovar/rejeitar pendências
├── services/
│   ├── api.js             # Axios (baseURL, withCredentials, interceptors)
│   ├── authService.js
│   ├── espacoService.js
│   └── reservaService.js
├── hooks/
│   ├── useAuth.js
│   ├── useMobile.js
│   └── useReservas.js
├── context/
│   └── AuthContext.jsx    # Contexto global de autenticação
├── routes/
│   └── AppRouter.jsx      # Rotas protegidas por perfil
├── utils/
│   └── dateUtils.js
├── App.jsx
├── main.jsx
└── index.css
```

### Fluxo de Telas por Perfil

```
                    ┌──── Login ────┐
                    │               │
          ┌─────────┴───┐    ┌──────┴────────┐
          │   GESTOR    │    │  PROF/ALUNO   │
          ├─────────────┤    ├───────────────┤
          │ Dashboard   │    │ Dashboard     │
          │ Espaços     │    │ Reservas      │
          │  (CRUD)     │    │  (solicitar)  │
          │ Reservas    │    │ Minhas        │
          │ Solicitações│    │  Reservas     │
          │ (aprovar)   │    │               │
          └─────────────┘    └───────────────┘
```

### Proteção de Rotas

```jsx
<Route element={<ProtectedRoute perfis={['GESTOR']}>}>
  <Route path="/solicitacoes" element={<Solicitacoes />} />
  <Route path="/espacos/novo" element={<NovoEspaco />} />
</Route>

<Route element={<ProtectedRoute perfis={['GESTOR','PROFESSOR','ALUNO']}>}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/reservas" element={<Reservas />} />
</Route>
```

### Comunicação Backend

- **Axios** com `withCredentials: true` (cookies de sessão)
- Interceptor global: `401` → redireciona para `/login`
- Base URL configurável via `.env` (`VITE_API_URL=http://localhost:8080/api`)

---

## 6. Casos de Borda

| Cenário | Tratamento |
|---------|-----------|
| Duas reservas no mesmo horário/espaço | `ConflitoService` valida antes de salvar → 409 Conflict |
| Reserva cruzando meia-noite | V1: não permitir — horários restritos ao mesmo dia |
| Aprovar reserva já cancelada | Backend valida status atual → 400 Bad Request |
| Acesso sem permissão | `ProtectedRoute` redireciona para Dashboard ou Login |
| Sessão expirada | Interceptor Axios detecta 401 → redireciona para Login |
| Desativar espaço com reservas futuras | Cancela automaticamente reservas PENDENTE |

---

## 7. Estratégia de Testes

### Backend (Java)

| Tipo | Ferramenta | Foco |
|------|-----------|------|
| Unitário | JUnit 5 + Mockito | Services (ConflitoService, ReservaService) |
| Integração | @SpringBootTest + TestContainers | Repositories + PostgreSQL |
| API | MockMvc | Controllers + validações de permissão |

### Frontend (React)

| Tipo | Método | Foco |
|------|--------|------|
| Componentes | Manual | Validação visual durante desenvolvimento |
| Fluxo E2E | Navegador | Login → reserva → aprovação |

---

## 8. Log de Decisões

| # | Decisão | Alternativas Consideradas | Justificativa |
|---|---------|--------------------------|---------------|
| 1 | Web responsivo (desktop-first) | App nativo, PWA | Acessível em qualquer dispositivo sem instalação; alinhado com uso em campus |
| 2 | 3 perfis (Gestor, Professor, Aluno) | Apenas gestor; gestor + professor | Alunos também precisam solicitar reservas |
| 3 | Reserva com aprovação | Reserva direta; misto | Controle centralizado pelo gestor garante organização |
| 4 | Monolito Spring Boot + SPA React | Thymeleaf embarcado; microservices | Separação clara, equipe em paralelo, stack madura |
| 5 | PostgreSQL | MySQL, H2 | Robusto, gratuito, melhor suporte a tipos avançados |
| 6 | Spring Security com sessão | JWT, OAuth2 | Escolha do usuário — mais tradicional |
| 7 | Frontend reescrito do zero | Evoluir protótipo existente | Protótipo serve como referência visual, mas código novo |
| 8 | Detecção de conflitos no backend | Validação no frontend | Segurança: frontend pode ser burlado, regra deve estar no backend |

---

## 9. Suposições Documentadas

1. O sistema atenderá **um único campus** na V1
2. Não haverá notificações por e-mail na V1
3. Não haverá relatórios avançados na V1
4. Horários de reserva são restritos a um **mesmo dia** (sem cruzar meia-noite)
5. O protótipo existente será usado como **referência visual**, não como base de código
6. O cadastro de usuários será feito pelo **gestor** (não há auto-cadastro na V1)
7. O banco PostgreSQL rodará localmente durante o desenvolvimento
