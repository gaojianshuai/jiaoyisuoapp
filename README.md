# 加密货币交易所应用

这是一个基于 React + TypeScript 构建的加密货币交易所应用，复刻了欧易（OKX）应用的主要功能和界面。

## 功能特性

- 🏠 **首页**: 搜索、推广横幅、功能图标、赚币部分
- 📊 **市场页面**: 实时显示加密货币价格、涨跌幅、交易量
- 💹 **交易页面**: 价格图表、订单簿、买入/卖出功能
- 💰 **资产页面**: 总资产概览、今日收益、账户分布、资产列表
- 🔍 **探索页面**: 探索功能（预留）

## 技术栈

- **React 18** - UI框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **React Router** - 路由管理
- **Recharts** - 图表库
- **Axios** - HTTP客户端
- **CoinGecko API** - 加密货币价格数据

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动

### 构建生产版本

```bash
npm run build
```

构建文件将输出到 `dist` 目录

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
交易所app/
├── src/
│   ├── components/      # 公共组件
│   │   ├── Layout.tsx   # 布局组件（包含底部导航）
│   │   └── StatusBar.tsx
│   ├── pages/          # 页面组件
│   │   ├── Home.tsx    # 首页
│   │   ├── Market.tsx   # 市场页面
│   │   ├── Trade.tsx    # 交易页面
│   │   ├── Assets.tsx   # 资产页面
│   │   └── Discover.tsx # 探索页面
│   ├── services/       # API服务
│   │   └── api.ts      # 加密货币API
│   ├── types/          # TypeScript类型定义
│   │   └── index.ts
│   ├── App.tsx         # 主应用组件
│   ├── main.tsx        # 入口文件
│   └── index.css       # 全局样式
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 功能说明

### 实时价格数据

应用使用 CoinGecko API 获取实时加密货币价格数据。如果API不可用，会自动切换到模拟数据以确保应用正常运行。

### 数据更新

- 市场页面每30秒自动刷新价格数据
- 支持手动刷新

### 响应式设计

应用采用移动端优先的设计，最大宽度为428px，完美适配手机屏幕。

## 本地部署

### 方式一：开发模式

```bash
npm run dev
```

### 方式二：生产构建

1. 构建应用：
```bash
npm run build
```

2. 预览构建结果：
```bash
npm run preview
```

3. 部署 `dist` 目录到任何静态文件服务器（如 Nginx、Apache、Vercel、Netlify 等）

### 方式三：使用本地服务器

```bash
# 安装 serve（如果还没有）
npm install -g serve

# 构建应用
npm run build

# 启动本地服务器
serve -s dist
```

## 部署到 Vercel

### 方法一：通过 Vercel CLI（推荐）

1. **安装 Vercel CLI**：
```bash
npm i -g vercel
```

2. **登录 Vercel**：
```bash
vercel login
```

3. **部署项目**：
```bash
# 在项目根目录执行
vercel
```

4. **生产环境部署**：
```bash
vercel --prod
```

### 方法二：通过 Vercel 网站

1. **访问 [Vercel](https://vercel.com)** 并登录（支持 GitHub、GitLab、Bitbucket 登录）

2. **导入项目**：
   - 点击 "Add New Project"
   - 选择你的 Git 仓库（如果没有，先推送到 GitHub/GitLab）
   - 或者直接拖拽项目文件夹

3. **配置项目**：
   - Framework Preset: 选择 "Vite"
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **部署**：
   - 点击 "Deploy"
   - 等待构建完成
   - 获得部署链接

### 方法三：通过 GitHub 集成（自动部署）

1. **推送代码到 GitHub**：
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **在 Vercel 中连接 GitHub**：
   - 登录 Vercel
   - 点击 "Add New Project"
   - 选择你的 GitHub 仓库
   - Vercel 会自动检测 Vite 项目配置
   - 点击 "Deploy"

3. **自动部署**：
   - 每次推送到 main 分支会自动触发部署
   - 每次 Pull Request 会创建预览部署

### Vercel 配置说明

项目已包含 `vercel.json` 配置文件，包含以下设置：
- 构建命令：`npm run build`
- 输出目录：`dist`
- SPA 路由重写规则（支持 React Router）

### 环境变量（如需要）

如果将来需要添加环境变量：
1. 在 Vercel 项目设置中添加环境变量
2. 或在 `vercel.json` 中配置

### 自定义域名

部署后可以在 Vercel 项目设置中添加自定义域名。

### 注意事项

- Vercel 会自动检测 Vite 项目，通常不需要额外配置
- 确保 `package.json` 中有正确的构建脚本
- 所有路由都会重定向到 `index.html`（SPA 支持）
- 免费版有构建时间限制，但足够使用

## API说明

应用使用 CoinGecko 免费API，无需API密钥。主要接口：

- `GET /coins/markets` - 获取市场数据
- `GET /coins/{id}` - 获取单个币种详情

如果API请求失败，应用会自动使用内置的模拟数据。

## 注意事项

1. **API限制**: CoinGecko免费API有速率限制，建议不要过于频繁请求
2. **数据延迟**: 免费API可能有轻微延迟，生产环境建议使用付费API
3. **浏览器兼容**: 建议使用现代浏览器（Chrome、Firefox、Safari、Edge）

## 开发建议

- 如需添加更多币种，修改 `src/services/api.ts` 中的 `getMarketData` 方法
- 自定义样式可在 `tailwind.config.js` 中修改
- 添加新页面需要在 `src/App.tsx` 中添加路由

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

