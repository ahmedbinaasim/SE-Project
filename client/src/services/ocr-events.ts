// Simple event emitter for OCR events
type Listener = () => void

const listeners: Listener[] = []

export const emitOcrUpdate = () => {
  listeners.forEach(listener => listener())
}

export const onOcrUpdate = (listener: Listener) => {
  listeners.push(listener)
  return () => {
    const index = listeners.indexOf(listener)
    if (index !== -1) {
      listeners.splice(index, 1)
    }
  }
}