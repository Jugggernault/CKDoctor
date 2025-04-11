import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, Activity, Shield, LineChart, CheckCircle } from "lucide-react"
import Logo from "@/components/Logo"

const Home = () => {
  return (
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Logo />
              <div className="flex space-x-4">
                <Link to="/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign up</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-ckd-light py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                  Predict, Prevent, <span className="text-ckd-primary">Protect</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-lg">
                  Advanced CKD predictive analytics designed for healthcare professionals to improve patient outcomes.
                </p>
                <div className="flex space-x-4">
                  <Link to="/signup">
                    <Button className="px-8 py-6 text-lg" size="lg">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/learn">
                    <Button variant="outline" className="px-8 py-6 text-lg" size="lg">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-ckd-primary rounded-full opacity-10 blur-3xl transform -translate-x-4 translate-y-4"></div>
                  <div className="relative bg-white p-8 rounded-xl shadow-xl border border-gray-100">
                    <div className="w-full h-[300px] bg-gray-50 rounded-lg mb-4 flex items-center justify-center">
                      <Activity size={120} className="text-ckd-primary opacity-30" />
                    </div>
                    <div className="space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CKD Predictor?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our platform provides advanced tools to help healthcare professionals make informed decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-ckd-light rounded-lg flex items-center justify-center mb-4">
                  <LineChart className="w-6 h-6 text-ckd-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Accurate Predictions</h3>
                <p className="text-gray-600">
                  Machine learning algorithms trained on extensive clinical data to provide reliable CKD stage
                  predictions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-ckd-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">GDPR Compliant</h3>
                <p className="text-gray-600">
                  We maintain strict data protection standards to ensure patient information remains secure and private.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-ckd-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Evidence-Based</h3>
                <p className="text-gray-600">
                  Recommendations based on the latest clinical guidelines and research in nephrology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ckd-primary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to improve your CKD management?</h2>
            <Link to="/signup">
              <Button
                  variant="secondary"
                  size="lg"
                  className="px-8 py-6 text-lg bg-white text-ckd-primary hover:bg-gray-100"
              >
                Sign Up Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <Logo className="text-white" />
                <p className="mt-4 text-gray-300">Advanced predictive analytics for chronic kidney disease management.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Testimonials
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Research
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      GDPR Compliance
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} CKD Predictor. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
  )
}

export default Home
