import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { GraduationCap, Mail, Lock, AlertCircle } from 'lucide-react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !senha) {
      setError('Preencha todos os campos.')
      return
    }

    setLoading(true)

    // Simula delay de rede
    await new Promise(r => setTimeout(r, 800))

    const success = login(email, senha)
    if (success) {
      navigate('/espacos')
    } else {
      setError('E-mail ou senha incorretos.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Lado esquerdo — Branding */}
      <div className="hidden lg:flex lg:w-[50%] lg:min-w-[480px] lg:max-w-[720px] bg-gradient-to-br from-ifce-950 via-ifce-900 to-ifce-700 relative overflow-hidden">
        {/* Padrão decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-ifce-400 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 w-full">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-8">
            <GraduationCap size={36} className="text-white" />
          </div>
          <h1 className="text-3xl xl:text-4xl font-extrabold text-white mb-4 leading-tight">
            IFCE Play
          </h1>
          <p className="text-base xl:text-lg text-ifce-200 mb-8 leading-relaxed">
            Sistema inteligente de gestão de espaços acadêmicos.
            Reserve salas, laboratórios e auditórios com facilidade.
          </p>
          <div className="flex flex-wrap gap-4 xl:gap-6 text-ifce-300 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ifce-400 shrink-0" />
              Reservas com aprovação
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ifce-400 shrink-0" />
              Detecção de conflitos
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito — Formulário */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-neutral-50">
        <div className="w-full max-w-lg">
          {/* Logo mobile */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-xl bg-ifce-900 flex items-center justify-center">
              <GraduationCap size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-800">IFCE Play</h1>
              <p className="text-xs text-neutral-400">Gestão de Espaços</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">
              Entrar no sistema
            </h2>
            <p className="text-neutral-500 text-sm">
              Use suas credenciais do IFCE para acessar.
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 mb-6 rounded-lg bg-danger-50 text-danger-700 text-sm animate-fade-in">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="E-mail"
              type="email"
              placeholder="seu.email@ifce.edu.br"
              value={email}
              onChange={e => setEmail(e.target.value)}
              icon={<Mail size={18} />}
            />

            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              icon={<Lock size={18} />}
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={loading}
            >
              Entrar
            </Button>
          </form>

          {/* Credenciais de teste */}
          <div className="mt-8 p-4 rounded-xl bg-neutral-100 border border-neutral-200">
            <p className="text-xs font-semibold text-neutral-500 mb-3 uppercase tracking-wider">
              Credenciais de teste
            </p>
            <div className="space-y-2 text-xs text-neutral-600">
              <div className="flex justify-between gap-2">
                <span className="font-medium shrink-0">Gestor:</span>
                <span className="text-neutral-400 text-right">admin@ifce.edu.br / admin123</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="font-medium shrink-0">Professor:</span>
                <span className="text-neutral-400 text-right">marcos@ifce.edu.br / prof123</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="font-medium shrink-0">Aluno:</span>
                <span className="text-neutral-400 text-right">carlos@aluno.ifce.edu.br / aluno123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
