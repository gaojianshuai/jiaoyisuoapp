import { useState } from 'react'
import { ArrowLeft, Filter, Download, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Bill {
  id: string
  type: string
  coin: string
  amount: number
  status: string
  time: string
  fee?: number
}

export default function Bills() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const bills: Bill[] = [
    {
      id: '1',
      type: '买入',
      coin: 'BTC',
      amount: 0.001,
      status: '已完成',
      time: '2024-01-15 10:30:25',
      fee: 0.0001,
    },
    {
      id: '2',
      type: '卖出',
      coin: 'ETH',
      amount: 0.5,
      status: '已完成',
      time: '2024-01-14 15:20:10',
      fee: 0.0025,
    },
    {
      id: '3',
      type: '充币',
      coin: 'USDT',
      amount: 100,
      status: '已完成',
      time: '2024-01-13 09:15:30',
    },
    {
      id: '4',
      type: '提币',
      coin: 'USDT',
      amount: 50,
      status: '处理中',
      time: '2024-01-12 14:45:00',
      fee: 1,
    },
    {
      id: '5',
      type: '划转',
      coin: 'DOGE',
      amount: 1000,
      status: '已完成',
      time: '2024-01-11 11:20:15',
    },
  ]

  const filteredBills = bills.filter((bill) => {
    const matchFilter = filter === 'all' || bill.type === filter
    const matchSearch =
      bill.coin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.type.includes(searchQuery)
    return matchFilter && matchSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已完成':
        return 'text-green-600 bg-green-50'
      case '处理中':
        return 'text-yellow-600 bg-yellow-50'
      case '失败':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold flex-1">账单</h2>
        <button className="p-2">
          <Download className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mb-3">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="搜索币种或类型"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {['all', '买入', '卖出', '充币', '提币', '划转'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${
                filter === f
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {f === 'all' ? '全部' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Bills List */}
      <div className="px-4 py-4 space-y-2">
        {filteredBills.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <p className="text-gray-500">暂无账单记录</p>
          </div>
        ) : (
          filteredBills.map((bill) => (
            <div
              key={bill.id}
              className="bg-white rounded-xl p-4 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{bill.type}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${getStatusColor(
                        bill.status
                      )}`}
                    >
                      {bill.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{bill.coin}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      bill.type === '买入' || bill.type === '充币'
                        ? 'text-primary'
                        : 'text-gray-900'
                    }`}
                  >
                    {bill.type === '买入' || bill.type === '充币' ? '+' : '-'}
                    {bill.amount} {bill.coin}
                  </p>
                  {bill.fee && (
                    <p className="text-xs text-gray-500 mt-1">
                      手续费: {bill.fee} {bill.coin}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-400">{bill.time}</p>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-semibold mb-3">统计</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">总交易次数:</span>
              <span className="font-medium">{bills.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">已完成:</span>
              <span className="font-medium text-green-600">
                {bills.filter((b) => b.status === '已完成').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">处理中:</span>
              <span className="font-medium text-yellow-600">
                {bills.filter((b) => b.status === '处理中').length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

