import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { useCart } from '../context/CartContext'

function ServiceCard({ service }) {
  const navigate = useNavigate()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addToCart } = useCart()
  const favorite = isFavorite(service.id)

  const handleFavorite = (e) => {
    e.stopPropagation()
    toggleFavorite(service)
  }

  const handleBookNow = (e) => {
    e.stopPropagation()
    addToCart(service)
    alert(`${service.name} added to cart!\n\nThis will open booking details when backend is ready.`)
  }

  const handleCardClick = () => {
    // Navigate to service detail page (will create later)
    alert(`Viewing details for ${service.name}\n\nService detail page will be implemented when backend is ready.`)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="material-symbols-outlined filled text-yellow-500 text-[16px]">star</span>
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="material-symbols-outlined filled text-yellow-500 text-[16px]">star_half</span>
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="material-symbols-outlined text-[16px] opacity-30">star</span>
      )
    }

    return stars
  }

  return (
    <div 
      onClick={handleCardClick}
      className="group flex flex-col bg-surface-dark border border-surface-accent rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        <img 
          alt={service.alt} 
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" 
          src={service.image} 
        />
        <button 
          onClick={handleFavorite}
          className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-sm transition-colors ${
            favorite 
              ? 'bg-primary text-white' 
              : 'bg-black/40 text-white hover:bg-primary hover:text-white'
          }`}
        >
          <span className={`material-symbols-outlined text-[20px] block ${favorite ? 'filled' : ''}`}>
            favorite
          </span>
        </button>
        {service.badge && (
          <div className="absolute bottom-3 left-3 z-20">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${service.badge.color} text-white backdrop-blur-md`}>
              {service.badge.text}
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-white font-bold text-lg leading-tight group-hover:text-primary transition-colors">
              {service.name}
            </h3>
            <p className="text-text-muted text-sm">{service.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 mb-4">
          <div className="flex items-center">
            {renderStars(service.rating)}
          </div>
          <span className="text-white text-sm font-medium ml-1">{service.rating}</span>
          <span className="text-text-muted text-xs">({service.reviews} reviews)</span>
          <span className="mx-2 text-surface-accent">•</span>
          <span className="text-white text-sm">{service.priceRange}</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-surface-accent">
          <div className="flex flex-col">
            {service.originalPrice ? (
              <>
                <span className="text-text-muted text-xs line-through text-opacity-50">{service.originalPrice}</span>
                <span className="text-white font-bold">{service.price}</span>
              </>
            ) : (
              <>
                <span className="text-text-muted text-xs">{service.priceLabel || 'From'}</span>
                <span className="text-white font-bold">{service.price}</span>
              </>
            )}
          </div>
          <button 
            onClick={handleBookNow}
            className="bg-primary hover:bg-primary/90 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors shadow-lg shadow-primary/20"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard

