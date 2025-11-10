import { useState, useEffect } from 'react'
import { ArrowLeft, Clock, CheckCircle, XCircle, Copy, Check } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function C2COrder() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const merchantId = searchParams.get('merchant') || '1'
  const coin = searchParams.get('coin') || 'USDT'
  const amount = searchParams.get('amount') || '1000'

  const [orderStatus, setOrderStatus] = useState<'pending' | 'paid' | 'completed' | 'cancelled'>('pending')
  const [countdown, setCountdown] = useState(900) // 15分钟倒计时
  const [copied, setCopied] = useState(false)

  const merchant = {
    id: merchantId,
    name: 'CryptoTrader001',
    avatar: '👤',
    paymentAccount: '138****8888',
    paymentMethod: '支付宝',
  }

  const orderInfo = {
    orderId: `C2C${Date.now()}`,
    coin,
    amount: parseFloat(amount),
    price: 7.25,
    total: parseFloat(amount) * 7.25,
    receiveAmount: (parseFloat(amount) / 7.25).toFixed(4),
  }

  useEffect(() => {
    if (orderStatus === 'pending' && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setOrderStatus('cancelled')
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [orderStatus, countdown])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderInfo.orderId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePay = () => {
    setOrderStatus('paid')
    // 模拟支付后自动完成
    setTimeout(() => {
      setOrderStatus('completed')
    }, 3000)
  }

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold flex-1">订单详情</h2>
        <button
          onClick={() => navigate('/c2c/records')}
          className="text-sm text-primary font-medium"
        >
          交易记录
        </button>
      </div>

      {/* Order Status */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-center gap-3 mb-4">
          {orderStatus === 'pending' && (
            <>
              <Clock className="w-8 h-8 text-yellow-500" />
              <div>
                <div className="font-semibold text-lg">等待付款</div>
                <div className="text-sm text-gray-500">剩余时间: {formatTime(countdown)}</div>
              </div>
            </>
          )}
          {orderStatus === 'paid' && (
            <>
              <Clock className="w-8 h-8 text-blue-500 animate-spin" />
              <div>
                <div className="font-semibold text-lg">等待放币</div>
                <div className="text-sm text-gray-500">商家正在处理中...</div>
              </div>
            </>
          )}
          {orderStatus === 'completed' && (
            <>
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <div className="font-semibold text-lg">交易完成</div>
                <div className="text-sm text-gray-500">订单已成功完成</div>
              </div>
            </>
          )}
          {orderStatus === 'cancelled' && (
            <>
              <XCircle className="w-8 h-8 text-red-500" />
              <div>
                <div className="font-semibold text-lg">订单已取消</div>
                <div className="text-sm text-gray-500">支付超时</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Order Info */}
      <div className="px-4 py-4 space-y-4">
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">订单信息</h3>
            <button
              onClick={copyOrderId}
              className="flex items-center gap-1 text-xs text-primary"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  已复制
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  复制订单号
                </>
              )}
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">订单号:</span>
              <span className="font-mono text-xs">{orderInfo.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">币种:</span>
              <span className="font-medium">{orderInfo.coin}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">购买金额:</span>
              <span className="font-medium">¥{orderInfo.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">单价:</span>
              <span className="font-medium">¥{orderInfo.price}/{orderInfo.coin}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">支付总额:</span>
              <span className="font-medium text-primary">¥{orderInfo.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-100">
              <span className="text-gray-600">预计收到:</span>
              <span className="font-semibold text-lg">{orderInfo.receiveAmount} {orderInfo.coin}</span>
            </div>
          </div>
        </div>

        {/* Merchant Info */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="font-semibold mb-3">商家信息</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
              {merchant.avatar}
            </div>
            <div className="flex-1">
              <div className="font-semibold">{merchant.name}</div>
              <div className="text-xs text-gray-500 mt-1">
                支付方式: {merchant.paymentMethod}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        {orderStatus === 'pending' && (
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-semibold mb-3">付款信息</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">收款账户</div>
                <div className="font-medium">{merchant.paymentAccount}</div>
                <div className="text-xs text-gray-500 mt-1">{merchant.paymentMethod}</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="text-xs text-yellow-700">
                  ⚠️ 请务必在 {formatTime(countdown)} 内完成付款，超时订单将自动取消
                </div>
              </div>
              <button
                onClick={handlePay}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                我已付款
              </button>
            </div>
          </div>
        )}

        {/* Success Message */}
        {orderStatus === 'completed' && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-2 text-green-700 mb-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">交易成功</span>
            </div>
            <p className="text-sm text-green-600">
              您已成功收到 {orderInfo.receiveAmount} {orderInfo.coin}
            </p>
          </div>
        )}

        {/* Cancel Message */}
        {orderStatus === 'cancelled' && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-2 text-red-700 mb-2">
              <XCircle className="w-5 h-5" />
              <span className="font-semibold">订单已取消</span>
            </div>
            <p className="text-sm text-red-600">
              支付超时，订单已自动取消
            </p>
            <button
              onClick={() => navigate('/c2c/buy')}
              className="w-full bg-primary text-white py-2 rounded-lg font-medium mt-3"
            >
              重新购买
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

