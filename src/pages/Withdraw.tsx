import { useState } from 'react'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Withdraw() {
  const navigate = useNavigate()
  const [coin, setCoin] = useState('USDT')
  const [network, setNetwork] = useState('TRC20')
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold flex-1">提币</h2>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Coin Selection */}
        <div className="bg-white rounded-xl p-4">
          <div className="mb-3">
            <span className="text-sm text-gray-600">选择币种</span>
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
          <div className="mt-3 text-xs text-gray-500">
            可用余额: 0 {coin}
          </div>
        </div>

        {/* Network Selection */}
        <div className="bg-white rounded-xl p-4">
          <div className="mb-3">
            <span className="text-sm text-gray-600">选择网络</span>
          </div>
          <div className="space-y-2">
            {['TRC20', 'ERC20', 'BEP20'].map((n) => (
              <button
                key={n}
                onClick={() => setNetwork(n)}
                className={`w-full py-2 px-3 rounded-lg text-left ${
                  network === n
                    ? 'bg-primary/10 text-primary border border-primary'
                    : 'bg-gray-50 text-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{n}</span>
                  {network === n && (
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  手续费: {n === 'TRC20' ? '1' : n === 'ERC20' ? '10' : '0.5'} {coin}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Address Input */}
        <div className="bg-white rounded-xl p-4">
          <div className="mb-2">
            <span className="text-sm text-gray-600">提币地址</span>
          </div>
          <input
            type="text"
            placeholder="请输入或粘贴钱包地址"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-gray-50 rounded-lg px-3 py-2 text-sm outline-none"
          />
        </div>

        {/* Amount Input */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">提币数量</span>
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
                onClick={() => setAmount((100 * percent * 0.01).toString())}
                className="flex-1 bg-gray-100 text-xs py-1 rounded"
              >
                {percent}%
              </button>
            ))}
          </div>
          <div className="mt-3 text-xs text-gray-500">
            手续费: {network === 'TRC20' ? '1' : network === 'ERC20' ? '10' : '0.5'} {coin}
            <br />
            到账金额: {amount ? (parseFloat(amount) - (network === 'TRC20' ? 1 : network === 'ERC20' ? 10 : 0.5)).toFixed(2) : '0'} {coin}
          </div>
        </div>

        {/* Warning */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-red-700 space-y-1">
              <p className="font-semibold">安全提示</p>
              <p>• 请仔细核对提币地址，错误地址将导致资产丢失</p>
              <p>• 请确保使用 {network} 网络</p>
              <p>• 提币需要经过安全验证，可能需要 1-24 小时</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={() => {
            if (!address) {
              alert('请输入提币地址')
              return
            }
            if (!amount) {
              alert('请输入提币数量')
              return
            }
            alert(
              `提币申请已提交！\n币种: ${coin}\n数量: ${amount} ${coin}\n网络: ${network}\n地址: ${address}\n注意：这是演示版本，不会实际执行提币。`
            )
            setAddress('')
            setAmount('')
          }}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          确认提币
        </button>
      </div>
    </div>
  )
}

