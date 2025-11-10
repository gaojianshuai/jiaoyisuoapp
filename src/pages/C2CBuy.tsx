import { useState, useEffect } from 'react'
import { ArrowLeft, Search, Shield, Star, TrendingUp, TrendingDown, Clock, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Merchant {
  id: string
  name: string
  avatar: string
  rating: number
  completed: number
  price: number
  limit: { min: number; max: number }
  paymentMethods: string[]
  online: boolean
  responseTime: string
}

export default function C2CBuy() {
  const navigate = useNavigate()
  const [coin, setCoin] = useState('USDT')
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('all')
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'volume'>('price')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    loadMerchants()
  }, [coin, paymentMethod, sortBy, order])

  const loadMerchants = async () => {
    setLoading(true)
    // 模拟API调用
    setTimeout(() => {
      const mockMerchants: Merchant[] = [
        {
          id: '1',
          name: 'CryptoTrader001',
          avatar: '👤',
          rating: 4.9,
          completed: 1250,
          price: 7.25,
          limit: { min: 100, max: 50000 },
          paymentMethods: ['支付宝', '微信'],
          online: true,
          responseTime: '< 5分钟',
        },
        {
          id: '2',
          name: 'TrustedSeller',
          avatar: '👨‍💼',
          rating: 4.8,
          completed: 890,
          price: 7.26,
          limit: { min: 50, max: 30000 },
          paymentMethods: ['银行卡', '支付宝'],
          online: true,
          responseTime: '< 3分钟',
        },
        {
          id: '3',
          name: 'FastExchange',
          avatar: '⚡',
          rating: 4.7,
          completed: 2100,
          price: 7.24,
          limit: { min: 200, max: 100000 },
          paymentMethods: ['微信', '银行卡'],
          online: false,
          responseTime: '< 10分钟',
        },
        {
          id: '4',
          name: 'SafeTrade',
          avatar: '🛡️',
          rating: 5.0,
          completed: 560,
          price: 7.27,
          limit: { min: 100, max: 20000 },
          paymentMethods: ['支付宝'],
          online: true,
          responseTime: '< 2分钟',
        },
      ]

      // 排序
      const sorted = [...mockMerchants].sort((a, b) => {
        if (sortBy === 'price') {
          return order === 'asc' ? a.price - b.price : b.price - a.price
        } else if (sortBy === 'rating') {
          return order === 'asc' ? a.rating - b.rating : b.rating - a.rating
        } else {
          return order === 'asc' ? a.completed - b.completed : b.completed - a.completed
        }
      })

      // 过滤支付方式
      const filtered = paymentMethod === 'all'
        ? sorted
        : sorted.filter((m) => m.paymentMethods.includes(paymentMethod))

      setMerchants(filtered)
      setLoading(false)
    }, 500)
  }

  const handleBuy = (merchant: Merchant) => {
    if (!amount || parseFloat(amount) < merchant.limit.min || parseFloat(amount) > merchant.limit.max) {
      alert(`请输入金额，范围: ${merchant.limit.min} - ${merchant.limit.max} ${coin}`)
      return
    }
    navigate(`/c2c/order?merchant=${merchant.id}&coin=${coin}&amount=${amount}`)
  }

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold flex-1">C2C 买币</h2>
        <button
          onClick={() => navigate('/c2c/records')}
          className="text-sm text-primary font-medium"
        >
          交易记录
        </button>
      </div>

      {/* Coin Selection */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex gap-2">
          {['USDT', 'BTC', 'ETH'].map((c) => (
            <button
              key={c}
              onClick={() => setCoin(c)}
              className={`flex-1 py-2 rounded-lg font-medium ${
                coin === c
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Amount Input */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <div className="mb-2">
          <span className="text-sm text-gray-600">购买金额 (CNY)</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="输入金额"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-lg outline-none"
          />
          <span className="text-gray-600 font-medium">CNY</span>
        </div>
        <div className="flex gap-2 mt-2">
          {[500, 1000, 5000, 10000].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val.toString())}
              className="flex-1 bg-gray-100 text-xs py-1 rounded"
            >
              ¥{val}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-gray-600">支付方式:</span>
          <div className="flex gap-2 flex-1 overflow-x-auto">
            {['all', '支付宝', '微信', '银行卡'].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${
                  paymentMethod === method
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {method === 'all' ? '全部' : method}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">排序:</span>
          <div className="flex gap-2 flex-1">
            {[
              { key: 'price', label: '价格' },
              { key: 'rating', label: '评分' },
              { key: 'volume', label: '成交量' },
            ].map((sort) => (
              <button
                key={sort.key}
                onClick={() => {
                  if (sortBy === sort.key) {
                    setOrder(order === 'asc' ? 'desc' : 'asc')
                  } else {
                    setSortBy(sort.key as any)
                    setOrder('asc')
                  }
                }}
                className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 ${
                  sortBy === sort.key
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {sort.label}
                {sortBy === sort.key && (
                  order === 'asc' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Merchants List */}
      <div className="px-4 py-4 space-y-3">
        {loading ? (
          <div className="text-center py-8 text-gray-400 text-sm">加载中...</div>
        ) : merchants.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">暂无商家</div>
        ) : (
          merchants.map((merchant) => (
            <div
              key={merchant.id}
              className="bg-white rounded-xl p-4 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                      {merchant.avatar}
                    </div>
                    {merchant.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{merchant.name}</span>
                      {merchant.rating >= 4.9 && (
                        <Shield className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span>{merchant.rating}</span>
                      </div>
                      <span>•</span>
                      <span>成交 {merchant.completed} 笔</span>
                      {merchant.online && (
                        <>
                          <span>•</span>
                          <span className="text-green-500">在线</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    ¥{merchant.price}
                  </div>
                  <div className="text-xs text-gray-500">/{coin}</div>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">限额:</span>
                  <span className="text-gray-700">
                    ¥{merchant.limit.min} - ¥{merchant.limit.max}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">支付方式:</span>
                  <div className="flex gap-1">
                    {merchant.paymentMethods.map((method) => (
                      <span
                        key={method}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">响应时间:</span>
                  <span className="text-gray-700 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {merchant.responseTime}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleBuy(merchant)}
                className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                购买
              </button>
            </div>
          ))
        )}
      </div>

      {/* Safety Tips */}
      <div className="px-4 py-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-700 space-y-1">
              <p className="font-semibold">安全提示</p>
              <p>• 请选择高评分、成交量大的商家</p>
              <p>• 交易前请仔细核对商家信息</p>
              <p>• 不要提前确认收款，等待商家放币</p>
              <p>• 如有问题，请及时联系客服</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

