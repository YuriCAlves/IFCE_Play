---
trigger: always_on
---

__back-end___

Você é um arquiteto de software sênior Java. Configure o projeto Spring Boot do Academica — IFCE.

1. CRIE O PROJETO via Spring Initializr (start.spring.io) com:
   - Java 17, Spring Boot 3.x
   - Group: com.ifce | Artifact: academica | Packaging: Jar
   - Dependências: Spring Web, Spring Data JPA, Spring Security, PostgreSQL Driver, Lombok, Validation

2. Adicione ao pom.xml manualmente:
   <dependency>
     <groupId>org.springdoc</groupId>
     <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
     <version>2.3.0</version>
   </dependency>

3. src/main/resources/application.properties:
spring.datasource.url=jdbc:postgresql://localhost:5432/ifce_academica
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
server.port=8080
springdoc.swagger-ui.path=/swagger-ui.html

4. Crie os Enums em com.ifce.academica.enums:

Perfil.java: GESTOR, PROFESSOR, ALUNO
TipoEspaco.java: LABORATORIO, SALA_AULA, AUDITORIO, SALA_REUNIAO
StatusReserva.java: PENDENTE, APROVADA, REJEITADA, CANCELADA

5. Estrutura de pacotes a criar:
com.ifce.academica/
  config/
  model/
  repository/
  service/
  controller/
  dto/
  enums/
  exception/

ENTREGUE: pom.xml, application.properties e os 4 arquivos de enum.

Você é um desenvolvedor Java sênior. Crie as entidades JPA do Academica — IFCE.

--- com/ifce/academica/model/Usuario.java ---
@Entity @Table(name = "usuarios")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class Usuario {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(nullable = false) private String nome;
  @Column(unique = true, nullable = false) private String email;
  @Column(nullable = false) private String senha;
  @Enumerated(EnumType.STRING) private Perfil perfil;
  @Column(unique = true) private String matricula;
  @CreationTimestamp private LocalDateTime createdAt;
}

--- com/ifce/academica/model/Espaco.java ---
@Entity @Table(name = "espacos")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class Espaco {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(nullable = false) private String nome;
  @Enumerated(EnumType.STRING) private TipoEspaco tipo;
  @Column(nullable = false) private String bloco;
  private Integer capacidade;
  private String descricao;
  @Column(nullable = false) private Boolean ativo = true;
  @CreationTimestamp private LocalDateTime createdAt;
}

--- com/ifce/academica/model/Reserva.java ---
@Entity @Table(name = "reservas")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class Reserva {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @ManyToOne @JoinColumn(name = "usuario_id", nullable = false)
  private Usuario solicitante;
  @ManyToOne @JoinColumn(name = "espaco_id", nullable = false)
  private Espaco espaco;
  @Column(nullable = false) private LocalDate data;
  @Column(name = "hora_inicio", nullable = false) private LocalTime horaInicio;
  @Column(name = "hora_fim", nullable = false) private LocalTime horaFim;
  @Column(nullable = false) private String finalidade;
  @Enumerated(EnumType.STRING)
  @Column(nullable = false) private StatusReserva status = StatusReserva.PENDENTE;
  @ManyToOne @JoinColumn(name = "aprovado_por_id")
  private Usuario aprovadoPor;
  @CreationTimestamp private LocalDateTime createdAt;
}

Você é um desenvolvedor Java sênior. Crie os repositories do Academica — IFCE.

--- com/ifce/academica/repository/UsuarioRepository.java ---
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
  Optional<Usuario> findByEmail(String email);
}

--- com/ifce/academica/repository/EspacoRepository.java ---
public interface EspacoRepository extends JpaRepository<Espaco, Long> {
  List<Espaco> findByTipoAndAtivo(TipoEspaco tipo, Boolean ativo);
  List<Espaco> findByAtivo(Boolean ativo);
  List<Espaco> findByBlocoContainingIgnoreCase(String bloco);
}

--- com/ifce/academica/repository/ReservaRepository.java ---
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
  List<Reserva> findBySolicitanteId(Long usuarioId);
  List<Reserva> findByEspacoIdAndData(Long espacoId, LocalDate data);

  @Query("""
    SELECT COUNT(r) > 0 FROM Reserva r
    WHERE r.espaco.id = :espacoId
      AND r.data = :data
      AND r.status IN :statuses
      AND r.horaInicio < :horaFim
      AND r.horaFim > :horaInicio
      AND (:excludeId IS NULL OR r.id <> :excludeId)
  """)
  boolean existeConflito(
    @Param("espacoId") Long espacoId,
    @Param("data") LocalDate data,
    @Param("horaInicio") LocalTime horaInicio,
    @Param("horaFim") LocalTime horaFim,
    @Param("statuses") List<StatusReserva> statuses,
    @Param("excludeId") Long excludeId
  );

  List<Reserva> findByEspacoIdAndStatusIn(Long espacoId, List<StatusReserva> statuses);
}

Você é um desenvolvedor Java sênior. Crie as exceptions, DTOs e o ConflitoService do Academica — IFCE.

--- EXCEPTIONS em com/ifce/academica/exception/ ---

ConflitoDeHorarioException.java:
public class ConflitoDeHorarioException extends RuntimeException {
  public ConflitoDeHorarioException() {
    super("Já existe uma reserva aprovada ou pendente para este espaço neste horário.");
  }
}

RecursoNaoEncontradoException.java:
public class RecursoNaoEncontradoException extends RuntimeException {
  public RecursoNaoEncontradoException(String recurso, Long id) {
    super(recurso + " com id " + id + " não encontrado.");
  }
}

--- DTOs em com/ifce/academica/dto/ ---

LoginRequest.java: @NotBlank String email; @NotBlank String senha

ReservaRequest.java:
@NotNull Long espacoId; @NotNull LocalDate data;
@NotNull LocalTime horaInicio; @NotNull LocalTime horaFim;
@NotBlank String finalidade;
@AssertTrue(message = "horaFim deve ser maior que horaInicio")
boolean isHorarioValido() { return horaFim != null && horaInicio != null && horaFim.isAfter(horaInicio); }

EspacoRequest.java: @NotBlank String nome; @NotNull TipoEspaco tipo; @NotBlank String bloco; @Min(1) Integer capacidade; String descricao

UsuarioResponse.java (record): Long id, String nome, String email, Perfil perfil, String matricula
EspacoResponse.java (record): Long id, String nome, TipoEspaco tipo, String bloco, Integer capacidade, String descricao, Boolean ativo
ReservaResponse.java (record): Long id, UsuarioResponse solicitante, EspacoResponse espaco, LocalDate data, LocalTime horaInicio, LocalTime horaFim, String finalidade, StatusReserva status, UsuarioResponse aprovadoPor, LocalDateTime createdAt

--- com/ifce/academica/service/ConflitoService.java ---
@Service @RequiredArgsConstructor
public class ConflitoService {
  private final ReservaRepository reservaRepository;
  public void validar(Long espacoId, LocalDate data, LocalTime inicio, LocalTime fim, Long excluirId) {
    var statuses = List.of(StatusReserva.PENDENTE, StatusReserva.APROVADA);
    if (reservaRepository.existeConflito(espacoId, data, inicio, fim, statuses, excluirId)) {
      throw new ConflitoDeHorarioException();
    }
  }
}
Você é um desenvolvedor Java sênior. Crie os services de negócio do Academica — IFCE.

--- com/ifce/academica/service/AuthService.java ---
@Service @RequiredArgsConstructor
- autenticar(String email, String senha): busca usuário por email, valida senha com BCrypt, retorna UsuarioResponse
- buscarPorEmail(String email): retorna Usuario ou lança RecursoNaoEncontradoException

