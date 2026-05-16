import { useState } from 'react'
import { STYLE_MAP } from '../api/mockApi'

const PaperNote = ({ note, isOwn, onDelete, isAnimating, animationType }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [longPressTimer, setLongPressTimer] = useState(null)

  const handleMouseDown = () => {
    if (!isOwn) return
    const timer = setTimeout(() => {
      setShowDeleteConfirm(true)
    }, 800)
    setLongPressTimer(timer)
  }

  const handleMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      setLongPressTimer(null)
    }
  }

  const handleClick = () => {
    if (!showDeleteConfirm) {
      setIsExpanded(!isExpanded)
    }
  }

  const handleDelete = () => {
    onDelete(note.noteId)
    setShowDeleteConfirm(false)
  }

  const styleClass = {
    crumpled: 'crumpled-paper',
    folded: 'folded-paper',
    plane: 'paper-plane',
    scroll: 'scroll-paper',
    shattered: 'shattered-paper',
  }[note.style]

  const animationClass = {
    throw: 'animate-throw',
    'paper-plane': 'animate-paper-plane',
    shatter: 'animate-shatter',
    bounce: 'animate-bounce-in',
  }[animationType]

  return (
    <div
      className={`paper-note ${styleClass} ${animationClass || ''} ${isExpanded ? 'note-expanded' : ''} ${isAnimating ? 'opacity-50' : ''}`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      style={{
        padding: isExpanded ? '16px' : '12px 16px',
        marginBottom: '12px',
        minHeight: isExpanded ? 'auto' : '60px',
        textAlign: isExpanded ? 'left' : 'center',
      }}
    >
      {isExpanded ? (
        <div className="relative">
          <p className="text-gray-700 text-sm leading-relaxed break-words">
            {note.content}
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-400">
              {STYLE_MAP[note.style]?.icon} {STYLE_MAP[note.style]?.name}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(note.createdAt).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full min-h-[40px]">
          <span className="text-gray-600 text-sm truncate max-w-[200px]">
            {note.content.length > 30 ? note.content.substring(0, 30) + '...' : note.content}
          </span>
        </div>
      )}

      {showDeleteConfirm && isOwn && (
        <div className="absolute inset-0 bg-black/60 rounded-lg flex flex-col items-center justify-center gap-3 z-10">
          <p className="text-white text-sm">确定删除这个纸团？</p>
          <div className="flex gap-4">
            <button
              onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(false) }}
              className="px-4 py-1 bg-white/20 text-white rounded-full text-sm hover:bg-white/30 transition"
            >
              取消
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleDelete() }}
              className="px-4 py-1 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition"
            >
              删除
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaperNote
