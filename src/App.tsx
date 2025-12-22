import { Phone, ShoppingCart, MapPin, ChevronRight, LogIn } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [chatVisible, setChatVisible] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 w-full bg-orange-600 text-white text-sm py-2 z-50 px-4">
        <div className="max-w-7xl mx-auto text-center">
          Bulk Delivery Nationwide | Call Us 504-323-6496 | Text Us 844-407-3734
        </div>
      </div>

      <nav className="fixed top-9 w-full bg-white border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <img src="/logo.svg" alt="Hello Gravel Pro" className="h-12" />

          <div className="hidden md:flex items-center gap-8">
            <button className="text-gray-900 font-medium hover:text-orange-600 transition-colors">
              Shop
            </button>
            <button className="text-orange-600 font-medium hover:text-orange-700 transition-colors">
              Help Me Choose My Product
            </button>
            <button className="text-gray-900 font-medium hover:text-orange-600 transition-colors">
              Contractor Pricing
            </button>
            <button className="text-gray-900 font-medium hover:text-orange-600 transition-colors">
              Contact Us
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative flex items-center gap-2 text-gray-600 hover:text-orange-600">
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm">$0.00</span>
            </button>
            <Link
              to="/login"
              className="flex items-center gap-2 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-6 py-2 rounded font-bold transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8">
            Hello Gravel Pro
          </h1>


          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-8">Why Us?</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900">Fast Delivery</h3>
                <p className="text-gray-600 mt-2">We work with local pits and haulers to deliver on time, every time.</p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900">Nationwide Coverage</h3>
                <p className="text-gray-600 mt-2">Wherever your job is, we can source and deliver material nearby.</p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900">Simple Checkout</h3>
                <p className="text-gray-600 mt-2">Order in minutes online — no endless quote chains or phone tag.</p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900">Dedicated Account Manager</h3>
                <p className="text-gray-600 mt-2">One point of contact for quotes, scheduling, and repeat orders.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6">Under 1,000 Tons</h2>
              <p className="text-gray-600 mb-4">
                Get a quoted price
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                Quote Form
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>

            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6">Over 1,000 Tons</h2>
              <p className="text-gray-600 mb-4">
                Try our Instant quote tool for a budgetary number based on regional pricing
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                Instant Quote
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-6">Contact Us</h2>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-gray-900">504-323-6496</p>
                <p className="text-gray-600">Max Cannon, Sales Manager</p>
              </div>
              <a
                href="tel:504-323-6496"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex flex-col items-end gap-4">
          {chatVisible && (
            <div className="bg-white rounded-2xl shadow-xl p-4 max-w-xs border border-gray-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">👤</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    Hi there! Chuck here with Hello Gravel Pro. Can you tell me a bit about your project?
                  </p>
                </div>
              </div>
              <button
                onClick={() => setChatVisible(false)}
                className="text-gray-400 text-sm hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          )}
          <button
            onClick={() => setChatVisible(!chatVisible)}
            className="w-14 h-14 bg-orange-600 rounded-full flex items-center justify-center shadow-lg hover:bg-orange-700 transition-colors"
          >
            <span className="text-2xl">💬</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
