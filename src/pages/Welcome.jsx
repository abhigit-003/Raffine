import { Link } from 'react-router-dom'

function Welcome() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-solid border-b-surface-accent bg-surface-dark px-4 md:px-10 py-3 shadow-md">
        <div className="flex items-center gap-4 text-white cursor-pointer">
          <div className="size-8 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-3xl">spa</span>
          </div>
          <h2 className="text-white text-xl font-bold leading-tight tracking-tight">Raffine</h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-white text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Discover Premium
              <span className="text-primary block">Services</span>
            </h1>
            <p className="text-text-muted text-lg md:text-xl mb-8 max-w-xl mx-auto">
              Find the best spas, salons, fitness centers, and wellness services in your area
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/login"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-lg transition-colors shadow-lg shadow-primary/20 text-lg"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Create Account
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-surface-dark border border-surface-accent rounded-xl p-6">
              <div className="text-primary mb-4">
                <span className="material-symbols-outlined text-4xl">spa</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-2">Premium Services</h3>
              <p className="text-text-muted text-sm">Discover top-rated spas and wellness centers</p>
            </div>
            <div className="bg-surface-dark border border-surface-accent rounded-xl p-6">
              <div className="text-primary mb-4">
                <span className="material-symbols-outlined text-4xl">calendar_today</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-2">Easy Booking</h3>
              <p className="text-text-muted text-sm">Book appointments with just a few clicks</p>
            </div>
            <div className="bg-surface-dark border border-surface-accent rounded-xl p-6">
              <div className="text-primary mb-4">
                <span className="material-symbols-outlined text-4xl">star</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-2">Trusted Reviews</h3>
              <p className="text-text-muted text-sm">Read authentic reviews from real customers</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Welcome

