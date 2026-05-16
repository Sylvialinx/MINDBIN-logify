const BinIllustration = ({ noteCount = 0 }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        <svg
          width="120"
          height="140"
          viewBox="0 0 120 140"
          className="drop-shadow-lg"
        >
          <ellipse cx="60" cy="130" rx="45" ry="8" fill="#374151" opacity="0.3" />
          <path
            d="M30 30 L30 80 Q30 90 40 90 L80 90 Q90 90 90 80 L90 30"
            fill="#ef4444"
            stroke="#dc2626"
            strokeWidth="2"
          />
          <path
            d="M35 30 L35 75 Q35 85 45 85 L75 85 Q85 85 85 75 L85 30"
            fill="#fca5a5"
          />
          <path
            d="M30 50 L90 50"
            stroke="#dc2626"
            strokeWidth="2"
          />
          <path
            d="M30 65 L90 65"
            stroke="#dc2626"
            strokeWidth="2"
          />
          <ellipse cx="60" cy="95" rx="35" ry="10" fill="#991b1b" />
          <rect x="45" y="20" width="30" height="15" rx="3" fill="#fbbf24" />
          <text x="60" y="31" textAnchor="middle" fontSize="8" fill="#92400e">
            🗑️
          </text>
        </svg>
        
        {noteCount > 0 && (
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-bounce-in">
            {noteCount > 9 ? '9+' : noteCount}
          </div>
        )}
      </div>
      
      <p className="mt-4 text-white/80 text-sm">
        {noteCount === 0 ? '还没有纸团，写下你的心事吧' : `垃圾桶里有 ${noteCount} 个纸团`}
      </p>
    </div>
  )
}

export default BinIllustration
