import { useState } from 'react'
import { ArrowLeft, Bot, TrendingUp, Settings, Play, Pause, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Strategy {
  id: string
  name: string
  pair: string
  type: string
  status: 'running' | 'paused' | 'stopped'
  profit: number
  profitPercent: number
  gridCount: number
}

export default function Strategy() {
  const navigate = useNavigate()
  const [strategies, setStrategies] = useState<Strategy[]>([
    {
      id: '1',
      name: '天地网格',
      pair: 'BTC/USDT',
      type: '网格交易',
      status: 'running',
      profit: 12.34,
      profitPercent: 2.45,
      gridCount: 20,
    },
    {
      id: '2',
      name: 'DCA定投',
      pair: 'ETH/USDT',
      type: '定投策略',
      status: 'paused',
      profit: -5.67,
      profitPercent: -1.23,
      gridCount: 0,
    },
  ])

  const toggleStrategy = (id: string) => {
    setStrategies(
      strategies.map((s) =>
        s.id === id
          ? {
              ...s,
              status: s.status === 'running' ? 'paused' : 'running',
            }
          : s
      )
    )
  }

  const deleteStrategy = (id: string) => {
    if (confirm('确定要删除这个策略吗？')) {
      setStrategies(strategies.filter((s) => s.id !== id))
    }
  }

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold flex-1">策略交易</h2>
        <button
          onClick={() => navigate('/strategy/create')}
          className="text-primary font-medium"
        >
          创建
        </button>
      </div>

      {/* Strategy List */}
      <div className="px-4 py-4 space-y-3">
        {strategies.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">暂无策略</p>
            <button
              onClick={() => navigate('/strategy/create')}
              className="bg-primary text-white px-6 py-2 rounded-lg font-medium"
            >
              创建策略
            </button>
          </div>
        ) : (
          strategies.map((strategy) => (
            <div
              key={strategy.id}
              className="bg-white rounded-xl p-4 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{strategy.name}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        strategy.status === 'running'
                          ? 'bg-green-100 text-green-600'
                          : strategy.status === 'paused'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {strategy.status === 'running'
                        ? '运行中'
                        : strategy.status === 'paused'
                        ? '已暂停'
                        : '已停止'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{strategy.pair}</p>
                  <p className="text-xs text-gray-400 mt-1">{strategy.type}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleStrategy(strategy.id)}
                    className={`p-2 rounded-lg ${
                      strategy.status === 'running'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {strategy.status === 'running' ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteStrategy(strategy.id)}
                    className="p-2 rounded-lg bg-red-100 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">累计收益</p>
                  <p
                    className={`text-lg font-semibold ${
                      strategy.profit >= 0 ? 'text-primary' : 'text-red-500'
                    }`}
                  >
                    {strategy.profit >= 0 ? '+' : ''}
                    {strategy.profit.toFixed(2)} USDT
                  </p>
                  <p
                    className={`text-xs ${
                      strategy.profitPercent >= 0 ? 'text-primary' : 'text-red-500'
                    }`}
                  >
                    {strategy.profitPercent >= 0 ? '+' : ''}
                    {strategy.profitPercent.toFixed(2)}%
                  </p>
                </div>
                {strategy.gridCount > 0 && (
                  <div className="text-right">
                    <p className="text-xs text-gray-500">网格数量</p>
                    <p className="text-base font-semibold">{strategy.gridCount}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-4 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Bot className="w-6 h-6" />
            <h3 className="font-semibold">智能交易助手</h3>
          </div>
          <p className="text-sm text-white/90 mb-3">
            一键开启智能交易，赚取高达 17.74% 年化收益
          </p>
          <button
            onClick={() => navigate('/strategy/create')}
            className="w-full bg-white text-primary py-2 rounded-lg font-medium"
          >
            立即创建策略
          </button>
        </div>
      </div>
    </div>
  )
}

