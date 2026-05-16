import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import NoteInput from './components/NoteInput'
import PaperNote from './components/PaperNote'
import BinIllustration from './components/BinIllustration'
import ThrowAnimation from './components/ThrowAnimation'
import EmptyState from './components/EmptyState'
import {
  getOrCreateBinId,
  createNote,
  deleteNote,
  getPublicNotes,
  getRandomBin,
  getBinById,
  getNotesByBinId,
  getRandomStyle,
} from './api/mockApi'

function App() {
  const [currentBinId, setCurrentBinId] = useState(null)
  const [notes, setNotes] = useState([])
  const [isOwn, setIsOwn] = useState(true)
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [throwingNote, setThrowingNote] = useState(null)
  const [error, setError] = useState('')

  const loadNotes = useCallback(async (binId, own = true) => {
    try {
      const noteList = own ? getNotesByBinId(binId) : getPublicNotes(binId)
      setNotes(noteList)
      setCurrentBinId(binId)
      setIsOwn(own)
    } catch (err) {
      console.error('加载纸团失败:', err)
    }
  }, [])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const binParam = urlParams.get('bin')

    if (binParam) {
      const bin = getBinById(binParam)
      if (bin) {
        loadNotes(binParam, false)
        return
      }
    }

    const myBinId = getOrCreateBinId()
    loadNotes(myBinId, true)
  }, [loadNotes])

  const handleThrowNote = async (content) => {
    try {
      const note = await createNote({
        binId: currentBinId,
        content: content.trim(),
        style: selectedStyle || getRandomStyle(),
      })

      setThrowingNote(note)
      setSelectedStyle(null)
    } catch (err) {
      setError(err.message)
      setTimeout(() => setError(''), 3000)
    }
  }

  const handleThrowComplete = () => {
    setThrowingNote(null)
    loadNotes(currentBinId, isOwn)
  }

  const handleDeleteNote = (noteId) => {
    deleteNote(noteId)
    loadNotes(currentBinId, isOwn)
  }

  const handleRandom = async () => {
    const randomBin = getRandomBin()
    if (randomBin) {
      window.history.pushState({}, '', `?bin=${randomBin.binId}`)
      loadNotes(randomBin.binId, false)
    } else {
      setError('还没有其他垃圾桶，快去告诉朋友吧！')
      setTimeout(() => setError(''), 3000)
    }
  }

  const handleShare = () => {
    const url = `${window.location.origin}/?bin=${currentBinId}`
    if (navigator.share) {
      navigator.share({
        title: '纸团垃圾桶',
        text: '来看看我的纸团垃圾桶',
        url,
      })
    }
  }

  return (
    <div className="min-h-screen pb-28">
      {error && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-red-500 text-white text-sm rounded-full shadow-lg">
          {error}
        </div>
      )}

      <Header
        isOwn={isOwn}
        binId={currentBinId}
        onRandom={handleRandom}
        onShare={handleShare}
      />

      <main className="max-w-lg mx-auto px-4">
        {notes.length === 0 ? (
          <EmptyState isOwn={isOwn} />
        ) : (
          <>
            <BinIllustration noteCount={notes.length} />
            
            <div className="space-y-4">
              {notes.map((note) => (
                <PaperNote
                  key={note.noteId}
                  note={note}
                  isOwn={isOwn}
                  onDelete={handleDeleteNote}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {throwingNote && (
        <ThrowAnimation note={throwingNote} onComplete={handleThrowComplete} />
      )}

      {isOwn && (
        <NoteInput
          onSubmit={handleThrowNote}
          selectedStyle={selectedStyle}
          onStyleChange={setSelectedStyle}
        />
      )}
    </div>
  )
}

export default App
