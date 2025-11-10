// 应用数据API服务
export interface App {
  id: string
  name: string
  category: 'gamefi' | 'defi' | 'nft' | 'exchange'
  icon: string
  description: string
  users: number
  volume?: number
  change24h?: number
  url: string
  website?: string
}

class AppsAPI {
  // 模拟实时数据更新
  private generateRandomChange = (base: number) => {
    return base + (Math.random() - 0.5) * 5
  }

  // 获取链上飙升应用
  async getTrendingApps(): Promise<App[]> {
    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 300))

    const baseApps: App[] = [
      {
        id: '1',
        name: 'Axie Infinity',
        category: 'gamefi',
        icon: '🎮',
        description: 'Play-to-Earn 游戏',
        users: 2500000,
        volume: 12500000,
        change24h: this.generateRandomChange(15.6),
        url: 'https://axieinfinity.com',
        website: 'axieinfinity.com',
      },
      {
        id: '2',
        name: 'Uniswap',
        category: 'defi',
        icon: '🦄',
        description: '去中心化交易所',
        users: 5000000,
        volume: 500000000,
        change24h: this.generateRandomChange(8.3),
        url: 'https://app.uniswap.org',
        website: 'uniswap.org',
      },
      {
        id: '3',
        name: 'OpenSea',
        category: 'nft',
        icon: '🌊',
        description: 'NFT 交易市场',
        users: 1800000,
        volume: 25000000,
        change24h: this.generateRandomChange(12.4),
        url: 'https://opensea.io',
        website: 'opensea.io',
      },
      {
        id: '4',
        name: 'PancakeSwap',
        category: 'exchange',
        icon: '🥞',
        description: 'DEX 交易平台',
        users: 3200000,
        volume: 180000000,
        change24h: this.generateRandomChange(6.7),
        url: 'https://pancakeswap.finance',
        website: 'pancakeswap.finance',
      },
    ]

    return baseApps.sort((a, b) => (b.change24h || 0) - (a.change24h || 0))
  }

  // 获取热门游戏
  async getHotGames(): Promise<App[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    return [
      {
        id: 'g1',
        name: 'The Sandbox',
        category: 'gamefi',
        icon: '🏗️',
        description: '虚拟世界建造',
        users: 1200000,
        change24h: this.generateRandomChange(22.5),
        url: 'https://www.sandbox.game',
        website: 'sandbox.game',
      },
      {
        id: 'g2',
        name: 'Decentraland',
        category: 'gamefi',
        icon: '🌐',
        description: '元宇宙平台',
        users: 800000,
        change24h: this.generateRandomChange(18.9),
        url: 'https://decentraland.org',
        website: 'decentraland.org',
      },
      {
        id: 'g3',
        name: 'Stepn',
        category: 'gamefi',
        icon: '👟',
        description: 'Move-to-Earn',
        users: 1500000,
        change24h: this.generateRandomChange(14.2),
        url: 'https://stepn.com',
        website: 'stepn.com',
      },
    ]
  }

  // 获取NFT排行
  async getNFTRanking(): Promise<App[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    return [
      {
        id: 'n1',
        name: 'Bored Ape Yacht Club',
        category: 'nft',
        icon: '🐵',
        description: '蓝筹 NFT 项目',
        users: 10000,
        volume: 5000000,
        change24h: this.generateRandomChange(5.8),
        url: 'https://boredapeyachtclub.com',
        website: 'boredapeyachtclub.com',
      },
      {
        id: 'n2',
        name: 'CryptoPunks',
        category: 'nft',
        icon: '👾',
        description: 'OG NFT 收藏',
        users: 3500,
        volume: 8000000,
        change24h: this.generateRandomChange(3.2),
        url: 'https://www.larvalabs.com/cryptopunks',
        website: 'larvalabs.com',
      },
      {
        id: 'n3',
        name: 'Azuki',
        category: 'nft',
        icon: '🎨',
        description: '日系风格 NFT',
        users: 15000,
        volume: 3200000,
        change24h: this.generateRandomChange(9.1),
        url: 'https://www.azuki.com',
        website: 'azuki.com',
      },
    ]
  }

  // 获取分类应用
  async getCategoryApps(category: string): Promise<App[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const apps: Record<string, App[]> = {
      gamefi: [
        {
          id: 'gf1',
          name: 'Axie Infinity',
          category: 'gamefi',
          icon: '🎮',
          description: 'Play-to-Earn',
          users: 2500000,
          url: 'https://axieinfinity.com',
          website: 'axieinfinity.com',
        },
        {
          id: 'gf2',
          name: 'The Sandbox',
          category: 'gamefi',
          icon: '🏗️',
          description: '虚拟世界',
          users: 1200000,
          url: 'https://www.sandbox.game',
          website: 'sandbox.game',
        },
        {
          id: 'gf3',
          name: 'Illuvium',
          category: 'gamefi',
          icon: '⚔️',
          description: 'RPG 游戏',
          users: 800000,
          url: 'https://illuvium.io',
          website: 'illuvium.io',
        },
      ],
      defi: [
        {
          id: 'df1',
          name: 'Uniswap',
          category: 'defi',
          icon: '🦄',
          description: 'DEX',
          users: 5000000,
          url: 'https://app.uniswap.org',
          website: 'uniswap.org',
        },
        {
          id: 'df2',
          name: 'Aave',
          category: 'defi',
          icon: '💰',
          description: '借贷协议',
          users: 3200000,
          url: 'https://app.aave.com',
          website: 'aave.com',
        },
        {
          id: 'df3',
          name: 'Compound',
          category: 'defi',
          icon: '🏦',
          description: '流动性挖矿',
          users: 2800000,
          url: 'https://app.compound.finance',
          website: 'compound.finance',
        },
      ],
      nft: [
        {
          id: 'nf1',
          name: 'OpenSea',
          category: 'nft',
          icon: '🌊',
          description: 'NFT 市场',
          users: 1800000,
          url: 'https://opensea.io',
          website: 'opensea.io',
        },
        {
          id: 'nf2',
          name: 'Blur',
          category: 'nft',
          icon: '💎',
          description: '专业交易',
          users: 900000,
          url: 'https://blur.io',
          website: 'blur.io',
        },
        {
          id: 'nf3',
          name: 'LooksRare',
          category: 'nft',
          icon: '👁️',
          description: '社区驱动',
          users: 600000,
          url: 'https://looksrare.org',
          website: 'looksrare.org',
        },
      ],
      exchange: [
        {
          id: 'ex1',
          name: 'PancakeSwap',
          category: 'exchange',
          icon: '🥞',
          description: 'BSC DEX',
          users: 3200000,
          url: 'https://pancakeswap.finance',
          website: 'pancakeswap.finance',
        },
        {
          id: 'ex2',
          name: 'SushiSwap',
          category: 'exchange',
          icon: '🍣',
          description: '多链 DEX',
          users: 2100000,
          url: 'https://www.sushi.com',
          website: 'sushi.com',
        },
        {
          id: 'ex3',
          name: 'Curve',
          category: 'exchange',
          icon: '📈',
          description: '稳定币交易',
          users: 1500000,
          url: 'https://curve.fi',
          website: 'curve.fi',
        },
      ],
    }

    return apps[category] || []
  }
}

export default new AppsAPI()

