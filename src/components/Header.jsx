const Header = ({ isOwn, binId, onRandom, onShare }) => {
  const handleCopyLink = async () => {
    const url = `${window.location.origin}/?bin=${binId}`
    try {
      await navigator.clipboard.writeText(url)
      alert('链接已复制到剪贴板！')
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = url
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      alert('链接已复制到剪贴板！')
    }
  }

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
            🗑️
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">纸团垃圾桶</h1>
            <p className="text-xs text-gray-500">{isOwn ? '我的垃圾桶' : '陌生人的垃圾桶'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isOwn && (
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-white/80 border border-gray-200 rounded-full text-xs text-gray-600 hover:bg-gray-50 transition flex items-center gap-1"
            >
              <span>🔗</span>
              <span>分享</span>
            </button>
          )}
          <button
            onClick={onRandom}
            className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-medium hover:opacity-90 transition flex items-center gap-1 shadow-md"
          >
            <span>🎲</span>
            <span>{isOwn ? '随机翻' : '换一个'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
