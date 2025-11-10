import { useState, useEffect } from 'react'
import { Search, TrendingUp, Gamepad2, Coins, Image as ImageIcon, ArrowRight, Flame, Trophy, Star, RefreshCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import appsAPI, { App } from '../services/appsApi'

export default function Discover() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<'all' | 'gamefi' | 'defi' | 'nft' | 'exchange'>('all')
  const [trendingApps, setTrendingApps] = useState<App[]>([])
  const [hotGames, setHotGames] = useState<App[]>([])
  const [nftRanking, setNftRanking] = useState<App[]>([])
  const [categoryApps, setCategoryApps] = useState<App[]>([])
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // 加载数据
  const loadData = async () => {
    setLoading(true)
    try {
      const [trending, games, nfts, category] = await Promise.all([
        appsAPI.getTrendingApps(),
        appsAPI.getHotGames(),
        appsAPI.getNFTRanking(),
        activeCategory !== 'all' ? appsAPI.getCategoryApps(activeCategory) : Promise.resolve([]),
      ])
      setTrendingApps(trending)
      setHotGames(games)
      setNftRanking(nfts)
      setCategoryApps(category)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Failed to load apps data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
    // 每60秒自动刷新，避免API限制
    const interval = setInterval(loadData, 60000)
    return () => clearInterval(interval)
  }, [activeCategory])

  // 处理应用点击跳转
  const handleAppClick = (app: App) => {
    if (app.url) {
      window.open(app.url, '_blank', 'noopener,noreferrer')
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'gamefi':
        return <Gamepad2 className="w-5 h-5" />
      case 'defi':
        return <Coins className="w-5 h-5" />
      case 'nft':
        return <ImageIcon className="w-5 h-5" />
      case 'exchange':
        return <TrendingUp className="w-5 h-5" />
      default:
        return <Star className="w-5 h-5" />
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'gamefi':
        return 'GameFi'
      case 'defi':
        return 'DeFi'
      case 'nft':
        return 'NFT'
      case 'exchange':
        return 'Exchange'
      default:
        return category
    }
  }

  const filteredTrending = trendingApps.filter(
    (app) =>
      (activeCategory === 'all' || app.category === activeCategory) &&
      (app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const filteredHotGames = hotGames.filter(
    (game) =>
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredNftRanking = nftRanking.filter(
    (nft) =>
      nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredCategoryApps = categoryApps.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">探索</h2>
          <button
            onClick={loadData}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="刷新数据"
          >
            <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        {lastUpdate && (
          <p className="text-xs text-gray-400 mt-1">
            最后更新: {lastUpdate.toLocaleTimeString('zh-CN')}
          </p>
        )}
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-white">
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="搜索应用、游戏、NFT..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex gap-2 overflow-x-auto">
          {['all', 'gamefi', 'defi', 'nft', 'exchange'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium ${
                activeCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {cat !== 'all' && getCategoryIcon(cat)}
              <span>{cat === 'all' ? '全部' : getCategoryName(cat)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 链上飙升应用 */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <h3 className="text-base font-semibold">链上飙升</h3>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </div>
        <div className="space-y-2">
          {loading && filteredTrending.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">加载中...</div>
          ) : filteredTrending.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">暂无数据</div>
          ) : (
            filteredTrending.map((app) => (
              <div
                key={app.id}
                onClick={() => handleAppClick(app)}
                className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl">
                    {app.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{app.name}</span>
                      {app.change24h && (
                        <span className="text-xs text-primary font-medium">
                          +{app.change24h.toFixed(1)}%
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{app.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-gray-400">
                        {app.users >= 1000000
                          ? `${(app.users / 1000000).toFixed(1)}M`
                          : `${(app.users / 1000).toFixed(0)}K`}{' '}
                        用户
                      </p>
                      {app.website && (
                        <span className="text-xs text-gray-400">• {app.website}</span>
                      )}
                    </div>
                  </div>
                </div>
                <button className="text-primary">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 热门游戏 */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-primary" />
            <h3 className="text-base font-semibold">热门游戏</h3>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {filteredHotGames.map((game) => (
            <div
              key={game.id}
              onClick={() => handleAppClick(game)}
              className="bg-white rounded-xl p-4 border border-gray-100 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{game.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{game.name}</div>
                  {game.change24h && (
                    <span className="text-xs text-primary">
                      +{game.change24h.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-2">{game.description}</p>
              <p className="text-xs text-gray-400">
                {(game.users / 1000000).toFixed(1)}M 用户
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* NFT 排行 */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h3 className="text-base font-semibold">NFT 排行</h3>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </div>
        <div className="space-y-2">
          {filteredNftRanking.map((nft, index) => (
            <div
              key={nft.id}
              onClick={() => handleAppClick(nft)}
              className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center font-bold text-primary">
                {index + 1}
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl">
                {nft.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{nft.name}</span>
                  {nft.change24h && (
                    <span className="text-xs text-primary font-medium">
                      +{nft.change24h.toFixed(1)}%
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{nft.description}</p>
                {nft.volume && (
                  <p className="text-xs text-gray-400 mt-1">
                    24h 交易量: ${(nft.volume / 1000000).toFixed(1)}M
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 分类应用 */}
      {activeCategory !== 'all' && (
        <div className="px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            {getCategoryIcon(activeCategory)}
            <h3 className="text-base font-semibold">{getCategoryName(activeCategory)} 应用</h3>
          </div>
          {loading && filteredCategoryApps.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">加载中...</div>
          ) : filteredCategoryApps.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">暂无应用</div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredCategoryApps.map((app) => (
                <div
                  key={app.id}
                  onClick={() => handleAppClick(app)}
                  className="bg-white rounded-xl p-4 border border-gray-100 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{app.icon}</span>
                    <div className="font-semibold text-sm">{app.name}</div>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{app.description}</p>
                  <p className="text-xs text-gray-400">
                    {(app.users / 1000000).toFixed(1)}M 用户
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