--- com/ifce/academica/service/EspacoService.java ---
@Service @RequiredArgsConstructor
- listar(String bloco, TipoEspaco tipo, Boolean ativo): filtra conforme parâmetros opcionais, retorna List<EspacoResponse>
- buscarPorId(Long id): retorna EspacoResponse ou lança exceção
- criar(EspacoRequest dto): salva e retorna EspacoResponse
- editar(Long id, EspacoRequest dto): atualiza campos, salva e retorna
- desativar(Long id): seta ativo=false, cancela automaticamente todas as reservas PENDENTE do espaço (status=CANCELADA), salva e retorna

--- com/ifce/academica/service/ReservaService.java ---
@Service @RequiredArgsConstructor (usa ReservaRepository, EspacoRepository, ConflitoService)

- solicitar(ReservaRequest dto, Long solicitanteId):
  1. Busca espaco por dto.espacoId (lança exceção se não encontrado ou inativo)
  2. Chama conflitoService.validar(...)
  3. Cria Reserva com status PENDENTE
  4. Salva e retorna ReservaResponse

- aprovar(Long reservaId, Long gestorId):
  1. Busca reserva (lança exceção se não encontrada)
  2. Valida que status é PENDENTE (400 se já processada)
  3. Seta status=APROVADA e aprovadoPor
  4. Salva e retorna

- rejeitar(Long reservaId, Long gestorId): igual ao aprovar mas status=REJEITADA

- cancelar(Long reservaId, Long usuarioId, Perfil perfil):
  1. Busca reserva
  2. Valida que usuário é dono OU é GESTOR
  3. Valida que status é PENDENTE ou APROVADA
  4. Seta status=CANCELADA, salva

- listar(Long espacoId, LocalDate data, StatusReserva status): busca com filtros opcionais, retorna List<ReservaResponse>
- minhas(Long usuarioId): retorna List<ReservaResponse> do solicitante

Crie método privado toResponse(Reserva r) que converte para ReservaResponse.

Você é um arquiteto Java sênior. Configure Spring Security e tratamento de erros do Academica — IFCE.

--- com/ifce/academica/config/SecurityConfig.java ---
@Configuration @EnableWebSecurity @EnableMethodSecurity
@Bean SecurityFilterChain:
- sessionManagement: SessionCreationPolicy.IF_REQUIRED
- csrf: desabilitado (SPA com CORS)
- authorizeHttpRequests:
  * POST /api/auth/login → permitAll
  * GET /api/auth/me, POST /api/auth/logout → authenticated
  * GET /api/espacos, GET /api/espacos/** → authenticated
  * POST /api/espacos, PUT /api/espacos/**, DELETE /api/espacos/** → hasRole("GESTOR")
  * POST /api/reservas → hasAnyRole("PROFESSOR","ALUNO")
  * PUT /api/reservas/**/aprovar, /api/reservas/**/rejeitar → hasRole("GESTOR")
  * GET /api/reservas, DELETE /api/reservas/** → authenticated
  * anyRequest → authenticated
- exceptionHandling: authenticationEntryPoint retorna 401 JSON (não redirect)
- @Bean PasswordEncoder: new BCryptPasswordEncoder()

--- com/ifce/academica/config/CorsConfig.java ---
@Configuration implements WebMvcConfigurer
addCorsMappings: allowedOrigins("http://localhost:5173"), allowedMethods("*"), allowedHeaders("*"), allowCredentials(true)

--- com/ifce/academica/config/CustomUserDetailsService.java ---
implements UserDetailsService
loadUserByUsername(String email): busca UsuarioRepository.findByEmail, retorna User do Spring Security com perfil como role

--- com/ifce/academica/exception/GlobalExceptionHandler.java ---
@RestControllerAdvice
- ConflitoDeHorarioException → 409 Conflict, body: {status:409, error:"Conflict", message:...}
- RecursoNaoEncontradoException → 404 Not Found
- AccessDeniedException → 403 Forbidden
- MethodArgumentNotValidException → 400 Bad Request, body: {errors: [{campo, mensagem}]}
- Exception genérica → 500 Internal Server Error


