import { useState } from 'react'
import { ArrowLeft, TrendingUp, TrendingDown, Info, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Lending() {
  const navigate = useNavigate()
  const [lendingType, setLendingType] = useState<'borrow' | 'lend'>('borrow')
  const [coin, setCoin] = useState('USDT')
  const [amount, setAmount] = useState('')
  const [duration, setDuration] = useState('7')

  const lendingRates = [
    { coin: 'USDT', borrowRate: '8.5%', lendRate: '6.2%', available: '1,234,567' },
    { coin: 'BTC', borrowRate: '5.2%', lendRate: '3.8%', available: '123.45' },
    { coin: 'ETH', borrowRate: '6.8%', lendRate: '4.5%', available: '2,345.67' },
  ]

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold flex-1">借贷</h2>
      </div>

      {/* Type Tabs */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex gap-2">
          <button
            onClick={() => setLendingType('borrow')}
            className={`flex-1 py-2 rounded-lg font-medium ${
              lendingType === 'borrow'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            借入
          </button>
          <button
            onClick={() => setLendingType('lend')}
            className={`flex-1 py-2 rounded-lg font-medium ${
              lendingType === 'lend'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            借出
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-4 space-y-4">
        {/* Coin Selection */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">选择币种</span>
            <Info className="w-4 h-4 text-gray-400" />
          </div>
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

        {/* Rate Info */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-base font-semibold mb-3">利率信息</h3>
          <div className="space-y-2">
            {lendingRates
              .filter((r) => r.coin === coin)
              .map((rate) => (
                <div key={rate.coin} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">借入利率</span>
                    <span className="text-sm font-semibold text-red-500">
                      {rate.borrowRate} 年化
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">借出利率</span>
                    <span className="text-sm font-semibold text-primary">
                      {rate.lendRate} 年化
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">可借额度</span>
                    <span className="text-sm font-medium">{rate.available} {rate.coin}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Amount Input */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              {lendingType === 'borrow' ? '借入金额' : '借出金额'}
            </span>
            <span className="text-xs text-gray-400">可用: 0 {coin}</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-lg outline-none"
            />
            <span className="text-gray-600 font-medium">{coin}</span>
          </div>
          <div className="flex gap-2 mt-2">
            {[25, 50, 75, 100].map((percent) => (
              <button
                key={percent}
                onClick={() => setAmount((1000 * percent * 0.01).toString())}
                className="flex-1 bg-gray-100 text-xs py-1 rounded"
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">借款期限</span>
          </div>
          <div className="flex gap-2">
            {['7', '14', '30', '90'].map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`flex-1 py-2 rounded-lg font-medium ${
                  duration === d
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {d}天
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        {amount && (
          <div className="bg-white rounded-xl p-4">
            <h3 className="text-base font-semibold mb-3">交易摘要</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">类型:</span>
                <span className="font-medium">
                  {lendingType === 'borrow' ? '借入' : '借出'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">币种:</span>
                <span className="font-medium">{coin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">金额:</span>
                <span className="font-medium">{amount} {coin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">期限:</span>
                <span className="font-medium">{duration} 天</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">利率:</span>
                <span className="font-medium text-primary">
                  {lendingRates.find((r) => r.coin === coin)?.[
                    lendingType === 'borrow' ? 'borrowRate' : 'lendRate'
                  ] || '0%'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={() => {
            if (!amount) {
              alert('请输入金额')
              return
            }
            alert(
              `${lendingType === 'borrow' ? '借入' : '借出'}订单已提交！\n金额: ${amount} ${coin}\n期限: ${duration} 天\n注意：这是演示版本，不会实际执行交易。`
            )
            setAmount('')
          }}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          确认{lendingType === 'borrow' ? '借入' : '借出'}
        </button>
      </div>
    </div>
  )
}

