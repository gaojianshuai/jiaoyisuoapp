import { useState, useEffect } from 'react'
import { ArrowLeft, Search, Filter, Clock, CheckCircle, XCircle, AlertCircle, Copy, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface C2CRecord {
  id: string
  orderId: string
  coin: string
  amount: number
  price: number
  total: number
  receiveAmount: number
  merchant: string
  status: 'pending' | 'paid' | 'completed' | 'cancelled' | 'disputed'
  time: string
  paymentMethod: string
}

export default function C2CRecords() {
  const navigate = useNavigate()
  const [records, setRecords] = useState<C2CRecord[]>([])
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid' | 'completed' | 'cancelled'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    loadRecords()
  }, [filter])

  const loadRecords = async () => {
    setLoading(true)
    // 模拟加载交易记录
    setTimeout(() => {
      const mockRecords: C2CRecord[] = [
        {
          id: '1',
          orderId: 'C2C20240115103025',
          coin: 'USDT',
          amount: 1000,
          price: 7.25,
          total: 7250,
          receiveAmount: 137.93,
          merchant: 'CryptoTrader001',
          status: 'completed',
          time: '2024-01-15 10:30:25',
          paymentMethod: '支付宝',
        },
        {
          id: '2',
          orderId: 'C2C20240115091510',
          coin: 'BTC',
          amount: 5000,
          price: 750000,
          total: 3750000,
          receiveAmount: 0.00667,
          merchant: 'TrustedSeller',
          status: 'completed',
          time: '2024-01-15 09:15:10',
          paymentMethod: '银行卡',
        },
        {
          id: '3',
          orderId: 'C2C20240114162030',
          coin: 'USDT',
          amount: 2000,
          price: 7.24,
          total: 14480,
          receiveAmount: 276.24,
          merchant: 'FastExchange',
          status: 'paid',
          time: '2024-01-14 16:20:30',
          paymentMethod: '微信',
        },
        {
          id: '4',
          orderId: 'C2C20240113112015',
          coin: 'ETH',
          amount: 3000,
          price: 25000,
          total: 75000,
          receiveAmount: 0.12,
          merchant: 'SafeTrade',
          status: 'cancelled',
          time: '2024-01-13 11:20:15',
          paymentMethod: '支付宝',
        },
        {
          id: '5',
          orderId: 'C2C20240112145000',
          coin: 'USDT',
          amount: 1500,
          price: 7.26,
          total: 10890,
          receiveAmount: 206.61,
          merchant: 'CryptoTrader001',
          status: 'pending',
          time: '2024-01-12 14:50:00',
          paymentMethod: '支付宝',
        },
      ]

      setRecords(mockRecords)
      setLoading(false)
    }, 500)
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { icon: Clock, color: 'text-yellow-600 bg-yellow-50', label: '等待付款' }
      case 'paid':
        return { icon: AlertCircle, color: 'text-blue-600 bg-blue-50', label: '等待放币' }
      case 'completed':
        return { icon: CheckCircle, color: 'text-green-600 bg-green-50', label: '已完成' }
      case 'cancelled':
        return { icon: XCircle, color: 'text-red-600 bg-red-50', label: '已取消' }
      case 'disputed':
        return { icon: AlertCircle, color: 'text-orange-600 bg-orange-50', label: '争议中' }
      default:
        return { icon: Clock, color: 'text-gray-600 bg-gray-50', label: '未知' }
    }
  }

  const copyOrderId = (orderId: string) => {
    navigator.clipboard.writeText(orderId)
    setCopiedId(orderId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredRecords = records.filter((record) => {
    const matchFilter = filter === 'all' || record.status === filter
    const matchSearch =
      record.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.coin.toLowerCase().includes(searchQuery.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold flex-1">C2C 交易记录</h2>
      </div>

      {/* Search and Filter */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mb-3">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="搜索订单号、商家、币种"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {[
            { key: 'all', label: '全部' },
            { key: 'pending', label: '等待付款' },
            { key: 'paid', label: '等待放币' },
            { key: 'completed', label: '已完成' },
            { key: 'cancelled', label: '已取消' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as any)}
              className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${
                filter === f.key
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Records List */}
      <div className="px-4 py-4 space-y-3">
        {loading ? (
          <div className="text-center py-8 text-gray-400 text-sm">加载中...</div>
        ) : filteredRecords.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">暂无交易记录</p>
          </div>
        ) : (
          filteredRecords.map((record) => {
            const statusInfo = getStatusInfo(record.status)
            const StatusIcon = statusInfo.icon
            return (
              <div
                key={record.id}
                className="bg-white rounded-xl p-4 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-sm">{record.coin}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded flex items-center gap-1 ${statusInfo.color}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500">订单号:</span>
                      <span className="text-xs font-mono">{record.orderId}</span>
                      <button
                        onClick={() => copyOrderId(record.orderId)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {copiedId === record.orderId ? (
                          <Check className="w-3 h-3 text-primary" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">
                      商家: {record.merchant} • {record.paymentMethod}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">购买金额:</span>
                    <span className="font-medium">¥{record.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">单价:</span>
                    <span className="font-medium">¥{record.price.toLocaleString()}/{record.coin}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">支付总额:</span>
                    <span className="font-medium text-primary">¥{record.total.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                    <span className="text-gray-600">收到数量:</span>
                    <span className="font-semibold text-lg">
                      {record.receiveAmount.toFixed(4)} {record.coin}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{record.time}</span>
                  {record.status === 'pending' && (
                    <button
                      onClick={() => navigate(`/c2c/order?merchant=${record.merchant}&coin=${record.coin}&amount=${record.amount}`)}
                      className="text-xs text-primary font-medium"
                    >
                      继续付款
                    </button>
                  )}
                  {record.status === 'paid' && (
                    <button
                      onClick={() => navigate(`/c2c/order?merchant=${record.merchant}&coin=${record.coin}&amount=${record.amount}`)}
                      className="text-xs text-primary font-medium"
                    >
                      查看订单
                    </button>
                  )}
                  {record.status === 'completed' && (
                    <button
                      onClick={() => navigate(`/c2c/order?merchant=${record.merchant}&coin=${record.coin}&amount=${record.amount}`)}
                      className="text-xs text-gray-600 font-medium"
                    >
                      查看详情
                    </button>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Statistics */}
      {records.length > 0 && (
        <div className="px-4 py-4">
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-semibold mb-3">统计信息</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">总交易次数:</span>
                <span className="font-medium">{records.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">已完成:</span>
                <span className="font-medium text-green-600">
                  {records.filter((r) => r.status === 'completed').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">进行中:</span>
                <span className="font-medium text-yellow-600">
                  {records.filter((r) => r.status === 'pending' || r.status === 'paid').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">已取消:</span>
                <span className="font-medium text-red-600">
                  {records.filter((r) => r.status === 'cancelled').length}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <span className="text-gray-600">总交易额:</span>
                <span className="font-semibold text-primary">
                  ¥{records
                    .filter((r) => r.status === 'completed')
                    .reduce((sum, r) => sum + r.total, 0)
                    .toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

