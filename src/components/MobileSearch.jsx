import { useState, useEffect, useRef } from 'react'

function MobileSearch({ onSearch, isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(query)
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden">
      <div className="bg-surface-dark border-b border-surface-accent p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-text-muted text-[20px]">search</span>
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface-accent border border-surface-accent rounded-lg text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Search for services..."
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white p-2"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default MobileSearch

