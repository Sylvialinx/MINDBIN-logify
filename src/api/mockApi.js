const STORAGE_KEY_BINS = 'paper_bins'
const STORAGE_KEY_NOTES = 'paper_notes'
const STORAGE_KEY_CURRENT_BIN = 'current_bin_id'

const SENSITIVE_WORDS = ['敏感词1', '敏感词2', '敏感词3', '脏话', '攻击']

export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export const getOrCreateBinId = () => {
  let binId = localStorage.getItem(STORAGE_KEY_CURRENT_BIN)
  if (!binId) {
    binId = generateId()
    localStorage.setItem(STORAGE_KEY_CURRENT_BIN, binId)
    createBin(binId)
  }
  return binId
}

export const createBin = (binId) => {
  const bins = getBins()
  if (!bins.find(b => b.binId === binId)) {
    bins.push({
      binId,
      createdAt: Date.now(),
    })
    localStorage.setItem(STORAGE_KEY_BINS, JSON.stringify(bins))
  }
}

export const getBins = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_BINS) || '[]')
  } catch {
    return []
  }
}

export const getNotes = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_NOTES) || '[]')
  } catch {
    return []
  }
}

export const createNote = ({ binId, content, style }) => {
  if (content.length > 200) {
    throw new Error('内容不能超过200字')
  }

  if (SENSITIVE_WORDS.some(word => content.includes(word))) {
    throw new Error('内容包含敏感词')
  }

  const notes = getNotes()
  const lastNote = notes.filter(n => n.binId === binId).sort((a, b) => b.createdAt - a.createdAt)[0]
  
  if (lastNote && Date.now() - lastNote.createdAt < 60000) {
    const count = notes.filter(n => n.binId === binId && Date.now() - n.createdAt < 60000).length
    if (count >= 3) {
      throw new Error('每分钟最多发送3个纸团')
    }
  }

  const note = {
    noteId: generateId(),
    binId,
    content,
    style: style || getRandomStyle(),
    isPublic: true,
    createdAt: Date.now(),
  }

  notes.push(note)
  localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes))
  return note
}

export const deleteNote = (noteId) => {
  const notes = getNotes()
  const filtered = notes.filter(n => n.noteId !== noteId)
  localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(filtered))
}

export const getPublicNotes = (binId) => {
  const notes = getNotes()
  return notes.filter(n => n.binId === binId && n.isPublic).sort((a, b) => b.createdAt - a.createdAt)
}

export const getRandomBin = () => {
  const bins = getBins()
  if (bins.length < 2) {
    return null
  }
  const currentBinId = getOrCreateBinId()
  const otherBins = bins.filter(b => b.binId !== currentBinId)
  if (otherBins.length === 0) {
    return null
  }
  return otherBins[Math.floor(Math.random() * otherBins.length)]
}

export const getBinById = (binId) => {
  const bins = getBins()
  return bins.find(b => b.binId === binId)
}

export const getNotesByBinId = (binId) => {
  const notes = getNotes()
  return notes.filter(n => n.binId === binId).sort((a, b) => b.createdAt - a.createdAt)
}

export const getRandomStyle = () => {
  const styles = ['crumpled', 'folded', 'plane', 'scroll', 'shattered']
  return styles[Math.floor(Math.random() * styles.length)]
}

export const STYLE_MAP = {
  crumpled: { name: '揉皱纸团', icon: '🗜️' },
  folded: { name: '折叠整齐', icon: '📄' },
  plane: { name: '纸飞机', icon: '✈️' },
  scroll: { name: '小卷轴', icon: '📜' },
  shattered: { name: '碎纸片', icon: '🧩' },
}
