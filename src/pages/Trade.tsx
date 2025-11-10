import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { ChevronDown, Info, Plus } from 'lucide-react'
import cryptoAPI, { CryptoPrice } from '../services/api'

export default function Trade() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const pair = searchParams.get('pair') || 'BTC/USDT'
  const [coin, setCoin] = useState<CryptoPrice | null>(null)
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy')
  const [orderMethod] = useState('市价委托')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [timeframe, setTimeframe] = useState('1日')
  const [chartData, setChartData] = useState<any[]>([])
  const [showChart, setShowChart] = useState(true)
  const [showConfirm, setShowConfirm] = useState(false)
  const [orderData, setOrderData] = useState<{ type: 'buy' | 'sell'; amount: string; price: string } | null>(null)

  useEffect(() => {
    const symbol = pair.split('/')[0].toLowerCase()
    loadCoinData(symbol)
    generateChartData()
  }, [pair])

  const loadCoinData = async (symbol: string) => {
    try {
      const data = await cryptoAPI.getMarketData()
      const found = data.find((c) => c.symbol.toLowerCase() === symbol.toLowerCase())
      if (found) {
        setCoin(found)
        setPrice(found.current_price.toString())
      } else {
        // 如果找不到，使用默认值
        const defaultCoin: CryptoPrice = {
          id: symbol.toLowerCase(),
          symbol: symbol.toLowerCase(),
          name: symbol,
          image: '',
          current_price: 0,
          price_change_percentage_24h: 0,
          market_cap: 0,
          total_volume: 0,
          high_24h: 0,
          low_24h: 0,
        }
        setCoin(defaultCoin)
        setPrice('0')
      }
    } catch (error) {
      console.error('Failed to load coin data:', error)
    }
  }

  const generateChartData = () => {
    const data = []
    let basePrice = 100000
    for (let i = 0; i < 30; i++) {
      basePrice += (Math.random() - 0.5) * 5000
      data.push({
        date: `10/${String(i + 1).padStart(2, '0')}`,
        price: Math.max(95000, Math.min(130000, basePrice)),
      })
    }
    setChartData(data)
  }

  const orderBook = {
    sells: [
      { price: 103825.9, amount: 0.09768 },
      { price: 103825.2, amount: 0.00442 },
      { price: 103823.0, amount: 0.02191 },
      { price: 103822.9, amount: 0.04223 },
      { price: 103822.1, amount: 0.32831 },
    ],
    buys: [
      { price: 103822.0, amount: 0.16628 },
      { price: 103821.9, amount: 0.00048 },
      { price: 103821.8, amount: 0.00096 },
      { price: 103821.7, amount: 0.00048 },
      { price: 103821.6, amount: 0.00048 },
    ],
  }

  if (!coin) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-3 text-gray-500">加载中...</span>
      </div>
    )
  }

  const isPositive = coin.price_change_percentage_24h >= 0

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">{pair}</span>
            <span className="text-sm text-gray-500">现货</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-100 rounded" />
            <div className="w-6 h-6 bg-gray-100 rounded" />
            <div className="w-2 h-2 bg-red-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      {showChart && (
        <div className="bg-white border-b border-gray-100">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              {['15分', '1时', '4时', '1日', '更多'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    timeframe === tf ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowChart(!showChart)}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              隐藏 ↑
            </button>
          </div>
          <div className="px-4 py-2 text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span>MA5: 102,419.1</span>
              <span>MA10: 105,165.4</span>
              <span>MA20: 108,368.9</span>
            </div>
          </div>
          <div className="h-64 px-4 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={isPositive ? '#00D9A5' : '#EF4444'}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="flex gap-2 px-4 mt-2">
        {/* Order Entry */}
        <div className="flex-1 bg-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setOrderType('buy')}
              className={`flex-1 py-2 rounded-lg font-medium ${
                orderType === 'buy' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              买入
            </button>
            <button
              onClick={() => setOrderType('sell')}
              className={`flex-1 py-2 rounded-lg font-medium ${
                orderType === 'sell' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              卖出
            </button>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>杠杆</span>
              <div className="w-8 h-4 bg-gray-200 rounded-full relative">
                <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">市价委托</span>
                <Info className="w-3 h-3 text-gray-400" />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="市价"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="flex-1 bg-gray-50 rounded px-3 py-2 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">金额</span>
                <span className="text-xs text-gray-400">USDT ▼</span>
              </div>
              <input
                type="text"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-gray-50 rounded px-3 py-2 text-sm outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              {[25, 50, 75, 100].map((percent) => (
                <button
                  key={percent}
                  className="flex-1 bg-gray-100 text-xs py-1 rounded"
                  onClick={() => setAmount((parseFloat(price) * percent * 0.01).toString())}
                >
                  {percent}%
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <span>可用</span>
                <span className="text-primary">0 USDT</span>
                <Plus className="w-3 h-3" />
              </div>
              <span>可买 0 {coin.symbol.toUpperCase()}</span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <input type="checkbox" id="tp-sl" className="w-4 h-4" />
              <label htmlFor="tp-sl" className="text-gray-600">止盈/止损</label>
            </div>

            <button
              onClick={() => {
                if (!amount || !price) {
                  alert('请输入金额和价格')
                  return
                }
                setOrderData({ type: orderType, amount, price })
                setShowConfirm(true)
              }}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 ${
                orderType === 'buy' ? 'bg-primary' : 'bg-red-500'
              }`}
            >
              {orderType === 'buy' ? '买入' : '卖出'} {coin.symbol.toUpperCase()}
            </button>
          </div>
        </div>

        {/* Order Book */}
        <div className="flex-1 bg-white rounded-lg p-4">
          <div className="text-xs text-gray-500 mb-2">价格 (USDT) / 数量 (BTC)</div>
          
          {/* Sell Orders */}
          <div className="space-y-0.5 mb-2">
            {orderBook.sells.map((order, idx) => (
              <button
                key={idx}
                onClick={() => setPrice(order.price.toString())}
                className="w-full flex items-center justify-between text-xs hover:bg-gray-50 py-1 px-1 rounded"
              >
                <span className="text-red-500">{order.price.toLocaleString()}</span>
                <span className="text-gray-600">{order.amount.toFixed(5)}</span>
              </button>
            ))}
          </div>

          {/* Current Price */}
          <div className="text-center py-2 border-y border-gray-200 my-2">
            <div className="text-lg font-bold text-red-500">{coin.current_price.toLocaleString()}</div>
            <div className="text-xs text-gray-500">
              ≈ ${coin.current_price.toLocaleString()} {isPositive ? '+' : ''}
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
          </div>

          {/* Buy Orders */}
          <div className="space-y-0.5">
            {orderBook.buys.map((order, idx) => (
              <button
                key={idx}
                onClick={() => setPrice(order.price.toString())}
                className="w-full flex items-center justify-between text-xs hover:bg-gray-50 py-1 px-1 rounded"
              >
                <span className="text-primary">{order.price.toLocaleString()}</span>
                <span className="text-gray-600">{order.amount.toFixed(5)}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
            <span>B 26%</span>
            <span>74% S</span>
          </div>
        </div>
      </div>

      {/* Bottom Tabs */}
      <div className="flex items-center justify-around bg-white border-t border-gray-100 px-4 py-2 mt-2">
        {[
          { label: '委托(0)', action: () => navigate('/orders') },
          { label: '资产', action: () => navigate('/assets') },
          { label: '策略(0)', action: () => navigate('/strategy') },
        ].map((tab) => (
          <button
            key={tab.label}
            onClick={tab.action}
            className="text-sm text-gray-600 hover:text-primary transition-colors"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Confirm Dialog */}
      {showConfirm && orderData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              确认{orderData.type === 'buy' ? '买入' : '卖出'}
            </h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">交易对:</span>
                <span className="font-medium">{pair}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">价格:</span>
                <span className="font-medium">{orderData.price} USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">数量:</span>
                <span className="font-medium">{orderData.amount} USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">总计:</span>
                <span className="font-medium">
                  {(parseFloat(orderData.amount) || 0).toFixed(2)} USDT
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirm(false)
                  setOrderData(null)
                }}
                className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium"
              >
                取消
              </button>
              <button
                onClick={() => {
                  alert(`${orderData.type === 'buy' ? '买入' : '卖出'}订单已提交！\n注意：这是演示版本，不会实际执行交易。`)
                  setShowConfirm(false)
                  setOrderData(null)
                  setAmount('')
                }}
                className={`flex-1 py-2 rounded-lg font-medium text-white ${
                  orderData.type === 'buy' ? 'bg-primary' : 'bg-red-500'
                }`}
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

