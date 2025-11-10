import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, TrendingUp, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import marketDataService from '../services/marketData'
import { SpotMarket, FuturesMarket, OptionsMarket } from '../types'

type MarketType = 'spot' | 'futures' | 'options' | 'favorites' | 'overview'

export default function Market() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [activeTab, setActiveTab] = useState('市场')
  const [subTab, setSubTab] = useState<'自选' | '现货' | '合约' | '期权' | '总览'>('现货')
  const [spotMarkets, setSpotMarkets] = useState<SpotMarket[]>([])
  const [futuresMarkets, setFuturesMarkets] = useState<FuturesMarket[]>([])
  const [optionsMarkets, setOptionsMarkets] = useState<OptionsMarket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMarketData()
    const interval = setInterval(loadMarketData, 60000)
    return () => clearInterval(interval)
  }, [])

  const loadMarketData = async () => {
    setLoading(true)
    try {
      const [spot, futures, options] = await Promise.all([
        marketDataService.getSpotMarkets(),
        marketDataService.getFuturesMarkets(),
        marketDataService.getOptionsMarkets(),
      ])
      setSpotMarkets(spot)
      setFuturesMarkets(futures)
      setOptionsMarkets(options)
    } catch (error) {
      console.error('Failed to load market data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleHotTrade = () => {
    navigate('/trade?pair=SOL/USDT')
  }

  const toggleFavorite = (symbol: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const favorites = marketDataService.getFavorites()
    if (favorites.includes(symbol)) {
      marketDataService.removeFavorite(symbol)
    } else {
      marketDataService.addFavorite(symbol)
    }
    loadMarketData() // 重新加载以更新显示
  }

  const getFavoritesData = () => {
    const favorites = marketDataService.getFavorites()
    if (subTab === '现货') {
      return spotMarkets.filter((m) => favorites.includes(m.symbol))
    } else if (subTab === '合约') {
      return futuresMarkets.filter((m) => favorites.includes(m.symbol))
    }
    return spotMarkets.filter((m) => favorites.includes(m.symbol))
  }

  const formatVolume = (volume: number) => {
    if (volume >= 100000000) {
      return `$${(volume / 100000000).toFixed(2)}亿`
    } else if (volume >= 10000) {
      return `$${(volume / 10000).toFixed(2)}万`
    }
    return `$${volume.toFixed(2)}`
  }

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return price.toLocaleString('en-US', { maximumFractionDigits: 1 })
    }
    return price.toFixed(4)
  }

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-4 py-3">
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

        {/* Tabs */}
        <div className="flex items-center border-b border-gray-100">
          <div className="flex items-center gap-1 px-4 py-2">
            <button
              className={`text-sm font-medium ${activeTab === '市场' ? 'text-primary border-b-2 border-primary pb-2' : 'text-gray-600'}`}
              onClick={() => setActiveTab('市场')}
            >
              市场
            </button>
            <button
              className={`text-sm font-medium ml-4 ${activeTab === '动态' ? 'text-primary border-b-2 border-primary pb-2' : 'text-gray-600'}`}
              onClick={() => setActiveTab('动态')}
            >
              动态
            </button>
          </div>
        </div>

        {/* Sub Tabs */}
        <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto">
          {(['自选', '现货', '合约', '期权', '总览'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSubTab(tab)}
              className={`text-xs px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                subTab === tab ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table Header - 根据类型显示不同列 */}
      <div className="bg-white px-4 py-2 border-b border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex-1">名称 / 成交额</div>
          {subTab === '合约' && <div className="w-20 text-right">资金费率</div>}
          {subTab === '期权' && <div className="w-20 text-right">行权价</div>}
          <div className="w-24 text-right">最新价</div>
          <div className="w-20 text-right">今日涨跌</div>
        </div>
      </div>

      {/* Market List */}
      <div className="bg-white">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* 自选 */}
            {subTab === '自选' && (
              <>
                {getFavoritesData().length === 0 ? (
                  <div className="text-center py-20 text-gray-400 text-sm">
                    暂无自选，点击⭐添加
                  </div>
                ) : (
                  getFavoritesData()
                    .filter((item) =>
                      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      item.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((item) => {
                      const isPositive = item.change24h >= 0
                      const favorites = marketDataService.getFavorites()
                      const isFavorite = favorites.includes(item.symbol)
                      return (
                        <div
                          key={item.symbol}
                          className="px-4 py-3 border-b border-gray-50 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100"
                          onClick={() => navigate(`/trade?pair=${item.symbol}/USDT`)}
                        >
                          <div className="flex-1 flex items-center gap-3">
                            <button
                              onClick={(e) => toggleFavorite(item.symbol, e)}
                              className="flex-shrink-0"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            </button>
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-primary font-bold text-xs">
                                {item.symbol.slice(0, 2)}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">
                                  {item.symbol} / USDT
                                </span>
                                <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                                  现货
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                {formatVolume(item.volume)}
                              </div>
                            </div>
                          </div>
                          <div className="w-24 text-right">
                            <div className="font-semibold text-sm">{formatPrice(item.price)}</div>
                            <div className="text-xs text-gray-500">${formatPrice(item.price)}</div>
                          </div>
                          <div className="w-20 text-right">
                            <div
                              className={`text-sm font-medium px-2 py-1 rounded inline-block ${
                                isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                              }`}
                            >
                              {isPositive ? '+' : ''}
                              {item.change24h.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      )
                    })
                )}
              </>
            )}

            {/* 现货 */}
            {subTab === '现货' && (
              <>
                {spotMarkets
                  .filter((item) =>
                    item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((item) => {
                    const isPositive = item.change24h >= 0
                    const favorites = marketDataService.getFavorites()
                    const isFavorite = favorites.includes(item.symbol)
                    return (
                      <div
                        key={item.symbol}
                        className="px-4 py-3 border-b border-gray-50 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100"
                        onClick={() => navigate(`/trade?pair=${item.symbol}/USDT&type=spot`)}
                      >
                        <div className="flex-1 flex items-center gap-3">
                          <button
                            onClick={(e) => toggleFavorite(item.symbol, e)}
                            className="flex-shrink-0"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          </button>
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-primary font-bold text-xs">
                              {item.symbol.slice(0, 2)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">
                                {item.symbol} / USDT
                              </span>
                              <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">
                                现货
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {formatVolume(item.volume)}
                            </div>
                          </div>
                        </div>
                        <div className="w-24 text-right">
                          <div className="font-semibold text-sm">{formatPrice(item.price)}</div>
                          <div className="text-xs text-gray-500">${formatPrice(item.price)}</div>
                        </div>
                        <div className="w-20 text-right">
                          <div
                            className={`text-sm font-medium px-2 py-1 rounded inline-block ${
                              isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                            }`}
                          >
                            {isPositive ? '+' : ''}
                            {item.change24h.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </>
            )}

            {/* 合约 */}
            {subTab === '合约' && (
              <>
                {futuresMarkets
                  .filter((item) =>
                    item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((item) => {
                    const isPositive = item.change24h >= 0
                    const favorites = marketDataService.getFavorites()
                    const isFavorite = favorites.includes(item.symbol)
                    return (
                      <div
                        key={item.symbol}
                        className="px-4 py-3 border-b border-gray-50 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100"
                        onClick={() => navigate(`/trade?pair=${item.symbol}/USDT&type=futures`)}
                      >
                        <div className="flex-1 flex items-center gap-3">
                          <button
                            onClick={(e) => toggleFavorite(item.symbol, e)}
                            className="flex-shrink-0"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          </button>
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-primary font-bold text-xs">
                              {item.symbol.slice(0, 2)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">
                                {item.symbol} / USDT
                              </span>
                              <span className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">
                                {item.leverage}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {formatVolume(item.volume)} • 持仓 {formatVolume(item.openInterest)}
                            </div>
                          </div>
                        </div>
                        <div className="w-20 text-right">
                          <div className={`text-xs font-medium ${
                            item.fundingRate >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {item.fundingRate >= 0 ? '+' : ''}
                            {(item.fundingRate * 100).toFixed(4)}%
                          </div>
                          <div className="text-xs text-gray-400">费率</div>
                        </div>
                        <div className="w-24 text-right">
                          <div className="font-semibold text-sm">{formatPrice(item.price)}</div>
                          <div className="text-xs text-gray-500">指数 {formatPrice(item.indexPrice)}</div>
                        </div>
                        <div className="w-20 text-right">
                          <div
                            className={`text-sm font-medium px-2 py-1 rounded inline-block ${
                              isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                            }`}
                          >
                            {isPositive ? '+' : ''}
                            {item.change24h.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </>
            )}

            {/* 期权 */}
            {subTab === '期权' && (
              <>
                {optionsMarkets
                  .filter((item) =>
                    item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((item, idx) => {
                    const isPositive = item.change24h >= 0
                    const daysToExpiry = Math.ceil(
                      (new Date(item.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                    )
                    return (
                      <div
                        key={`${item.symbol}-${item.strikePrice}-${idx}`}
                        className="px-4 py-3 border-b border-gray-50 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100"
                        onClick={() => navigate(`/trade?pair=${item.symbol}/USDT&type=options`)}
                      >
                        <div className="flex-1 flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-primary font-bold text-xs">
                              {item.symbol.slice(0, 2)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">
                                {item.symbol} {item.type === 'call' ? '看涨' : '看跌'}
                              </span>
                              <span className={`text-xs px-1.5 py-0.5 rounded ${
                                item.type === 'call' 
                                  ? 'bg-green-100 text-green-600' 
                                  : 'bg-red-100 text-red-600'
                              }`}>
                                {item.type === 'call' ? 'C' : 'P'}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {formatVolume(item.volume)} • {daysToExpiry}天到期
                            </div>
                          </div>
                        </div>
                        <div className="w-20 text-right">
                          <div className="text-xs font-medium">{formatPrice(item.strikePrice)}</div>
                          <div className="text-xs text-gray-400">行权价</div>
                        </div>
                        <div className="w-24 text-right">
                          <div className="font-semibold text-sm">{formatPrice(item.premium)}</div>
                          <div className="text-xs text-gray-500">权利金</div>
                        </div>
                        <div className="w-20 text-right">
                          <div
                            className={`text-sm font-medium px-2 py-1 rounded inline-block ${
                              isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                            }`}
                          >
                            {isPositive ? '+' : ''}
                            {item.change24h.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </>
            )}

            {/* 总览 */}
            {subTab === '总览' && (
              <div className="px-4 py-4 space-y-4">
                {/* 现货概览 */}
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-gray-700">现货市场</h3>
                  <div className="space-y-2">
                    {spotMarkets.slice(0, 3)
                      .filter((item) =>
                        item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((item) => {
                        const isPositive = item.change24h >= 0
                        return (
                          <div
                            key={item.symbol}
                            className="px-3 py-2 bg-gray-50 rounded-lg flex items-center justify-between"
                            onClick={() => navigate(`/trade?pair=${item.symbol}/USDT&type=spot`)}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{item.symbol}</span>
                              <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">
                                现货
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-semibold">{formatPrice(item.price)}</span>
                              <span
                                className={`text-xs px-2 py-0.5 rounded ${
                                  isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                }`}
                              >
                                {isPositive ? '+' : ''}
                                {item.change24h.toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>

                {/* 合约概览 */}
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-gray-700">合约市场</h3>
                  <div className="space-y-2">
                    {futuresMarkets.slice(0, 3)
                      .filter((item) =>
                        item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((item) => {
                        const isPositive = item.change24h >= 0
                        return (
                          <div
                            key={item.symbol}
                            className="px-3 py-2 bg-gray-50 rounded-lg flex items-center justify-between"
                            onClick={() => navigate(`/trade?pair=${item.symbol}/USDT&type=futures`)}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{item.symbol}</span>
                              <span className="text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">
                                {item.leverage}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-semibold">{formatPrice(item.price)}</span>
                              <span
                                className={`text-xs px-2 py-0.5 rounded ${
                                  isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                }`}
                              >
                                {isPositive ? '+' : ''}
                                {item.change24h.toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>

                {/* 期权概览 */}
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-gray-700">期权市场</h3>
                  <div className="space-y-2">
                    {optionsMarkets.slice(0, 3)
                      .filter((item) =>
                        item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((item, idx) => {
                        const isPositive = item.change24h >= 0
                        return (
                          <div
                            key={`${item.symbol}-${idx}`}
                            className="px-3 py-2 bg-gray-50 rounded-lg flex items-center justify-between"
                            onClick={() => navigate(`/trade?pair=${item.symbol}/USDT&type=options`)}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{item.symbol}</span>
                              <span className={`text-xs px-1.5 py-0.5 rounded ${
                                item.type === 'call' 
                                  ? 'bg-green-100 text-green-600' 
                                  : 'bg-red-100 text-red-600'
                              }`}>
                                {item.type === 'call' ? '看涨' : '看跌'}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-semibold">{formatPrice(item.premium)}</span>
                              <span
                                className={`text-xs px-2 py-0.5 rounded ${
                                  isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                }`}
                              >
                                {isPositive ? '+' : ''}
                                {item.change24h.toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

