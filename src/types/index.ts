export interface Asset {
  symbol: string
  name: string
  amount: number
  value: number
  price: number
  change24h: number
  icon?: string
}

export interface Account {
  type: 'funding' | 'trading' | 'earn'
  name: string
  balance: number
  icon: string
}

export interface OrderBookEntry {
  price: number
  amount: number
  total: number
}

export interface TradeOrder {
  type: 'buy' | 'sell'
  price: number
  amount: number
  total: number
  time: string
}

export interface SpotMarket {
  symbol: string
  name: string
  price: number
  change24h: number
  volume: number
  high24h: number
  low24h: number
}

export interface FuturesMarket {
  symbol: string
  name: string
  price: number
  change24h: number
  volume: number
  openInterest: number
  fundingRate: number
  leverage: string
  indexPrice: number
}

export interface OptionsMarket {
  symbol: string
  name: string
  strikePrice: number
  expiryDate: string
  premium: number
  change24h: number
  volume: number
  openInterest: number
  impliedVolatility: number
  type: 'call' | 'put'
}

