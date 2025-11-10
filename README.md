# 🚀 加密货币交易所应用

> 一个功能完整的加密货币交易所 Web 应用，复刻欧易（OKX）的核心功能和用户体验。支持现货交易、合约交易、期权交易、C2C 交易等多种交易方式，提供实时行情、资产管理、策略交易等完整功能。

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC.svg)](https://tailwindcss.com/)

---

## 📋 目录

- [功能特性](#-功能特性)
- [技术栈](#-技术栈)
- [项目结构](#-项目结构)
- [快速开始](#-快速开始)
- [部署指南](#-部署指南)
- [功能详解](#-功能详解)
- [API 说明](#-api-说明)
- [开发指南](#-开发指南)
- [常见问题](#-常见问题)

---

## ✨ 功能特性

### 🏠 首页 (Home)
- **实时行情展示**：显示热门加密货币价格和涨跌幅
- **搜索功能**：快速搜索币种，支持跳转到市场页面
- **功能入口**：简单赚币、链上赚币、借贷、策略交易
- **赚币概览**：昨日收益、赚币资产、总收益统计
- **推广横幅**：支持活动推广和重要公告
- **热门交易**：快速跳转到热门交易对

### 📊 市场页面 (Market)
- **多市场类型**：
  - **自选**：用户自定义收藏的交易对，支持星标管理
  - **现货**：现货交易市场，显示实时价格和交易量
  - **合约**：永续合约市场，显示杠杆倍数、资金费率、持仓量
  - **期权**：期权交易市场，显示行权价、权利金、到期时间
  - **总览**：汇总展示各市场类型的热门交易对
- **实时数据更新**：每 60 秒自动刷新市场数据
- **搜索过滤**：支持按币种名称或符号搜索
- **数据展示**：价格、涨跌幅、交易量、持仓量等关键指标

### 💹 交易页面 (Trade)
- **交易对选择**：支持多种加密货币交易对
- **价格图表**：K 线图展示，支持多时间周期（15分、1时、4时、1日）
- **订单簿**：实时买卖盘深度，支持点击填充价格
- **交易功能**：
  - 买入/卖出切换
  - 市价/限价委托
  - 金额输入和百分比快速选择（25%、50%、75%、100%）
  - 杠杆交易开关
  - 止盈/止损设置
- **订单确认**：交易前确认对话框，显示交易详情
- **快捷导航**：委托、资产、策略快速入口

### 💰 资产页面 (Assets)
- **资产总览**：
  - 总资产显示（支持隐藏/显示）
  - 今日盈亏统计
  - 币种切换（USD/CNY）
- **账户分布**：
  - 资金账户
  - 交易账户
  - 赚币账户
- **资产列表**：详细显示持有的加密货币
  - 币种名称和数量
  - 资产价值和收益
  - 24 小时涨跌幅
- **快捷操作**：
  - 链上充币
  - C2C 买币
  - 充币、提币、划转、账单
- **搜索功能**：快速查找资产

### 🔍 探索页面 (Discover)
- **链上飙升应用**：实时展示热门 DApp，包含用户数、交易量、24h 涨幅
- **热门游戏**：GameFi 游戏推荐，显示用户数和涨幅
- **NFT 排行**：NFT 项目排行榜，显示交易量和排名
- **分类浏览**：
  - GameFi：区块链游戏
  - DeFi：去中心化金融
  - NFT：非同质化代币
  - Exchange：去中心化交易所
- **实时更新**：每 60 秒自动刷新数据
- **外部链接**：点击应用跳转到官方网站
- **搜索过滤**：支持按名称、描述搜索

### 💵 C2C 交易
- **C2C 买币**：
  - 币种选择（USDT、BTC、ETH）
  - 金额输入和快捷选择
  - 支付方式筛选（支付宝、微信、银行卡）
  - 商家列表展示（评分、成交量、价格、限额）
  - 排序功能（价格、成交量、评分）
- **订单管理**：
  - 订单详情查看
  - 15 分钟倒计时
  - 付款信息展示
  - 订单状态跟踪（待付款、已付款、已完成、已取消）
- **交易记录**：
  - 买入/卖出记录
  - 状态筛选
  - 搜索功能
  - 订单详情查看

### 💳 充币/提币
- **充币功能**：
  - 币种选择（USDT、BTC、ETH）
  - 网络选择（TRC20、ERC20、BEP20）
  - 地址生成和二维码显示
  - 一键复制地址
  - 充值记录查看
  - 安全提示
- **提币功能**：
  - 币种和网络选择
  - 提币地址输入
  - 提币金额和手续费
  - 提币记录

### 🔄 其他功能
- **划转**：账户间资产划转
- **账单**：交易记录和资金流水
- **订单管理**：委托订单和历史订单
- **策略交易**：创建和管理交易策略
- **借贷**：加密货币借贷功能

---

## 🛠 技术栈

### 核心框架
- **React 18.2** - 用户界面框架
- **TypeScript 5.3** - 类型安全的 JavaScript
- **Vite 5.0** - 快速的前端构建工具

### UI 和样式
- **Tailwind CSS 3.3** - 实用优先的 CSS 框架
- **Lucide React** - 现代化图标库
- **Recharts 2.10** - React 图表库

### 路由和状态
- **React Router DOM 6.20** - 客户端路由
- **React Hooks** - 状态管理

### 数据获取
- **Axios 1.6** - HTTP 客户端
- **CoinGecko API** - 加密货币价格数据（免费版）

### 开发工具
- **PostCSS** - CSS 后处理器
- **Autoprefixer** - CSS 自动前缀
- **Terser** - JavaScript 压缩工具

---

## 📁 项目结构

```
交易所app/
├── public/                 # 静态资源
├── src/
│   ├── components/        # 公共组件
│   │   ├── ErrorBoundary.tsx    # 错误边界
│   │   ├── Layout.tsx            # 布局组件（导航栏、状态栏）
│   │   ├── QRCode.tsx            # 二维码组件
│   │   └── StatusBar.tsx        # 状态栏组件
│   ├── pages/             # 页面组件
│   │   ├── Home.tsx              # 首页
│   │   ├── Market.tsx            # 市场页面
│   │   ├── Trade.tsx             # 交易页面
│   │   ├── Assets.tsx            # 资产页面
│   │   ├── Discover.tsx          # 探索页面
│   │   ├── C2CBuy.tsx            # C2C 买币
│   │   ├── C2COrder.tsx          # C2C 订单
│   │   ├── C2CRecords.tsx        # C2C 交易记录
│   │   ├── Deposit.tsx           # 充币
│   │   ├── Withdraw.tsx          # 提币
│   │   ├── Transfer.tsx          # 划转
│   │   ├── Bills.tsx             # 账单
│   │   ├── Orders.tsx            # 订单
│   │   ├── Strategy.tsx          # 策略交易
│   │   ├── CreateStrategy.tsx     # 创建策略
│   │   └── Lending.tsx           # 借贷
│   ├── services/          # API 服务
│   │   ├── api.ts                # 加密货币 API（CoinGecko）
│   │   ├── appsApi.ts            # DApp 数据 API
│   │   └── marketData.ts         # 市场数据服务
│   ├── types/              # TypeScript 类型定义
│   │   └── index.ts
│   ├── App.tsx             # 主应用组件
│   ├── main.tsx            # 应用入口
│   └── index.css           # 全局样式
├── index.html              # HTML 模板
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 配置
├── tailwind.config.js       # Tailwind 配置
├── postcss.config.js        # PostCSS 配置
├── vercel.json              # Vercel 部署配置
└── README.md                # 项目文档
```

---

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 或 **yarn** >= 1.22.0

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install
```

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动，支持热模块替换（HMR）。

### 构建生产版本

```bash
npm run build
```

构建文件将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

在本地预览生产构建结果。

---

## 📦 部署指南

### 部署到 Vercel（推荐）

#### 方法一：使用 Vercel CLI

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署项目
vercel

# 4. 生产环境部署
vercel --prod
```

#### 方法二：通过 Vercel 网站

1. 访问 [Vercel](https://vercel.com) 并登录
2. 点击 "Add New Project"
3. 导入你的 Git 仓库或上传项目文件夹
4. Vercel 会自动检测 Vite 配置
5. 点击 "Deploy"

#### 方法三：GitHub 集成（自动部署）

1. **推送代码到 GitHub**：
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **在 Vercel 中连接 GitHub**：
   - 登录 Vercel
   - 点击 "Add New Project"
   - 选择你的 GitHub 仓库
   - Vercel 会自动检测配置
   - 点击 "Deploy"

3. **自动部署**：
   - 每次推送到 main 分支会自动触发部署
   - 每次 Pull Request 会创建预览部署

### 部署到其他平台

#### Netlify

1. 在 Netlify 中创建新站点
2. 构建命令：`npm run build`
3. 发布目录：`dist`
4. 部署

#### GitHub Pages

```bash
# 安装 gh-pages
npm install --save-dev gh-pages

# 在 package.json 中添加脚本
"deploy": "npm run build && gh-pages -d dist"

# 部署
npm run deploy
```

#### 传统服务器（Nginx/Apache）

1. 构建项目：`npm run build`
2. 将 `dist` 目录内容上传到服务器
3. 配置 Web 服务器指向 `dist` 目录
4. 配置 SPA 路由重写规则

**Nginx 配置示例**：
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 📖 功能详解

### 市场数据

应用使用 **CoinGecko API** 获取实时加密货币价格数据。为了应对 API 限制，实现了以下优化：

- **缓存机制**：1 分钟缓存，减少重复请求
- **请求频率限制**：最小 2 秒间隔
- **错误处理**：API 失败时自动切换到模拟数据
- **数据降级**：429 错误或 CORS 错误时使用缓存或模拟数据

### 自选管理

- 使用 `localStorage` 持久化存储
- 支持跨页面同步
- 默认自选：BTC、ETH、SOL

### 实时更新

- 市场页面：每 60 秒自动刷新
- 探索页面：每 60 秒自动刷新
- 北京时间显示：每秒更新

### 响应式设计

- 移动端优先设计
- 最大宽度 428px（适配手机屏幕）
- 支持触摸交互
- 底部导航栏固定

---

## 🔌 API 说明

### CoinGecko API

应用使用 CoinGecko 免费 API，无需 API 密钥。

**主要接口**：
- `GET /coins/markets` - 获取市场数据
- `GET /coins/{id}` - 获取单个币种详情

**限制**：
- 免费版：50 请求/分钟
- 建议使用缓存和请求限制

**模拟数据**：
当 API 不可用时，应用会自动使用内置的模拟数据，包含 15+ 主流币种。

### 自定义 API

如需使用其他 API 或添加 API 密钥，修改 `src/services/api.ts`：

```typescript
class CryptoAPI {
  private baseURL = 'https://api.coingecko.com/api/v3'
  // 添加 API 密钥
  private apiKey = 'your-api-key'
  
  // 在请求头中添加
  headers: {
    'X-CG-Demo-API-Key': this.apiKey
  }
}
```

---

## 👨‍💻 开发指南

### 添加新页面

1. 在 `src/pages/` 创建新页面组件
2. 在 `src/App.tsx` 中添加路由：
```typescript
<Route path="/new-page" element={<NewPage />} />
```
3. 在 `src/components/Layout.tsx` 中添加导航（如需要）

### 添加新功能

1. 在 `src/services/` 创建对应的 API 服务
2. 在 `src/types/` 添加类型定义
3. 创建页面组件并集成服务

### 自定义样式

修改 `tailwind.config.js`：
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#00D9A5', // 主色调
      },
    },
  },
}
```

### 环境变量

创建 `.env` 文件（如需要）：
```env
VITE_API_KEY=your-api-key
VITE_API_URL=https://api.example.com
```

在代码中使用：
```typescript
const apiKey = import.meta.env.VITE_API_KEY
```

---

## ❓ 常见问题

### Q: API 请求失败怎么办？

A: 应用已实现自动降级机制：
- 首先尝试使用缓存数据
- 如果缓存不可用，使用模拟数据
- 确保应用始终可用

### Q: 如何添加更多币种？

A: 修改 `src/services/api.ts` 中的 `getMockData()` 方法，或使用 CoinGecko API 的 `ids` 参数指定币种。

### Q: 部署后路由 404？

A: 确保配置了 SPA 路由重写规则：
- Vercel：已配置在 `vercel.json`
- Nginx：参考部署指南中的配置示例

### Q: 如何修改主题颜色？

A: 修改 `tailwind.config.js` 中的 `primary` 颜色，或直接修改 `src/index.css` 中的 CSS 变量。

### Q: 构建失败？

A: 检查：
1. Node.js 版本 >= 18
2. 所有依赖已安装
3. TypeScript 类型错误已修复

### Q: 如何启用真实交易？

A: 当前为演示版本，所有交易都是模拟的。要启用真实交易，需要：
1. 集成真实的交易所 API
2. 实现用户认证系统
3. 添加安全措施（加密、签名等）
4. 遵守相关法律法规

---

## 📝 更新日志

### v1.0.0 (2025-11-10)
- ✨ 初始版本发布
- 🎨 完整的 UI/UX 设计
- 📊 市场数据展示（现货、合约、期权）
- 💹 交易功能（买入/卖出）
- 💰 资产管理
- 🔍 探索页面（DApp、GameFi、NFT）
- 💵 C2C 交易
- 💳 充币/提币
- 🚀 Vercel 部署支持

---

## 📄 许可证

MIT License

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📞 联系方式

如有问题或建议，请提交 Issue 或联系项目维护者。

---

**⭐ 如果这个项目对你有帮助，请给个 Star！**

