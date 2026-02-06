import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const savedFavorites = localStorage.getItem('raffine_favorites')
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (e) {
        localStorage.removeItem('raffine_favorites')
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('raffine_favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (service) => {
    setFavorites(prev => {
      const exists = prev.find(item => item.id === service.id)
      if (exists) {
        return prev.filter(item => item.id !== service.id)
      }
      return [...prev, service]
    })
  }

  const isFavorite = (serviceId) => {
    return favorites.some(item => item.id === serviceId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

