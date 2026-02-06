import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFavorites } from '../context/FavoritesContext'

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { user, isAuthenticated, logout } = useAuth()
  const { favorites } = useFavorites()
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg size-10 bg-surface-accent text-white hover:bg-surface-accent/80 transition-colors"
        title={`Logged in as ${user.name || user.email}`}
      >
        <span className="material-symbols-outlined text-[20px]">person</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-surface-dark border border-surface-accent rounded-lg shadow-lg z-50">
          {/* Profile Header */}
          <div className="p-4 border-b border-surface-accent">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">person</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm truncate">{user.name || 'User'}</p>
                <p className="text-text-muted text-xs truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <button
              onClick={() => {
                setIsOpen(false)
                alert('Profile Settings\n\nThis will open profile settings when backend is ready.')
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-surface-accent rounded-lg transition-colors text-sm"
            >
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span>Settings</span>
            </button>
            <button
              onClick={() => {
                setIsOpen(false)
                alert('My Bookings\n\nThis will show your bookings when backend is ready.')
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-surface-accent rounded-lg transition-colors text-sm"
            >
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              <span>My Bookings</span>
            </button>
            <button
              onClick={() => {
                setIsOpen(false)
                if (favorites.length > 0) {
                  alert(`Favorites\n\nYou have ${favorites.length} favorite service${favorites.length > 1 ? 's' : ''}.\n\nFavorites page will be implemented when backend is ready.`)
                } else {
                  alert('Favorites\n\nYou have no favorite services yet. Click the heart icon on services to add them to favorites.')
                }
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-surface-accent rounded-lg transition-colors text-sm"
            >
              <span className="material-symbols-outlined text-[20px]">favorite</span>
              <span>Favorites {favorites.length > 0 && `(${favorites.length})`}</span>
            </button>
            <button
              onClick={() => {
                setIsOpen(false)
                alert('Help & Support\n\nThis will open help center when backend is ready.')
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-surface-accent rounded-lg transition-colors text-sm"
            >
              <span className="material-symbols-outlined text-[20px]">help</span>
              <span>Help & Support</span>
            </button>
          </div>

          {/* Logout */}
          <div className="p-2 border-t border-surface-accent">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors text-sm font-medium"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileDropdown

