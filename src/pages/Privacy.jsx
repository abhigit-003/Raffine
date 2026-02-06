import { Link } from 'react-router-dom'

function Privacy() {
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
          <h1 className="text-white text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="space-y-6 text-text-muted text-sm leading-relaxed">
            <section>
              <h2 className="text-white text-xl font-bold mb-3">1. Information We Collect</h2>
              <p>We collect information that you provide directly to us, including name, email address, phone number, and booking preferences.</p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-3">2. How We Use Your Information</h2>
              <p>We use the information we collect to provide, maintain, and improve our services, process bookings, and communicate with you.</p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-3">3. Information Sharing</h2>
              <p>We do not sell your personal information. We may share your information with service providers to fulfill your bookings.</p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-3">4. Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold mb-3">5. Your Rights</h2>
              <p>You have the right to access, update, or delete your personal information at any time through your account settings.</p>
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

export default Privacy

