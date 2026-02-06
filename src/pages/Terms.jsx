import { Link } from 'react-router-dom'

function Terms() {
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

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="bg-surface-dark border border-surface-accent rounded-xl p-8 shadow-lg">
          <h1 className="text-white text-3xl font-bold mb-6">Terms and Conditions</h1>
          
          <div className="space-y-6 text-text-muted text-sm leading-relaxed">
            <section>
              <h2 className="text-white text-xl font-bold mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using Raffine, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-3">2. Use License</h2>
              <p>Permission is granted to temporarily use Raffine for personal, non-commercial transitory viewing only.</p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-3">3. Service Bookings</h2>
              <p>All service bookings are subject to availability and confirmation by the service provider. Cancellation policies vary by provider.</p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-3">4. User Accounts</h2>
              <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-3">5. Limitation of Liability</h2>
              <p>Raffine shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the platform.</p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-surface-accent">
            <Link to="/register" className="text-primary hover:text-primary/80 transition-colors text-sm font-medium">
              ← Back to Registration
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Terms

