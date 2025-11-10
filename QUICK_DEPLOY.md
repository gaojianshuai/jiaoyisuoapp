# 快速部署到 Vercel

## 🚀 一键部署（3种方式）

### 方式 1：使用 Vercel CLI（最简单）

```bash
# 1. 登录（首次需要）
vercel login

# 2. 部署
vercel --prod
```

就这么简单！Vercel 会自动检测项目配置。

### 方式 2：通过 Vercel 网站

1. 访问 https://vercel.com
2. 使用 GitHub/GitLab 账号登录
3. 点击 "Add New Project"
4. 导入你的 Git 仓库或拖拽项目文件夹
5. 点击 "Deploy"

### 方式 3：GitHub 集成（推荐，自动部署）

1. **推送代码到 GitHub**：
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **在 Vercel 连接 GitHub**：
   - 登录 Vercel
   - 导入 GitHub 仓库
   - 自动部署

3. **以后每次推送代码都会自动部署！**

## 📋 部署前检查清单

- [x] ✅ 项目已配置 `vercel.json`
- [x] ✅ 构建脚本正确 (`npm run build`)
- [x] ✅ 输出目录正确 (`dist`)
- [x] ✅ SPA 路由已配置

## 🎯 部署后

部署成功后会获得：
- 🌐 生产环境 URL（如：`your-app.vercel.app`）
- 🔄 自动部署（GitHub 集成）
- 📊 部署日志和监控

## ⚙️ 项目配置

项目已包含以下配置，无需修改：

- `vercel.json` - Vercel 配置
- `vite.config.ts` - 构建优化
- SPA 路由支持（React Router）

## 🔧 常见问题

**Q: 部署后路由 404？**
A: 已配置 `vercel.json` 中的 rewrites，应该没问题。如果还有问题，检查 React Router 配置。

**Q: 构建失败？**
A: 检查 Node 版本（建议 18+），确保所有依赖已安装。

**Q: 如何更新部署？**
A: 如果使用 GitHub 集成，推送代码即可。或运行 `vercel --prod`。

## 📞 需要帮助？

查看详细文档：`DEPLOY.md` 或 `README.md`

