import { useState, useEffect } from 'react'
import { Eye, ChevronDown, ArrowDown, ArrowUp, ArrowLeftRight, FileText, TrendingUp, ArrowRight, Filter } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import cryptoAPI, { CryptoPrice } from '../services/api'
import { Asset, Account } from '../types'

export default function Assets() {
  const navigate = useNavigate()
  const [hideBalance, setHideBalance] = useState(false)
  const [currency, setCurrency] = useState('USD')
  const [totalAssets, setTotalAssets] = useState(3.06)
  const [todayProfit, setTodayProfit] = useState({ amount: 0.06, percent: 2.34 })
  const [accounts, setAccounts] = useState<Account[]>([
    { type: 'funding', name: '资金账户', balance: 0.42, icon: '💰' },
    { type: 'trading', name: '交易账户', balance: 2.63, icon: '🔄' },
    { type: 'earn', name: '赚币', balance: 0, icon: '🪙' },
  ])
  const [assets, setAssets] = useState<Asset[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showAccountDetail, setShowAccountDetail] = useState<string | null>(null)

  useEffect(() => {
    loadAssets()
  }, [])

  const loadAssets = async () => {
    try {
      const marketData = await cryptoAPI.getMarketData()
      const myAssets: Asset[] = [
        {
          symbol: 'DOGE',
          name: 'Dogecoin',
          amount: 14.77082239,
          value: 2.63,
          price: marketData.find((c) => c.symbol === 'doge')?.current_price || 0.178,
          change24h: -12.08,
          icon: '🐕',
        },
      ]
      setAssets(myAssets)
      const total = myAssets.reduce((sum, asset) => sum + asset.value, 0)
      setTotalAssets(total)
    } catch (error) {
      console.error('Failed to load assets:', error)
      // 使用默认数据
      const defaultAssets: Asset[] = [
        {
          symbol: 'DOGE',
          name: 'Dogecoin',
          amount: 14.77082239,
          value: 2.63,
          price: 0.178,
          change24h: -12.08,
          icon: '🐕',
        },
      ]
      setAssets(defaultAssets)
      setTotalAssets(2.63)
    }
  }

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-100 rounded" />
            <span className="text-base font-semibold">交易所</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gray-100 rounded" />
            <div className="relative">
              <div className="w-6 h-6 bg-gray-100 rounded" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                12
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-white">
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <span className="text-xs text-gray-500">🔍</span>
          <input
            type="text"
            placeholder="搜索币种"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm ml-2"
          />
          <button
            onClick={() => navigate('/trade?pair=FIL/USDT')}
            className="flex items-center gap-1 ml-2 cursor-pointer hover:opacity-80"
          >
            <span className="text-xs text-orange-500">🔥</span>
            <span className="text-xs text-gray-500">FIL 当前热搜</span>
          </button>
        </div>
      </div>

      {/* Asset Overview */}
      <div className="bg-white px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">总资产估值</span>
            <button onClick={() => setHideBalance(!hideBalance)}>
              <Eye className={`w-4 h-4 ${hideBalance ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {hideBalance ? '****' : `${totalAssets.toFixed(2)}`} {currency}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-primary">
                +${todayProfit.amount.toFixed(2)} (+{todayProfit.percent.toFixed(2)}%)
              </span>
              <span className="text-xs text-gray-500">今日收益</span>
              <ArrowRight className="w-3 h-3 text-gray-400" />
            </div>
          </div>
          <div className="w-16 h-12">
            <TrendingUp className="w-full h-full text-primary" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => navigate('/deposit')}
            className="flex-1 bg-primary text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <ArrowDown className="w-4 h-4" />
            <span>链上充币</span>
          </button>
          <button
            onClick={() => navigate('/c2c/buy')}
            className="flex-1 bg-primary text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span>C2C 买币</span>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-around py-4 border-t border-gray-100">
          {[
            { icon: ArrowDown, label: '充币', action: () => navigate('/deposit') },
            { icon: ArrowUp, label: '提币', action: () => navigate('/withdraw') },
            { icon: ArrowLeftRight, label: '划转', action: () => navigate('/transfer') },
            { icon: FileText, label: '账单', action: () => navigate('/bills') },
          ].map((action, idx) => {
            const Icon = action.icon
            return (
              <button
                key={idx}
                onClick={action.action}
                className="flex flex-col items-center active:opacity-70 transition-opacity"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs text-gray-600">{action.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Passive Income Card */}
      <div className="mx-4 mt-4 bg-gray-50 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xl">🍀</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium mb-1">闲置资金也能增值</div>
            <div className="text-xs text-gray-600">
              年化收益率可达 <span className="text-primary font-semibold">1%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Account Distribution */}
      <div className="mx-4 mt-4 bg-white rounded-xl">
        <button
          onClick={() => setShowAccountDetail(showAccountDetail ? null : 'all')}
          className="w-full flex items-center justify-between px-4 py-3 border-b border-gray-100"
        >
          <h3 className="text-base font-semibold">账户分布</h3>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${
              showAccountDetail ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div className="divide-y divide-gray-100">
          {accounts.map((account, idx) => (
            <button
              key={idx}
              onClick={() => setShowAccountDetail(showAccountDetail === account.type ? null : account.type)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">{account.icon}</span>
                </div>
                <span className="text-sm font-medium">{account.name}</span>
              </div>
              <span className="text-sm font-semibold">${account.balance.toFixed(2)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Assets List */}
      <div className="mx-4 mt-4 bg-white rounded-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h3 className="text-base font-semibold">资产</h3>
          <Filter className="w-4 h-4 text-gray-400" />
        </div>
        <div className="px-4 py-2">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>名称/数量</span>
            <span>价值/现货收益</span>
          </div>
          {assets
            .filter((asset) =>
              asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
              asset.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((asset, idx) => {
            const isPositive = asset.change24h >= 0
            return (
              <div
                key={idx}
                className="py-3 border-b border-gray-50 last:border-0 flex items-center justify-between"
                onClick={() => navigate(`/trade?pair=${asset.symbol}/USDT`)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-lg">{asset.icon}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{asset.symbol}</span>
                        <span className="text-xs text-primary">年化可达1%</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{asset.amount.toFixed(8)}</div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${asset.value.toFixed(2)}</div>
                  <div
                    className={`text-xs ${isPositive ? 'text-primary' : 'text-red-500'}`}
                  >
                    {isPositive ? '+' : ''}${Math.abs(asset.change24h).toFixed(2)} ({isPositive ? '+' : ''}
                    {asset.change24h.toFixed(2)}%)
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

