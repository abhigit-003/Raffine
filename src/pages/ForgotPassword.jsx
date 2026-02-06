import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1000)
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-solid border-b-surface-accent bg-surface-dark px-4 md:px-10 py-3 shadow-md">
        <Link to="/" className="flex items-center gap-4 text-white cursor-pointer">
          <div className="size-8 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-3xl">spa</span>
          </div>
          <h2 className="text-white text-xl font-bold leading-tight tracking-tight">Raffine</h2>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-surface-dark border border-surface-accent rounded-xl p-8 shadow-lg">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-white text-3xl font-bold mb-2">Forgot Password?</h1>
                  <p className="text-text-muted text-sm">Enter your email to reset your password</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-text-muted text-[20px]">mail</span>
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (errors.email) setErrors({ ...errors, email: '' })
                        }}
                        className={`w-full pl-12 pr-4 py-3 bg-surface-accent border ${
                          errors.email ? 'border-red-500' : 'border-surface-accent'
                        } rounded-lg text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-red-500 text-xs">{errors.email}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="mb-6">
                  <span className="material-symbols-outlined text-6xl text-primary">mark_email_read</span>
                </div>
                <h2 className="text-white text-2xl font-bold mb-2">Check Your Email</h2>
                <p className="text-text-muted text-sm mb-6">
                  We've sent a password reset link to <strong className="text-white">{email}</strong>
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg shadow-primary/20"
                >
                  Back to Login
                </button>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link to="/login" className="text-primary text-sm font-medium hover:text-primary/80 transition-colors">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ForgotPassword

