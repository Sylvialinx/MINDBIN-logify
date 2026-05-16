import { useEffect, useState } from 'react'
import { STYLE_MAP } from '../api/mockApi'

const ThrowAnimation = ({ note, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const duration = note.style === 'plane' ? 800 : note.style === 'shattered' ? 600 : 600
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 100)
    }, duration)

    return () => clearTimeout(timer)
  }, [note.style, onComplete])

  if (!isVisible) return null

  const styleClass = {
    crumpled: 'crumpled-paper',
    folded: 'folded-paper',
    plane: 'paper-plane',
    scroll: 'scroll-paper',
    shattered: 'shattered-paper',
  }[note.style]

  const animationClass = {
    crumpled: 'animate-throw',
    folded: 'animate-throw',
    plane: 'animate-paper-plane',
    scroll: 'animate-throw',
    shattered: 'animate-shatter',
  }[note.style]

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div className={`w-20 h-20 ${styleClass} ${animationClass} flex items-center justify-center`}>
        <span className="text-xs text-gray-600 text-center px-2">
          {note.content.length > 10 ? note.content.substring(0, 10) + '...' : note.content}
        </span>
      </div>
    </div>
  )
}

export default ThrowAnimation
