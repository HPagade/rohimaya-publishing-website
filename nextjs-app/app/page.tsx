import Link from 'next/link'
import { ArrowRight, Zap, DollarSign, Clock, FileText, Headphones, Image } from 'lucide-react'

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">
          Transform Your Manuscript with <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">AI</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Professional formatting, audiobook narration, and stunning book covers—all in minutes.
          Powered by AI. No design or technical skills required.
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
          <h2 className="text-4xl font-bold text-center mb-4">Complete AI Publishing Suite</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Everything you need to transform your manuscript into a professional, market-ready book
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500">
              <FileText className="text-blue-500 mb-4" size={48} />
              <h3 className="text-2xl font-semibold mb-3">AI Formatter</h3>
              <p className="text-gray-600 mb-4">
                Industry-standard formatting with automatic chapter detection, heading styles, and table of contents.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>✓ PDF, EPUB, Kindle formats</li>
                <li>✓ Professional layouts</li>
                <li>✓ 5-minute processing</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-purple-500">
              <Headphones className="text-purple-500 mb-4" size={48} />
              <h3 className="text-2xl font-semibold mb-3">Audiobook Generator</h3>
              <p className="text-gray-600 mb-4">
                Transform your book into professional audiobooks with AI narration in multiple voices.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>✓ 6 professional voices</li>
                <li>✓ Chapter-by-chapter generation</li>
                <li>✓ HD audio quality</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-pink-500">
              <Image className="text-pink-500 mb-4" size={48} />
              <h3 className="text-2xl font-semibold mb-3">Book Cover Creator</h3>
              <p className="text-gray-600 mb-4">
                Stunning book covers with AI art generation and text optimization for maximum impact.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>✓ Front, back & spine designs</li>
                <li>✓ AI-optimized copy</li>
                <li>✓ Print-ready quality</li>
              </ul>
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
              <h3 className="text-2xl font-semibold mb-2">Save Thousands</h3>
              <p className="text-gray-600">$29/month vs $1000+ for formatter, narrator, and designer</p>
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
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Manuscript?</h2>
          <p className="text-xl mb-8 opacity-90">Join authors who publish faster and smarter with PhoenixForge AI</p>
          <Link href="/signup" className="bg-white text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 inline-flex items-center gap-2 text-lg">
            Start Free Today <ArrowRight size={20} />
          </Link>
          <p className="mt-4 text-sm opacity-75">✓ Free tier available • ✓ All 3 tools included • ✓ No credit card required</p>
        </div>
      </section>
    </main>
  )
}
