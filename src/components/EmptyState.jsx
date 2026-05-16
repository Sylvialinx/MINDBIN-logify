const EmptyState = ({ isOwn }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <div className="text-6xl mb-4">🗑️</div>
      <h2 className="text-xl font-bold text-white mb-2">
        {isOwn ? '垃圾桶是空的' : '这个垃圾桶是空的'}
      </h2>
      <p className="text-white/70 text-sm">
        {isOwn
          ? '写下你的心事，扔进垃圾桶吧'
          : '主人还没有扔任何纸团，去看看其他人的吧'}
      </p>
    </div>
  )
}

export default EmptyState
