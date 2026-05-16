import { useState } from 'react'
import { STYLE_MAP, getRandomStyle } from '../api/mockApi'

const StyleSelector = ({ selectedStyle, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (style) => {
    onSelect(style)
    setIsOpen(false)
  }

  const handleRandom = () => {
    onSelect(getRandomStyle())
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-lg hover:bg-white/30 transition-all hover:scale-110"
      >
        {selectedStyle ? STYLE_MAP[selectedStyle]?.icon : '📝'}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white rounded-xl shadow-xl p-3 z-50 min-w-[180px]">
            <div className="text-xs text-gray-500 text-center mb-2">选择纸团样式</div>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(STYLE_MAP).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => handleSelect(key)}
                  className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                    selectedStyle === key ? 'bg-purple-100 ring-2 ring-purple-400' : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{value.icon}</span>
                  <span className="text-xs text-gray-600 mt-1">{value.name}</span>
                </button>
              ))}
            </div>
            <button
              onClick={handleRandom}
              className="w-full mt-2 py-1 text-xs text-purple-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
            >
              🎲 随机选择
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default StyleSelector
