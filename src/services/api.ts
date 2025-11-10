import axios from 'axios'

export interface CryptoPrice {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  high_24h: number
  low_24h: number
}

export interface CryptoDetail extends CryptoPrice {
  description: { en: string }
  market_cap_rank: number
}

class CryptoAPI {
  private baseURL = 'https://api.coingecko.com/api/v3'
  private cache: { data: CryptoPrice[]; timestamp: number } | null = null
  private cacheDuration = 60000 // 缓存1分钟
  private lastRequestTime = 0
  private minRequestInterval = 2000 // 最小请求间隔2秒

  // 获取前100个加密货币的价格
  async getMarketData(currency: string = 'usd'): Promise<CryptoPrice[]> {
    // 检查缓存
    if (this.cache && Date.now() - this.cache.timestamp < this.cacheDuration) {
      return this.cache.data
    }

    // 限制请求频率
    const now = Date.now()
    if (now - this.lastRequestTime < this.minRequestInterval) {
      if (this.cache) {
        return this.cache.data
      }
      return this.getMockData()
    }

    try {
      this.lastRequestTime = now
      const response = await axios.get(`${this.baseURL}/coins/markets`, {
        params: {
          vs_currency: currency,
          order: 'market_cap_desc',
          per_page: 50, // 减少请求数据量
          page: 1,
          sparkline: false,
        },
        timeout: 5000, // 5秒超时
        headers: {
          'Accept': 'application/json',
        },
      })
      
      // 更新缓存
      this.cache = {
        data: response.data,
        timestamp: Date.now(),
      }
      
      return response.data
    } catch (error: any) {
      console.warn('API请求失败，使用模拟数据:', error.message)
      
      // 如果是429错误，使用缓存或模拟数据
      if (error.response?.status === 429 || error.code === 'ERR_NETWORK' || error.message?.includes('CORS')) {
        if (this.cache) {
          return this.cache.data
        }
        return this.getMockData()
      }
      
      // 其他错误也返回模拟数据
      return this.getMockData()
    }
  }

  // 获取单个加密货币详情
  async getCryptoDetail(id: string): Promise<CryptoDetail | null> {
    try {
      const response = await axios.get(`${this.baseURL}/coins/${id}`, {
        timeout: 5000,
      })
      return response.data
    } catch (error: any) {
      console.warn('Error fetching crypto detail:', error.message)
      // 从缓存或模拟数据中查找
      if (this.cache) {
        const found = this.cache.data.find((c) => c.id === id)
        if (found) {
          return found as CryptoDetail
        }
      }
      return null
    }
  }

  // 搜索加密货币
  async searchCrypto(query: string): Promise<CryptoPrice[]> {
    try {
      const allData = await this.getMarketData()
      return allData.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(query.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(query.toLowerCase())
      )
    } catch (error) {
      console.error('Error searching crypto:', error)
      return []
    }
  }

  // 模拟数据（当API不可用时使用）
  private getMockData(): CryptoPrice[] {
    // 生成更多模拟数据，包含价格波动
    const basePrices: Record<string, number> = {
      bitcoin: 103823.3,
      ethereum: 3527.46,
      dogecoin: 0.17835,
      solana: 162.83,
      ripple: 2.3148,
      'binancecoin': 620.5,
      'cardano': 0.5766,
      'chainlink': 15.848,
      'polygon': 0.95,
      'litecoin': 72.5,
    }

    const coins = [
      { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' },
      { id: 'ethereum', symbol: 'eth', name: 'Ethereum' },
      { id: 'binancecoin', symbol: 'bnb', name: 'BNB' },
      { id: 'solana', symbol: 'sol', name: 'Solana' },
      { id: 'ripple', symbol: 'xrp', name: 'XRP' },
      { id: 'cardano', symbol: 'ada', name: 'Cardano' },
      { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin' },
      { id: 'chainlink', symbol: 'link', name: 'Chainlink' },
      { id: 'polygon', symbol: 'matic', name: 'Polygon' },
      { id: 'litecoin', symbol: 'ltc', name: 'Litecoin' },
      { id: 'avalanche-2', symbol: 'avax', name: 'Avalanche' },
      { id: 'uniswap', symbol: 'uni', name: 'Uniswap' },
      { id: 'ethereum-classic', symbol: 'etc', name: 'Ethereum Classic' },
      { id: 'stellar', symbol: 'xlm', name: 'Stellar' },
      { id: 'filecoin', symbol: 'fil', name: 'Filecoin' },
    ]

    return coins.map((coin) => {
      const basePrice = basePrices[coin.id] || 100
      const variation = (Math.random() - 0.5) * 0.1 // ±5% 波动
      const currentPrice = basePrice * (1 + variation)
      const change24h = (Math.random() - 0.3) * 10 // -3% 到 +7%
      
      return {
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        image: `https://assets.coingecko.com/coins/images/${Math.floor(Math.random() * 1000)}/large/${coin.symbol}.png`,
        current_price: currentPrice,
        price_change_percentage_24h: change24h,
        market_cap: currentPrice * (1000000 + Math.random() * 5000000),
        total_volume: currentPrice * (100000 + Math.random() * 500000),
        high_24h: currentPrice * 1.05,
        low_24h: currentPrice * 0.95,
      }
    })
  }
}

export default new CryptoAPI()

