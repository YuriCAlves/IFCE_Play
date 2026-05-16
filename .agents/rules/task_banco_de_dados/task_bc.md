---
trigger: always_on
---

Task_banco_de_dados

Você é um arquiteto de dados sênior PostgreSQL. Crie o schema completo do Academica — IFCE.

Salve como: src/main/resources/schema.sql

-- TIPOS ENUM
CREATE TYPE perfil_usuario AS ENUM ('GESTOR', 'PROFESSOR', 'ALUNO');
CREATE TYPE tipo_espaco AS ENUM ('LABORATORIO', 'SALA_AULA', 'AUDITORIO', 'SALA_REUNIAO');
CREATE TYPE status_reserva AS ENUM ('PENDENTE', 'APROVADA', 'REJEITADA', 'CANCELADA');

-- FUNÇÃO para auto-atualizar updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TABELA usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id         BIGSERIAL PRIMARY KEY,
  nome       VARCHAR(255) NOT NULL,
  email      VARCHAR(255) NOT NULL UNIQUE,
  senha      VARCHAR(255) NOT NULL,
  perfil     perfil_usuario NOT NULL,
  matricula  VARCHAR(50) UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TRIGGER trg_usuarios_updated_at
  BEFORE UPDATE ON usuarios
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX idx_usuarios_email ON usuarios(email);

