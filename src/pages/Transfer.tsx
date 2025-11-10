import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Transfer() {
  const navigate = useNavigate()
  const [coin, setCoin] = useState('USDT')
  const [from, setFrom] = useState('funding')
  const [to, setTo] = useState('trading')
  const [amount, setAmount] = useState('')

  const accounts = [
    { id: 'funding', name: '资金账户', balance: 0.42 },
    { id: 'trading', name: '交易账户', balance: 2.63 },
    { id: 'earn', name: '赚币账户', balance: 0 },
  ]

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold flex-1">划转</h2>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Coin Selection */}
        <div className="bg-white rounded-xl p-4">
          <div className="mb-3">
            <span className="text-sm text-gray-600">选择币种</span>
          </div>
          <div className="flex gap-2">
            {['USDT', 'BTC', 'ETH', 'DOGE'].map((c) => (
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

        {/* From Account */}
        <div className="bg-white rounded-xl p-4">
          <div className="mb-3">
            <span className="text-sm text-gray-600">从</span>
          </div>
          <div className="space-y-2">
            {accounts.map((account) => (
              <button
                key={account.id}
                onClick={() => setFrom(account.id)}
                disabled={account.id === to}
                className={`w-full py-3 px-4 rounded-lg text-left ${
                  from === account.id
                    ? 'bg-primary/10 text-primary border-2 border-primary'
                    : account.id === to
                    ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-50 text-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{account.name}</span>
                  {from === account.id && (
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  余额: {account.balance} {coin}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-primary rotate-90" />
          </div>
        </div>

        {/* To Account */}
        <div className="bg-white rounded-xl p-4">
          <div className="mb-3">
            <span className="text-sm text-gray-600">到</span>
          </div>
          <div className="space-y-2">
            {accounts.map((account) => (
              <button
                key={account.id}
                onClick={() => setTo(account.id)}
                disabled={account.id === from}
                className={`w-full py-3 px-4 rounded-lg text-left ${
                  to === account.id
                    ? 'bg-primary/10 text-primary border-2 border-primary'
                    : account.id === from
                    ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-50 text-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{account.name}</span>
                  {to === account.id && (
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  余额: {account.balance} {coin}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">划转数量</span>
            <span className="text-xs text-primary">全部</span>
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
                onClick={() => {
                  const balance = accounts.find((a) => a.id === from)?.balance || 0
                  setAmount((balance * percent * 0.01).toString())
                }}
                className="flex-1 bg-gray-100 text-xs py-1 rounded"
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        {amount && (
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-semibold mb-3">划转摘要</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">从:</span>
                <span className="font-medium">
                  {accounts.find((a) => a.id === from)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">到:</span>
                <span className="font-medium">
                  {accounts.find((a) => a.id === to)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">币种:</span>
                <span className="font-medium">{coin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">数量:</span>
                <span className="font-medium">{amount} {coin}</span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={() => {
            if (!amount) {
              alert('请输入划转数量')
              return
            }
            alert(
              `划转成功！\n从: ${accounts.find((a) => a.id === from)?.name}\n到: ${accounts.find((a) => a.id === to)?.name}\n数量: ${amount} ${coin}\n注意：这是演示版本，不会实际执行划转。`
            )
            setAmount('')
          }}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          确认划转
        </button>
      </div>
    </div>
  )
}

