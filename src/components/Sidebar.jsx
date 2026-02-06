import { useState, useEffect, useRef } from 'react'

function Sidebar({ onFiltersChange }) {
  const [priceRange, setPriceRange] = useState({ min: 50, max: 500 })
  const [selectedServices, setSelectedServices] = useState(['Spa & Massage'])
  const [selectedRatings, setSelectedRatings] = useState(['4.0'])
  const [dragging, setDragging] = useState(null) // 'min' or 'max'
  const sliderRef = useRef(null)

  const serviceTypes = [
    'Spa & Massage',
    'Hair Styling',
    'Nail Care',
    'Fitness Training'
  ]

  const ratingOptions = [
    { value: '5.0', stars: 5, label: '5.0 only' },
    { value: '4.0', stars: 4, label: '& up' },
    { value: '3.0', stars: 3, label: '& up' }
  ]

  // Notify parent when filters change
  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange({
        priceRange,
        selectedServices,
        selectedRatings
      })
    }
  }, [priceRange, selectedServices, selectedRatings, onFiltersChange])

  const toggleService = (service) => {
    setSelectedServices(prev => {
      const newServices = prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
      return newServices
    })
  }

  const toggleRating = (rating) => {
    setSelectedRatings(prev => {
      const newRatings = prev.includes(rating) 
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
      return newRatings
    })
  }

  const handlePriceRangeChange = (type, value) => {
    setPriceRange(prev => {
      const newRange = { ...prev, [type]: parseInt(value) || 50 }
      // Ensure min < max
      if (type === 'min' && newRange.min >= newRange.max) {
        newRange.max = Math.min(500, newRange.min + 10)
      } else if (type === 'max' && newRange.max <= newRange.min) {
        newRange.min = Math.max(50, newRange.max - 10)
      }
      // Clamp values
      newRange.min = Math.max(50, Math.min(500, newRange.min))
      newRange.max = Math.max(50, Math.min(500, newRange.max))
      return newRange
    })
  }

  const getValueFromPosition = (clientX) => {
    if (!sliderRef.current) return 50
    const rect = sliderRef.current.getBoundingClientRect()
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    return Math.round(50 + percent * (500 - 50))
  }

  const handleMouseDown = (type) => (e) => {
    e.preventDefault()
    setDragging(type)
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging && sliderRef.current) {
        const value = getValueFromPosition(e.clientX)
        setPriceRange(prev => {
          const newRange = { ...prev, [dragging]: value }
          // Ensure min < max
          if (dragging === 'min' && newRange.min >= newRange.max) {
            newRange.max = Math.min(500, newRange.min + 10)
          } else if (dragging === 'max' && newRange.max <= newRange.min) {
            newRange.min = Math.max(50, newRange.max - 10)
          }
          // Clamp values
          newRange.min = Math.max(50, Math.min(500, newRange.min))
          newRange.max = Math.max(50, Math.min(500, newRange.max))
          return newRange
        })
      }
    }

    const handleMouseUp = () => {
      setDragging(null)
    }

    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [dragging])

  const handleReset = () => {
    setSelectedServices(['Spa & Massage'])
    setSelectedRatings(['4.0'])
    setPriceRange({ min: 50, max: 500 })
  }

  const renderStars = (count) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span 
        key={i} 
        className={`material-symbols-outlined ${i < count ? 'filled' : ''} text-[18px] ${i < count ? 'text-yellow-500' : 'text-yellow-500 opacity-30'}`}
      >
        star
      </span>
    ))
  }

  // Calculate percentage for visual slider
  const minPercent = ((priceRange.min - 50) / (500 - 50)) * 100
  const maxPercent = ((priceRange.max - 50) / (500 - 50)) * 100

  return (
    <aside className="w-full md:w-72 lg:w-80 flex-shrink-0 flex flex-col gap-6">
      <div className="flex items-center justify-between pb-2 border-b border-surface-accent">
        <h3 className="text-white tracking-tight text-xl font-bold leading-tight">Filters</h3>
        <button 
          onClick={handleReset}
          className="text-text-muted text-xs font-medium hover:text-white transition-colors"
        >
          Reset All
        </button>
      </div>

      {/* Categories Accordion */}
      <div className="flex flex-col gap-4">
        <details className="group" open>
          <summary className="flex cursor-pointer items-center justify-between py-2 list-none select-none">
            <p className="text-white text-sm font-bold leading-normal">Service Type</p>
            <span className="material-symbols-outlined text-white transition-transform duration-300 group-open:rotate-180">expand_more</span>
          </summary>
          <div className="pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col gap-2">
              {serviceTypes.map((service) => (
                <label key={service} className="flex gap-x-3 py-2 items-center group/item cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={selectedServices.includes(service)}
                    onChange={() => toggleService(service)}
                    className="h-5 w-5 rounded border-surface-accent border-2 bg-transparent text-primary checked:bg-primary checked:border-primary focus:ring-0 focus:ring-offset-0 focus:outline-none transition-colors" 
                  />
                  <span className="text-gray-300 text-sm font-medium group-hover/item:text-white">{service}</span>
                </label>
              ))}
            </div>
          </div>
        </details>

        {/* Price Slider Accordion */}
        <details className="group" open>
          <summary className="flex cursor-pointer items-center justify-between py-2 list-none select-none">
            <p className="text-white text-sm font-bold leading-normal">Price Range</p>
            <span className="material-symbols-outlined text-white transition-transform duration-300 group-open:rotate-180">expand_more</span>
          </summary>
          <div className="pt-4 pb-2 px-1">
            <div className="relative flex w-full flex-col gap-4">
              {/* Interactive Slider */}
              <div 
                ref={sliderRef}
                className="relative flex h-[4px] w-full rounded-full bg-surface-accent items-center cursor-pointer"
                onClick={(e) => {
                  if (!dragging && sliderRef.current) {
                    const value = getValueFromPosition(e.clientX)
                    const midPoint = (priceRange.min + priceRange.max) / 2
                    if (value < midPoint) {
                      handlePriceRangeChange('min', value)
                    } else {
                      handlePriceRangeChange('max', value)
                    }
                  }
                }}
              >
                <div 
                  className="absolute h-full bg-primary rounded-full"
                  style={{ 
                    left: `${minPercent}%`, 
                    right: `${100 - maxPercent}%` 
                  }}
                ></div>
                <div 
                  onMouseDown={handleMouseDown('min')}
                  className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-4 rounded-full bg-white border-2 border-primary cursor-grab active:cursor-grabbing shadow-lg hover:scale-110 transition-transform z-10 ${dragging === 'min' ? 'scale-125' : ''}`}
                  style={{ left: `${minPercent}%` }}
                  title="Drag to adjust minimum price"
                ></div>
                <div 
                  onMouseDown={handleMouseDown('max')}
                  className={`absolute top-1/2 -translate-y-1/2 translate-x-1/2 size-4 rounded-full bg-white border-2 border-primary cursor-grab active:cursor-grabbing shadow-lg hover:scale-110 transition-transform z-10 ${dragging === 'max' ? 'scale-125' : ''}`}
                  style={{ right: `${100 - maxPercent}%` }}
                  title="Drag to adjust maximum price"
                ></div>
              </div>
              
              {/* Input Fields */}
              <div className="flex gap-3 items-center">
                <div className="flex-1">
                  <label className="text-text-muted text-xs mb-1 block">Min Price</label>
                  <input
                    type="number"
                    min="50"
                    max="500"
                    value={priceRange.min}
                    onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                    className="w-full bg-surface-accent border border-surface-accent text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-text-muted text-xs mb-1 block">Max Price</label>
                  <input
                    type="number"
                    min="50"
                    max="500"
                    value={priceRange.max}
                    onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                    className="w-full bg-surface-accent border border-surface-accent text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex justify-between text-xs text-text-muted font-medium">
                <span>${priceRange.min}</span>
                <span>${priceRange.max}+</span>
              </div>
            </div>
          </div>
        </details>

        {/* Rating Accordion */}
        <details className="group" open>
          <summary className="flex cursor-pointer items-center justify-between py-2 list-none select-none">
            <p className="text-white text-sm font-bold leading-normal">Rating</p>
            <span className="material-symbols-outlined text-white transition-transform duration-300 group-open:rotate-180">expand_more</span>
          </summary>
          <div className="pt-2 flex flex-col gap-2">
            {ratingOptions.map((option) => (
              <label key={option.value} className="flex gap-x-3 py-1.5 items-center group/item cursor-pointer">
                <input 
                  type="checkbox"
                  checked={selectedRatings.includes(option.value)}
                  onChange={() => toggleRating(option.value)}
                  className="h-5 w-5 rounded border-surface-accent border-2 bg-transparent text-primary checked:bg-primary checked:border-primary focus:ring-0 focus:ring-offset-0 focus:outline-none" 
                />
                <div className="flex items-center text-yellow-500">
                  {renderStars(option.stars)}
                </div>
                <span className="text-text-muted text-xs pt-0.5">{option.label}</span>
              </label>
            ))}
          </div>
        </details>
      </div>
    </aside>
  )
}

export default Sidebar
