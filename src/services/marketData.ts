import { SpotMarket, FuturesMarket, OptionsMarket } from '../types'
import cryptoAPI, { CryptoPrice } from './api'

class MarketDataService {
  // 获取现货市场数据
  async getSpotMarkets(): Promise<SpotMarket[]> {
    const data = await cryptoAPI.getMarketData()
    return data.map((coin) => ({
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      price: coin.current_price,
      change24h: coin.price_change_percentage_24h,
      volume: coin.total_volume,
      high24h: coin.high_24h,
      low24h: coin.low_24h,
    }))
  }

  // 获取合约市场数据
  async getFuturesMarkets(): Promise<FuturesMarket[]> {
    const data = await cryptoAPI.getMarketData()
    return data.map((coin) => {
      const basePrice = coin.current_price
      // 合约价格通常与现货有轻微差异
      const futuresPrice = basePrice * (1 + (Math.random() - 0.5) * 0.002)
      const fundingRate = (Math.random() - 0.5) * 0.1 // -0.05% 到 +0.05%
      
      return {
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        price: futuresPrice,
        change24h: coin.price_change_percentage_24h + (Math.random() - 0.5) * 2,
        volume: coin.total_volume * (1.5 + Math.random()), // 合约交易量通常更大
        openInterest: coin.market_cap * (0.1 + Math.random() * 0.2),
        fundingRate: fundingRate,
        leverage: ['10x', '20x', '50x', '100x'][Math.floor(Math.random() * 4)],
        indexPrice: basePrice,
      }
    })
  }

  // 获取期权市场数据
  async getOptionsMarkets(): Promise<OptionsMarket[]> {
    const data = await cryptoAPI.getMarketData()
    const options: OptionsMarket[] = []
    
    // 为每个币种生成多个期权合约
    data.slice(0, 10).forEach((coin) => {
      const basePrice = coin.current_price
      const strikes = [
        basePrice * 0.9,
        basePrice * 0.95,
        basePrice,
        basePrice * 1.05,
        basePrice * 1.1,
      ]
      
      strikes.forEach((strike, idx) => {
        const daysToExpiry = [7, 14, 30, 60, 90][Math.floor(Math.random() * 5)]
        const expiryDate = new Date()
        expiryDate.setDate(expiryDate.getDate() + daysToExpiry)
        
        options.push({
          symbol: coin.symbol.toUpperCase(),
          name: coin.name,
          strikePrice: strike,
          expiryDate: expiryDate.toISOString().split('T')[0],
          premium: Math.abs(basePrice - strike) * 0.1 + Math.random() * basePrice * 0.05,
          change24h: (Math.random() - 0.5) * 20,
          volume: coin.total_volume * 0.1 * Math.random(),
          openInterest: coin.market_cap * 0.01 * Math.random(),
          impliedVolatility: 30 + Math.random() * 50,
          type: idx < 2 ? 'put' : 'call',
        })
      })
    })
    
    return options
  }

  // 获取自选列表（从localStorage）
  getFavorites(): string[] {
    const stored = localStorage.getItem('favorite_coins')
    return stored ? JSON.parse(stored) : ['BTC', 'ETH', 'SOL']
  }

  // 添加自选
  addFavorite(symbol: string) {
    const favorites = this.getFavorites()
    if (!favorites.includes(symbol)) {
      favorites.push(symbol)
      localStorage.setItem('favorite_coins', JSON.stringify(favorites))
    }
  }

  // 移除自选
  removeFavorite(symbol: string) {
    const favorites = this.getFavorites()
    const filtered = favorites.filter((f) => f !== symbol)
    localStorage.setItem('favorite_coins', JSON.stringify(filtered))
  }
}

export default new MarketDataService()

