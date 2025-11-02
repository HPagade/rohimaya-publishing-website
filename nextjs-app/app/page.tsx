import Link from 'next/link'
import { ArrowRight, Zap, DollarSign, Clock } from 'lucide-react'

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">
          Format Your Book in <span className="text-orange-500">5 Minutes</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Upload your manuscript. Get professionally formatted PDF, EPUB, and audiobooks.
          Powered by AI. No design skills required.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup" className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 flex items-center gap-2">
            Start Free <ArrowRight size={20} />
          </Link>
          <Link href="/pricing" className="border-2 border-gray-300 px-8 py-4 rounded-lg font-semibold hover:border-orange-500">
            View Pricing
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-500">✓ 1 free format per month • ✓ No credit card required</p>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-2xl font-semibold mb-3">1. Upload</h3>
              <p className="text-gray-600">Upload your .docx, .pdf, or .txt manuscript. We support up to 300 pages.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-semibold mb-3">2. AI Formats</h3>
              <p className="text-gray-600">Our AI detects chapters, formats headings, and creates professional layouts.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">📥</div>
              <h3 className="text-2xl font-semibold mb-3">3. Download</h3>
              <p className="text-gray-600">Get PDF, EPUB, and Kindle files ready to publish on Amazon KDP or anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Clock className="mx-auto mb-4 text-orange-500" size={48} />
              <h3 className="text-2xl font-semibold mb-2">Save Time</h3>
              <p className="text-gray-600">2-5 minutes vs days of manual formatting</p>
            </div>
            <div>
              <DollarSign className="mx-auto mb-4 text-orange-500" size={48} />
              <h3 className="text-2xl font-semibold mb-2">Save Money</h3>
              <p className="text-gray-600">$29/month vs $300+ per book from designers</p>
            </div>
            <div>
              <Zap className="mx-auto mb-4 text-orange-500" size={48} />
              <h3 className="text-2xl font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600">Real-time processing with AI technology</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Format Your Book?</h2>
          <p className="text-xl mb-8 opacity-90">Join hundreds of authors who trust PhoenixForge</p>
          <Link href="/signup" className="bg-white text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 inline-flex items-center gap-2">
            Get Started Free <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  )
}
