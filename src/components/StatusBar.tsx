export default function StatusBar() {
  const now = new Date()
  const time = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  const battery = 80

  return (
    <div className="h-8 bg-white flex items-center justify-between px-4 text-xs text-gray-600">
      <span>{time}</span>
      <div className="flex items-center gap-1">
        <span>5G</span>
        <span>5G</span>
        <span>WiFi</span>
        <span>{battery}%</span>
      </div>
    </div>
  )
}

