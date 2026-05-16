import { useState } from 'react'
import StyleSelector from './StyleSelector'

const NoteInput = ({ onSubmit, selectedStyle, onStyleChange }) => {
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!content.trim()) {
      setError('请输入内容')
      setTimeout(() => setError(''), 2000)
      return
    }
    if (content.length > 200) {
      setError('内容不能超过200字')
      setTimeout(() => setError(''), 2000)
      return
    }
    onSubmit(content)
    setContent('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      {error && (
        <div className="mb-2 px-3 py-2 bg-red-50 text-red-500 text-sm rounded-lg text-center">
          {error}
        </div>
      )}
      <div className="flex items-end gap-3 max-w-lg mx-auto">
        <StyleSelector selectedStyle={selectedStyle} onSelect={onStyleChange} />
        <div className="flex-1 relative">
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              setError('')
            }}
            onKeyPress={handleKeyPress}
            placeholder="写下你的心事，扔进垃圾桶..."
            className="w-full px-4 py-3 bg-gray-50 rounded-full border-0 focus:ring-2 focus:ring-purple-400 focus:outline-none resize-none text-sm placeholder-gray-400"
            rows={1}
            maxLength={200}
            style={{ overflow: 'hidden' }}
          />
          <span className={`absolute right-4 bottom-3 text-xs ${content.length > 180 ? 'text-orange-500' : 'text-gray-400'}`}>
            {content.length}/200
          </span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!content.trim()}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            content.trim()
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-110'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>🗑️</span>
        </button>
      </div>
    </div>
  )
}

export default NoteInput
