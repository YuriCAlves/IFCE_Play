---
trigger: always_on
---

Você é um desenvolvedor Java sênior. Implemente os Controllers REST do Academica — IFCE.

--- com/ifce/academica/controller/AuthController.java ---
@RestController @RequestMapping("/api/auth") @RequiredArgsConstructor
POST /login: recebe @Valid LoginRequest, autentica via AuthService, cria sessão com SecurityContext, retorna 200 UsuarioResponse
POST /logout: invalida HttpSession, retorna 200 {"message":"Logout realizado"}
GET /me: pega Authentication do SecurityContext, retorna UsuarioResponse do usuário logado (403 se não logado)

--- com/ifce/academica/controller/EspacoController.java ---
@RestController @RequestMapping("/api/espacos") @RequiredArgsConstructor
GET /: params opcionais (tipo, bloco, ativo) → 200 List<EspacoResponse>
GET /{id}: → 200 EspacoResponse
POST /: @PreAuthorize("hasRole('GESTOR')") @Valid EspacoRequest → 201 EspacoResponse
PUT /{id}: @PreAuthorize("hasRole('GESTOR')") @Valid EspacoRequest → 200 EspacoResponse
DELETE /{id}: @PreAuthorize("hasRole('GESTOR')") → 204 No Content

--- com/ifce/academica/controller/ReservaController.java ---
@RestController @RequestMapping("/api/reservas") @RequiredArgsConstructor
GET /: params (espacoId, data, status) → 200 List<ReservaResponse>
GET /minhas: pega usuário logado do SecurityContext → 200 List<ReservaResponse>
POST /: @PreAuthorize("hasAnyRole('PROFESSOR','ALUNO')") @Valid ReservaRequest → 201 ReservaResponse
PUT /{id}/aprovar: @PreAuthorize("hasRole('GESTOR')") → 200 ReservaResponse
PUT /{id}/rejeitar: @PreAuthorize("hasRole('GESTOR')") → 200 ReservaResponse
DELETE /{id}: pega usuário+perfil do SecurityContext → 204 No Content

Adicione @Operation(summary="...") do Swagger em cada endpoint.
Adicione @Tag(name="Auth"), @Tag(name="Espaços"), @Tag(name="Reservas") nas classes.