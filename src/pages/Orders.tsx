import { useState } from 'react'
import { ArrowLeft, X, Clock, CheckCircle, XCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Order {
  id: string
  pair: string
  type: 'buy' | 'sell'
  price: number
  amount: number
  filled: number
  status: 'pending' | 'filled' | 'cancelled'
  time: string
}

export default function Orders() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<'all' | 'pending' | 'filled' | 'cancelled'>('all')

  const orders: Order[] = [
    {
      id: '1',
      pair: 'BTC/USDT',
      type: 'buy',
      price: 103822.5,
      amount: 0.001,
      filled: 0.001,
      status: 'filled',
      time: '2024-01-15 10:30:25',
    },
    {
      id: '2',
      pair: 'ETH/USDT',
      type: 'sell',
      price: 3527.8,
      amount: 0.5,
      filled: 0,
      status: 'pending',
      time: '2024-01-15 09:15:10',
    },
    {
      id: '3',
      pair: 'DOGE/USDT',
      type: 'buy',
      price: 0.178,
      amount: 1000,
      filled: 500,
      status: 'pending',
      time: '2024-01-14 16:20:30',
    },
  ]

  const filteredOrders = orders.filter(
    (order) => filter === 'all' || order.status === filter
  )

  const cancelOrder = (id: string) => {
    if (confirm('确定要取消这个订单吗？')) {
      alert('订单已取消')
    }
  }

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold flex-1">委托订单</h2>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex gap-2">
          {[
            { key: 'all', label: '全部' },
            { key: 'pending', label: '未成交' },
            { key: 'filled', label: '已成交' },
            { key: 'cancelled', label: '已取消' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                filter === tab.key
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 py-4 space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">暂无委托订单</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl p-4 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{order.pair}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        order.type === 'buy'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {order.type === 'buy' ? '买入' : '卖出'}
                    </span>
                    {order.status === 'pending' && (
                      <Clock className="w-4 h-4 text-yellow-500" />
                    )}
                    {order.status === 'filled' && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    {order.status === 'cancelled' && (
                      <XCircle className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>价格:</span>
                      <span className="font-medium">{order.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>数量:</span>
                      <span className="font-medium">
                        {order.filled}/{order.amount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>状态:</span>
                      <span
                        className={`font-medium ${
                          order.status === 'filled'
                            ? 'text-green-600'
                            : order.status === 'pending'
                            ? 'text-yellow-600'
                            : 'text-gray-400'
                        }`}
                      >
                        {order.status === 'pending'
                          ? '未成交'
                          : order.status === 'filled'
                          ? '已成交'
                          : '已取消'}
                      </span>
                    </div>
                  </div>
                </div>
                {order.status === 'pending' && (
                  <button
                    onClick={() => cancelOrder(order.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{order.time}</span>
                  <span>
                    成交率:{' '}
                    {((order.filled / order.amount) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