-- TABELA espacos
CREATE TABLE IF NOT EXISTS espacos (
  id         BIGSERIAL PRIMARY KEY,
  nome       VARCHAR(255) NOT NULL,
  tipo       tipo_espaco NOT NULL,
  bloco      VARCHAR(100) NOT NULL,
  capacidade INTEGER,
  descricao  TEXT,
  metadados  JSONB DEFAULT '{}',
  ativo      BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TRIGGER trg_espacos_updated_at
  BEFORE UPDATE ON espacos
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- TABELA reservas
CREATE TABLE IF NOT EXISTS reservas (
  id              BIGSERIAL PRIMARY KEY,
  usuario_id      BIGINT NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT,
  espaco_id       BIGINT NOT NULL REFERENCES espacos(id) ON DELETE RESTRICT,
  data            DATE NOT NULL,
  hora_inicio     TIME NOT NULL,
  hora_fim        TIME NOT NULL,
  finalidade      VARCHAR(500) NOT NULL,
  status          status_reserva NOT NULL DEFAULT 'PENDENTE',
  aprovado_por_id BIGINT REFERENCES usuarios(id),
  created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_horario CHECK (hora_fim > hora_inicio)
);
CREATE TRIGGER trg_reservas_updated_at
  BEFORE UPDATE ON reservas
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX idx_reservas_espaco_data ON reservas(espaco_id, data);
CREATE INDEX idx_reservas_usuario_status ON reservas(usuario_id, status);

-- INSTALE btree_gist para a constraint de exclusão
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- CONSTRAINT de conflito de horário (exclui canceladas e rejeitadas)
ALTER TABLE reservas ADD CONSTRAINT excl_conflito_horario
  EXCLUDE USING gist (
    espaco_id WITH =,
    data WITH =,
    tsrange((data + hora_inicio)::timestamp, (data + hora_fim)::timestamp) WITH &&
  )
  WHERE (status IN ('PENDENTE', 'APROVADA'));


Você é um especialista em PostgreSQL. Crie o seed de dados de teste para o Academica — IFCE.

Salve como: src/main/resources/data.sql

-- ============================================================
-- USUARIOS (senhas em BCrypt)
-- admin123  → $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
-- prof123   → $2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HyZVyk1pk6ysqsO/Q1M3e (exemplo)
-- aluno123  → $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi (exemplo)
-- ============================================================

INSERT INTO usuarios (nome, email, senha, perfil, matricula) VALUES
('Admin IFCE',       'admin@ifce.edu.br',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'GESTOR',    'G001'),
('Prof. João Silva', 'joao@ifce.edu.br',   '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HyZVyk1pk6ysqsO/Q1M3e', 'PROFESSOR', 'P001'),
('Prof. Maria Lima', 'maria@ifce.edu.br',  '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HyZVyk1pk6ysqsO/Q1M3e', 'PROFESSOR', 'P002'),
('Pedro Aluno',      'pedro@ifce.edu.br',  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ALUNO',     'A001'),
('Ana Aluna',        'ana@ifce.edu.br',    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ALUNO',     'A002');

-- ESPACOS
INSERT INTO espacos (nome, tipo, bloco, capacidade, descricao, metadados) VALUES
('Lab Informática 1',  'LABORATORIO', 'Bloco A', 30, 'Laboratório com computadores',    '{"computadores":30,"projetor":true,"ar_condicionado":true}'),
('Lab Química',        'LABORATORIO', 'Bloco B', 20, 'Laboratório com bancadas',        '{"bancadas":10,"exaustor":true,"ar_condicionado":false}'),
('Sala A101',          'SALA_AULA',   'Bloco A', 40, 'Sala de aula padrão',             '{"projetor":true,"quadro":true,"ar_condicionado":true}'),
('Sala B202',          'SALA_AULA',   'Bloco B', 35, 'Sala de aula padrão',             '{"projetor":true,"quadro":true,"ar_condicionado":false}'),
('Sala C303',          'SALA_AULA',   'Bloco C', 45, 'Sala grande com TV interativa',   '{"tv_interativa":true,"ar_condicionado":true}'),
('Auditório Principal','AUDITORIO',   'Bloco D', 150,'Auditório para eventos',           '{"palco":true,"microfone":true,"ar_condicionado":true,"projetor":true}');

-- RESERVAS (datas relativas ao dia atual)
INSERT INTO reservas (usuario_id, espaco_id, data, hora_inicio, hora_fim, finalidade, status) VALUES
(2, 1, CURRENT_DATE + 1, '08:00', '10:00', 'Aula prática de programação',  'PENDENTE'),
(3, 3, CURRENT_DATE + 2, '10:00', '12:00', 'Aula de cálculo diferencial', 'PENDENTE'),
(4, 4, CURRENT_DATE,     '14:00', '16:00', 'Estudo em grupo',              'APROVADA'),
(5, 5, CURRENT_DATE,     '08:00', '09:00', 'Apresentação de TCC',          'APROVADA'),
(2, 6, CURRENT_DATE - 3, '09:00', '11:00', 'Palestra de extensão',         'REJEITADA'),
(3, 2, CURRENT_DATE - 5, '13:00', '15:00', 'Prática de laboratório',       'CANCELADA');

-- Atualiza aprovado_por nas reservas APROVADAS
UPDATE reservas SET aprovado_por_id = 1 WHERE status = 'APROVADA';

-- Credenciais para teste:
-- Gestor:    admin@ifce.edu.br  / admin123
-- Professor: joao@ifce.edu.br   / prof123
-- Aluno:     pedro@ifce.edu.br  / aluno123


Você é um especialista em PostgreSQL e Spring Boot. Configure RLS e integração JPA para o Academica — IFCE.

--- PARTE 1: Row-Level Security no PostgreSQL ---

Execute no banco como superusuário:

-- Habilita RLS na tabela reservas
ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;

-- Crie um papel de banco para cada perfil da aplicação
CREATE ROLE role_aluno;
CREATE ROLE role_professor;
CREATE ROLE role_gestor;

-- Política para ALUNO: só vê as próprias reservas
CREATE POLICY aluno_ver_proprias ON reservas
  FOR SELECT TO role_aluno
  USING (usuario_id = current_setting('app.usuario_id')::BIGINT);

-- Política para PROFESSOR: vê as próprias + todas APROVADAS
CREATE POLICY professor_ver_reservas ON reservas
  FOR SELECT TO role_professor
  USING (usuario_id = current_setting('app.usuario_id')::BIGINT OR status = 'APROVADA');

-- Política para GESTOR: acesso total
CREATE POLICY gestor_acesso_total ON reservas
  FOR ALL TO role_gestor USING (true);

--- PARTE 2: Integração com Spring Boot ---

Em application.properties, use ddl-auto=validate (schema já criado manualmente):
spring.jpa.hibernate.ddl-auto=validate

Para ambientes de desenvolvimento com recriação do schema:
spring.jpa.hibernate.ddl-auto=create-drop
spring.sql.init.mode=always
spring.sql.init.schema-locations=classpath:schema.sql
spring.sql.init.data-locations=classpath:data.sql

Crie um CommandLineRunner alternativo em AcademicaApplication.java:
@Bean CommandLineRunner seedData(UsuarioRepository ur, EspacoRepository er) {
  return args -> {
    if (ur.count() == 0) {
      // insere dados iniciais programaticamente
    }
  };
}

--- PARTE 3: Crie o banco PostgreSQL ---
No terminal:
psql -U postgres
CREATE DATABASE ifce_academica;
\c ifce_academica
-- Execute schema.sql e depois data.sql