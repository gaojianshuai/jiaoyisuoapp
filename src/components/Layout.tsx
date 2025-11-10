import { ReactNode, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, TrendingUp, ArrowLeftRight, Compass, Wallet } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      // 使用 Intl.DateTimeFormat 获取北京时间
      const beijingTime = new Intl.DateTimeFormat('zh-CN', {
        timeZone: 'Asia/Shanghai',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(now)
      setCurrentTime(beijingTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000) // 每秒更新

    return () => clearInterval(interval)
  }, [])

  const navItems = [
    { path: '/', icon: Home, label: '欧易' },
    { path: '/market', icon: TrendingUp, label: '市场' },
    { path: '/trade', icon: ArrowLeftRight, label: '交易' },
    { path: '/discover', icon: Compass, label: '探索' },
    { path: '/assets', icon: Wallet, label: '资产' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Status Bar */}
      <div className="h-8 bg-white flex items-center justify-between px-4 text-xs text-gray-600">
        <span>{currentTime || '--:--'}</span>
        <div className="flex items-center gap-1">
          <span>5G</span>
          <span>5G</span>
          <span>WiFi</span>
          <span>80%</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200" style={{ maxWidth: '428px', margin: '0 auto' }}>
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            const isTrade = item.path === '/trade'

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center flex-1 ${
                  isActive ? 'text-primary' : 'text-gray-500'
                }`}
              >
                {isTrade ? (
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mb-1">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                ) : (
                  <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-primary' : ''}`} />
                )}
                <span className="text-xs">{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

