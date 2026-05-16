import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => setSidebarOpen(prev => !prev)

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      {/* 
        Conteúdo principal — margem dinâmica que acompanha a sidebar.
        Em mobile a sidebar é um drawer (overlay), então sem margem.
        Em desktop (lg+), a margem acompanha a largura da sidebar.
      */}
      <div
        className={`
          flex-1 min-w-0 flex flex-col
          transition-[margin] duration-300 ease-out
          ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}
        `}
      >
        <Topbar onMenuToggle={toggleSidebar} />

        <main className="flex-1 p-4 md:p-6 xl:p-8 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
