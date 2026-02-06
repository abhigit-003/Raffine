import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import ProfileDropdown from './ProfileDropdown'
import MobileSearch from './MobileSearch'

function Header({ onSearch, onCategoryClick, searchValue, onSearchChange }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { getCartCount } = useCart()
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    const query = searchValue !== undefined ? searchValue : searchQuery
    if (onSearch) {
      onSearch(query)
    } else {
      alert(`Searching for: "${query}"\n\nThis will filter services when backend is ready.`)
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    if (onSearchChange) {
      onSearchChange(value)
    }
  }

  const handleCategoryClick = (category) => {
    if (onCategoryClick) {
      onCategoryClick(category)
    } else {
      alert(`Filtering by category: ${category}\n\nThis will filter services when backend is ready.`)
    }
  }

  const handleCartClick = () => {
    const count = getCartCount()
    if (count > 0) {
      alert(`Shopping Cart\n\nYou have ${count} item${count > 1 ? 's' : ''} in your cart.\n\nCart page will be implemented when backend is ready.`)
    } else {
      alert('Shopping Cart\n\nYour cart is empty. Add services to your cart to see them here.')
    }
  }

  const handleMobileSearch = (query) => {
    if (onSearch) {
      onSearch(query)
    }
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-surface-accent bg-surface-dark px-4 md:px-10 py-3 shadow-md">
      <div className="flex items-center gap-4 md:gap-8 w-full md:w-auto">
        <Link to={isAuthenticated ? "/home" : "/"} className="flex items-center gap-4 text-white cursor-pointer">
          <div className="size-8 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-3xl">spa</span>
          </div>
          <h2 className="text-white text-xl font-bold leading-tight tracking-tight hidden sm:block">Raffine</h2>
        </Link>
        <form onSubmit={handleSearch} className="hidden md:flex flex-col min-w-40 !h-10 w-full md:max-w-96">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full group focus-within:ring-1 ring-primary/50 transition-all">
            <div className="text-text-muted flex border-none bg-surface-accent items-center justify-center pl-4 rounded-l-lg border-r-0">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input 
              type="text"
              value={searchValue !== undefined ? searchValue : searchQuery}
              onChange={handleInputChange}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-surface-accent focus:border-none h-full placeholder:text-text-muted px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal" 
              placeholder="Search for services, spas, salons..." 
            />
          </div>
        </form>
      </div>
      {/* Mobile Search Icon */}
      <button 
        onClick={() => setMobileSearchOpen(true)}
        className="md:hidden text-white p-2"
      >
        <span className="material-symbols-outlined">search</span>
      </button>
      <MobileSearch 
        isOpen={mobileSearchOpen}
        onClose={() => setMobileSearchOpen(false)}
        onSearch={handleMobileSearch}
      />
      <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
        <div className="flex items-center gap-6 lg:gap-9">
          <button 
            onClick={() => handleCategoryClick('Spa')}
            className="text-white text-sm font-medium leading-normal hover:text-primary transition-colors"
          >
            Spa
          </button>
          <button 
            onClick={() => handleCategoryClick('Hair')}
            className="text-white text-sm font-medium leading-normal hover:text-primary transition-colors"
          >
            Hair
          </button>
          <button 
            onClick={() => handleCategoryClick('Fitness')}
            className="text-white text-sm font-medium leading-normal hover:text-primary transition-colors"
          >
            Fitness
          </button>
          <button 
            onClick={() => handleCategoryClick('Wellness')}
            className="text-white text-sm font-medium leading-normal hover:text-primary transition-colors"
          >
            Wellness
          </button>
        </div>
        <div className="flex gap-3">
          {isAuthenticated ? (
            <ProfileDropdown />
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg size-10 bg-surface-accent text-white hover:bg-surface-accent/80 transition-colors"
              title="Login"
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
            </button>
          )}
          <button 
            onClick={handleCartClick}
            className="relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg size-10 bg-surface-accent text-white hover:bg-surface-accent/80 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            {getCartCount() > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-primary rounded-full flex items-center justify-center text-xs font-bold px-1">
                {getCartCount() > 9 ? '9+' : getCartCount()}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

