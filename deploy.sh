#!/bin/bash

# Vercel 部署脚本

echo "🚀 开始部署到 Vercel..."

# 检查是否已登录
if ! vercel whoami &> /dev/null; then
    echo "📝 请先登录 Vercel..."
    vercel login
fi

# 部署到生产环境
echo "📦 正在部署..."
vercel --prod

echo "✅ 部署完成！"

