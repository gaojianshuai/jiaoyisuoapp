import { useState, useEffect } from 'react'
import { ArrowLeft, Copy, Check, QrCode as QrCodeIcon, RefreshCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import QRCode from '../components/QRCode'

interface DepositRecord {
  id: string
  coin: string
  amount: number
  network: string
  status: 'pending' | 'completed' | 'failed'
  time: string
  txHash?: string
}

export default function Deposit() {
  const navigate = useNavigate()
  const [coin, setCoin] = useState('USDT')
  const [network, setNetwork] = useState('TRC20')
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [records, setRecords] = useState<DepositRecord[]>([])
  const [loading, setLoading] = useState(false)

  // 根据币种和网络生成地址
  const getAddress = () => {
    const addresses: Record<string, Record<string, string>> = {
      USDT: {
        TRC20: 'TXYZabcdefghijklmnopqrstuvwxyz123456',
        ERC20: '0x1234567890abcdef1234567890abcdef12345678',
        BEP20: '0xabcdef1234567890abcdef1234567890abcdef12',
      },
      BTC: {
        TRC20: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        ERC20: '0x9876543210fedcba9876543210fedcba98765432',
        BEP20: '0xfedcba0987654321fedcba0987654321fedcba09',
      },
      ETH: {
        TRC20: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
        ERC20: '0x1111222233334444555566667777888899990000',
        BEP20: '0x2222333344445555666677778888999900001111',
      },
    }
    return addresses[coin]?.[network] || addresses.USDT.TRC20
  }

  const address = getAddress()

  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const loadRecords = async () => {
    setLoading(true)
    // 模拟加载充值记录
    setTimeout(() => {
      setRecords([
        {
          id: '1',
          coin: 'USDT',
          amount: 100,
          network: 'TRC20',
          status: 'completed',
          time: '2024-01-15 10:30:25',
          txHash: '0x1234...5678',
        },
        {
          id: '2',
          coin: 'BTC',
          amount: 0.001,
          network: 'ERC20',
          status: 'pending',
          time: '2024-01-15 09:15:10',
        },
      ])
      setLoading(false)
    }, 500)
  }

  useEffect(() => {
    loadRecords()
  }, [])

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold flex-1">充币</h2>
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
                  {n === 'TRC20' && '手续费低，到账快'}
                  {n === 'ERC20' && '以太坊网络'}
                  {n === 'BEP20' && '币安智能链'}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-xl p-4">
          <div className="mb-3">
            <span className="text-sm text-gray-600">充值地址</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-mono break-all flex-1">{address}</p>
              <button
                onClick={copyAddress}
                className="flex-shrink-0 p-2 bg-primary/10 rounded-lg"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-primary" />
                ) : (
                  <Copy className="w-4 h-4 text-primary" />
                )}
              </button>
            </div>
          </div>
          <button
            onClick={() => setShowQR(true)}
            className="w-full py-2 border border-primary text-primary rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary/5"
          >
            <QrCodeIcon className="w-4 h-4" />
            显示二维码
          </button>
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">⚠️ 注意事项</h4>
          <ul className="text-xs text-yellow-700 space-y-1">
            <li>• 请确保使用 {network} 网络进行转账</li>
            <li>• 使用其他网络可能导致资产丢失</li>
            <li>• 最小充值金额: 10 {coin}</li>
            <li>• 到账时间: 约 5-30 分钟</li>
          </ul>
        </div>

        {/* History */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">充值记录</h3>
            <button
              onClick={loadRecords}
              className="text-sm text-primary flex items-center gap-1"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              刷新
            </button>
          </div>
          {loading ? (
            <div className="text-center py-8 text-gray-400 text-sm">加载中...</div>
          ) : records.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">暂无充值记录</div>
          ) : (
            <div className="space-y-3">
              {records
                .filter((r) => r.coin === coin)
                .map((record) => (
                  <div
                    key={record.id}
                    className="border border-gray-100 rounded-lg p-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            +{record.amount} {record.coin}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${
                              record.status === 'completed'
                                ? 'bg-green-100 text-green-600'
                                : record.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-600'
                                : 'bg-red-100 text-red-600'
                            }`}
                          >
                            {record.status === 'completed'
                              ? '已完成'
                              : record.status === 'pending'
                              ? '处理中'
                              : '失败'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {record.network} • {record.time}
                        </p>
                      </div>
                    </div>
                    {record.txHash && (
                      <p className="text-xs text-gray-400 font-mono truncate">
                        TX: {record.txHash}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <QRCode
          address={address}
          coin={coin}
          network={network}
          onClose={() => setShowQR(false)}
        />
      )}
    </div>
  )
}

