import { useState } from 'react'
import { ArrowLeft, Bot, TrendingUp, TrendingDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function CreateStrategy() {
  const navigate = useNavigate()
  const [strategyType, setStrategyType] = useState<'grid' | 'dca'>('grid')
  const [pair, setPair] = useState('BTC/USDT')
  const [gridCount, setGridCount] = useState('20')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [investment, setInvestment] = useState('')

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold flex-1">创建策略</h2>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Strategy Type */}
        <div className="bg-white rounded-xl p-4">
          <div className="mb-3">
            <span className="text-sm text-gray-600">策略类型</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setStrategyType('grid')}
              className={`p-4 rounded-lg border-2 ${
                strategyType === 'grid'
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-5 h-5 text-primary" />
                <span className="font-semibold">网格交易</span>
              </div>
              <p className="text-xs text-gray-500">
                在价格区间内自动低买高卖
              </p>
            </button>
            <button
              onClick={() => setStrategyType('dca')}
              className={`p-4 rounded-lg border-2 ${
                strategyType === 'dca'
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="font-semibold">定投策略</span>
              </div>
              <p className="text-xs text-gray-500">
                定期定额买入，降低平均成本
              </p>
            </button>
          </div>
        </div>

        {/* Trading Pair */}
        <div className="bg-white rounded-xl p-4">
          <div className="mb-3">
            <span className="text-sm text-gray-600">交易对</span>
          </div>
          <div className="flex gap-2">
            {['BTC/USDT', 'ETH/USDT', 'DOGE/USDT'].map((p) => (
              <button
                key={p}
                onClick={() => setPair(p)}
                className={`flex-1 py-2 rounded-lg font-medium ${
                  pair === p
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Settings */}
        {strategyType === 'grid' && (
          <>
            <div className="bg-white rounded-xl p-4">
              <div className="mb-3">
                <span className="text-sm text-gray-600">网格数量</span>
              </div>
              <input
                type="number"
                placeholder="20"
                value={gridCount}
                onChange={(e) => setGridCount(e.target.value)}
                className="w-full bg-gray-50 rounded-lg px-3 py-2 outline-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                建议范围: 10-100，数量越多收益越稳定
              </p>
            </div>

            <div className="bg-white rounded-xl p-4">
              <div className="mb-3">
                <span className="text-sm text-gray-600">价格区间</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="最低价"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, min: e.target.value })
                  }
                  className="flex-1 bg-gray-50 rounded-lg px-3 py-2 outline-none"
                />
                <input
                  type="number"
                  placeholder="最高价"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, max: e.target.value })
                  }
                  className="flex-1 bg-gray-50 rounded-lg px-3 py-2 outline-none"
                />
              </div>
            </div>
          </>
        )}

        {/* Investment */}
        <div className="bg-white rounded-xl p-4">
          <div className="mb-3">
            <span className="text-sm text-gray-600">投入金额 (USDT)</span>
          </div>
          <input
            type="number"
            placeholder="1000"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            className="w-full bg-gray-50 rounded-lg px-3 py-2 text-lg outline-none"
          />
          <div className="flex gap-2 mt-2">
            {[25, 50, 75, 100].map((percent) => (
              <button
                key={percent}
                onClick={() => setInvestment((1000 * percent * 0.01).toString())}
                className="flex-1 bg-gray-100 text-xs py-1 rounded"
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        {investment && (
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-semibold mb-3">策略摘要</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">策略类型:</span>
                <span className="font-medium">
                  {strategyType === 'grid' ? '网格交易' : '定投策略'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">交易对:</span>
                <span className="font-medium">{pair}</span>
              </div>
              {strategyType === 'grid' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">网格数量:</span>
                    <span className="font-medium">{gridCount}</span>
                  </div>
                  {priceRange.min && priceRange.max && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">价格区间:</span>
                      <span className="font-medium">
                        {priceRange.min} - {priceRange.max}
                      </span>
                    </div>
                  )}
                </>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">投入金额:</span>
                <span className="font-medium">{investment} USDT</span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={() => {
            if (!investment) {
              alert('请输入投入金额')
              return
            }
            if (strategyType === 'grid' && (!priceRange.min || !priceRange.max)) {
              alert('请输入价格区间')
              return
            }
            alert(
              `策略创建成功！\n类型: ${strategyType === 'grid' ? '网格交易' : '定投策略'}\n交易对: ${pair}\n投入: ${investment} USDT\n注意：这是演示版本，不会实际创建策略。`
            )
            navigate('/strategy')
          }}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          创建策略
        </button>
      </div>
    </div>
  )
}

