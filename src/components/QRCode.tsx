import { useState } from 'react'
import { X } from 'lucide-react'

interface QRCodeProps {
  address: string
  coin: string
  network: string
  onClose: () => void
}

export default function QRCode({ address, coin, network, onClose }: QRCodeProps) {
  // 简单的二维码生成（实际应用中应使用专业库如 qrcode.react）
  // 这里使用在线API生成二维码图片
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(address)}`

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">充值二维码</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center mb-4">
          <div className="bg-white p-4 rounded-lg inline-block border-2 border-gray-200">
            <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">{coin} ({network})</p>
          <p className="text-xs text-gray-500 font-mono break-all">{address}</p>
          <p className="text-xs text-gray-400 mt-4">使用钱包扫描二维码进行充值</p>
        </div>
      </div>
    </div>
  )
}

