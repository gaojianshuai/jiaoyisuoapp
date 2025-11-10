@echo off
REM Vercel 部署脚本 (Windows)

echo 🚀 开始部署到 Vercel...

REM 检查是否已登录
vercel whoami >nul 2>&1
if errorlevel 1 (
    echo 📝 请先登录 Vercel...
    vercel login
)

REM 部署到生产环境
echo 📦 正在部署...
vercel --prod

echo ✅ 部署完成！

