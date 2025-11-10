# Vercel 部署指南

## 快速部署步骤

### 1. 准备项目

确保项目已经构建成功：
```bash
npm install
npm run build
```

### 2. 部署方式选择

#### 方式 A：使用 Vercel CLI（最快）

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署（在项目根目录）
vercel

# 4. 生产环境部署
vercel --prod
```

#### 方式 B：通过 Vercel 网站

1. 访问 https://vercel.com
2. 使用 GitHub/GitLab/Bitbucket 登录
3. 点击 "Add New Project"
4. 导入你的 Git 仓库或上传项目
5. Vercel 会自动检测 Vite 配置
6. 点击 "Deploy"

#### 方式 C：GitHub 集成（推荐，自动部署）

1. 将代码推送到 GitHub：
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. 在 Vercel 中：
   - 导入 GitHub 仓库
   - 自动检测配置
   - 自动部署

## 项目配置

项目已包含以下配置文件：

- `vercel.json` - Vercel 部署配置
- `package.json` - 包含构建脚本
- `vite.config.ts` - Vite 构建配置

## 构建配置

- **构建命令**: `npm run build`
- **输出目录**: `dist`
- **Node 版本**: 自动检测（建议 18+）

## 路由配置

项目使用 React Router，已配置 SPA 路由重写规则，所有路由都会正确重定向到 `index.html`。

## 环境变量

如果需要添加环境变量：
1. 在 Vercel 项目设置 → Environment Variables 中添加
2. 或在 `vercel.json` 中配置

## 自定义域名

部署后可在 Vercel 项目设置中添加自定义域名。

## 常见问题

### 1. 构建失败
- 检查 Node 版本（建议 18+）
- 确保所有依赖已安装
- 查看构建日志

### 2. 路由 404
- 确保 `vercel.json` 中的 rewrites 配置正确
- 检查 React Router 配置

### 3. API 请求失败
- 检查 CORS 配置
- 确保 API 地址正确

## 部署后

部署成功后，你会获得：
- 生产环境 URL（如：`your-app.vercel.app`）
- 每次 Git push 自动部署
- Pull Request 预览部署

## 更新部署

### 自动更新（GitHub 集成）
每次推送到主分支会自动触发部署。

### 手动更新
```bash
vercel --prod
```

