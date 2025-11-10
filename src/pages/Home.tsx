import { useState, useEffect } from 'react'
import { Search, Gift, MessageCircle, X, TrendingUp, Infinity, Coins, Bot, Eye, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import cryptoAPI, { CryptoPrice } from '../services/api'

export default function Home() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showBanner, setShowBanner] = useState(true)
  const [earnData] = useState({
    yesterdayEarnings: 0,
    earnAssets: 0,
    totalEarnings: 0,
  })
  const [featuredCoins, setFeaturedCoins] = useState<CryptoPrice[]>([])

  useEffect(() => {
    // 获取特色币种
    cryptoAPI.getMarketData().then((data) => {
      setFeaturedCoins(data.slice(0, 2))
    }).catch((error) => {
      console.error('Failed to load featured coins:', error)
      // 使用空数组作为后备
      setFeaturedCoins([])
    })
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/market?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleHotTrade = () => {
    navigate('/trade?pair=SOL/USDT')
  }

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-0.5">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-black rounded-sm" />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">交易所</span>
          <span className="text-xs">▼</span>
        </div>
        <div className="flex items-center gap-3">
          <Gift className="w-5 h-5 text-gray-600" />
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              12
            </span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-white">
        <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="搜索币种"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <button
            type="button"
            onClick={handleHotTrade}
            className="flex items-center gap-1 ml-2 cursor-pointer hover:opacity-80"
          >
            <TrendingUp className="w-3 h-3 text-orange-500" />
            <span className="text-xs text-gray-500">SOL 热门交易</span>
          </button>
        </form>
      </div>

      {/* Promotional Banner */}
      {showBanner && (
        <div className="mx-4 mb-4 bg-gradient-to-r from-primary to-primary-dark rounded-xl p-4 relative overflow-hidden">
          <button
            onClick={() => setShowBanner(false)}
            className="absolute top-2 right-2 text-white/80 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="text-white">
            <h3 className="text-lg font-semibold mb-1">全天候智能交易, 轻松躺盈</h3>
            <p className="text-sm text-white/90 mb-3">
              一键开启智能交易, 赚取高达 17.74% 年化收益。
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs">天地网格</span>
                <div className="flex -space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 bg-white/20 rounded-full border border-white/30"
                    />
                  ))}
                </div>
                <span className="text-xs">97,533</span>
              </div>
            </div>
          </div>
          <div className="absolute right-4 top-4 opacity-20">
            <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
              <Bot className="w-12 h-12 text-primary" />
            </div>
          </div>
        </div>
      )}

      {/* Feature Icons */}
      <div className="flex justify-around px-4 py-4 bg-white">
        {[
          { icon: Gift, label: '简单赚币', active: false, action: () => navigate('/assets') },
          { icon: Infinity, label: '链上赚币', active: true, action: () => navigate('/assets') },
          { icon: Coins, label: '借贷', active: false, action: () => navigate('/lending') },
          { icon: Bot, label: '策略交易', active: false, action: () => navigate('/strategy') },
        ].map((feature, index) => {
          const Icon = feature.icon
          return (
            <button
              key={index}
              onClick={feature.action}
              className="flex flex-col items-center cursor-pointer active:opacity-70"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  feature.active ? 'bg-primary/10' : 'bg-gray-100'
                }`}
              >
                <Icon className={`w-6 h-6 ${feature.active ? 'text-primary' : 'text-gray-600'}`} />
              </div>
              <span className="text-xs text-gray-600">{feature.label}</span>
              {feature.active && (
                <div className="w-8 h-0.5 bg-primary mt-1 rounded-full" />
              )}
            </button>
          )
        })}
      </div>

      {/* Earn Crypto Section */}
      <div
        className="mx-4 mt-4 bg-white rounded-xl p-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100"
        onClick={() => navigate('/assets')}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">赚币</h3>
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">昨日收益</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{earnData.yesterdayEarnings.toFixed(2)} USD</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">赚币资产</span>
            <span className="text-base font-medium">{earnData.earnAssets.toFixed(2)} USD</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">总收益</span>
            <span className="text-base font-medium">{earnData.totalEarnings.toFixed(2)} USD</span>
          </div>
        </div>
      </div>

      {/* Featured Coins */}
      <div className="mx-4 mt-4 grid grid-cols-2 gap-3">
        {featuredCoins.map((coin) => (
          <div
            key={coin.id}
            className="bg-white rounded-xl p-4 flex items-center justify-between"
            onClick={() => navigate(`/market?coin=${coin.id}`)}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-sm">{coin.symbol.toUpperCase().slice(0, 1)}</span>
              </div>
              <div>
                <div className="font-medium">{coin.symbol.toUpperCase()}</div>
                {coin.symbol === 'doge' && (
                  <div className="text-xs text-primary">1% 年化</div>
                )}
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  )
}

