"use client"
import React from "react";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Shield,
  MapPin,
  Sparkles,
  Globe,
} from "lucide-react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  const handleNavigateToDashboard = () => {
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <MapPin className="h-8 w-8 text-indigo-600 mr-2" />
                <h1 className="text-2xl font-bold text-indigo-600">Travelo</h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#features"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  How It Works
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Reviews
                </a>
                <button
                  onClick={handleNavigateToDashboard}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Start Planning
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Plan your perfect</span>{" "}
                  <span className="block text-indigo-600 xl:inline">
                    trip with AI
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Create personalized travel itineraries in seconds with our
                  AI-powered platform. From hidden gems to must-see attractions,
                  we'll craft the perfect journey for you.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={handleNavigateToDashboard}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Create My Trip
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={handleNavigateToDashboard}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    >
                      See How It Works
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative z-10 text-center text-white">
              <Globe className="h-24 w-24 mx-auto mb-4 opacity-80" />
              <h3 className="text-2xl font-bold mb-2">Explore the World</h3>
              <p className="text-lg opacity-90">AI-powered travel planning</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for the perfect trip
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our AI-powered platform combines intelligent planning with
              seamless trip management.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Sparkles className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  AI Trip Generation
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Create personalized itineraries in seconds using Google's
                  advanced AI technology.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Secure & Reliable
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Your travel data is protected with enterprise-grade security
                  and authentication.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Trip Management
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Organize, view, and manage all your travel plans in one
                  convenient dashboard.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Payment Integration
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Book your trips seamlessly with integrated payment processing
                  and booking links.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              How It Works
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Plan your trip in 3 simple steps
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tell Us Your Preferences
              </h3>
              <p className="text-gray-600">
                Share your destination, travel dates, budget, and interests with
                our AI assistant.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                AI Creates Your Itinerary
              </h3>
              <p className="text-gray-600">
                Our advanced AI generates a personalized travel plan with
                activities, restaurants, and attractions.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Book & Enjoy
              </h3>
              <p className="text-gray-600">
                Review your itinerary, make bookings through our platform, and
                embark on your perfect trip.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Loved by travelers worldwide
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-gray-50 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Travelo planned the most amazing 10-day Europe trip for me! The
                AI suggestions were spot-on and saved me hours of research."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-200 rounded-full mr-3 flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold">SM</span>
                </div>
                <div>
                  <p className="font-semibold">Sarah Martinez</p>
                  <p className="text-sm text-gray-500">Travel Blogger</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "As a busy professional, I love how quickly Travelo creates
                detailed itineraries. The booking integration is seamless!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-200 rounded-full mr-3 flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold">MJ</span>
                </div>
                <div>
                  <p className="font-semibold">Michael Johnson</p>
                  <p className="text-sm text-gray-500">Business Executive</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The AI found hidden gems in Tokyo that I never would have
                discovered on my own. Best travel planning tool ever!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-200 rounded-full mr-3 flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold">EL</span>
                </div>
                <div>
                  <p className="font-semibold">Emily Liu</p>
                  <p className="text-sm text-gray-500">Adventure Seeker</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready for your next adventure?</span>
            <span className="block">Start planning with AI today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Join thousands of travelers who trust Travelo to create their
            perfect trips.
          </p>
          <button
            onClick={handleNavigateToDashboard}
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            Plan My Trip Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12.017 0C8.396 0 7.929.013 6.71.072 5.493.131 4.73.333 4.058.63c-.68.3-1.18.66-1.68 1.15-.5.49-.85.99-1.15 1.68-.3.67-.5 1.43-.56 2.65C.013 7.93 0 8.4 0 12.017s.013 4.086.072 5.304c.06 1.22.26 1.98.56 2.65.3.68.65 1.18 1.15 1.68.49.5.99.85 1.68 1.15.67.3 1.43.5 2.65.56 1.218.059 1.689.072 5.304.072s4.086-.013 5.304-.072c1.22-.06 1.98-.26 2.65-.56.68-.3 1.18-.65 1.68-1.15.5-.49.85-.99 1.15-1.68.3-.67.5-1.43.56-2.65.059-1.218.072-1.689.072-5.304s-.013-4.086-.072-5.304c-.06-1.22-.26-1.98-.56-2.65-.3-.68-.65-1.18-1.15-1.68-.49-.5-.99-.85-1.68-1.15-.67-.3-1.43-.5-2.65-.56C16.086.013 15.615 0 12.017 0zM12.017 2.162c3.204 0 3.584.012 4.85.07 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.06 1.265.072 1.645.072 4.849s-.012 3.584-.072 4.849c-.053 1.17-.249 1.805-.413 2.227-.218.562-.477.96-.896 1.382-.419.419-.819.679-1.381.896-.422.164-1.057.36-2.227.413-1.266.06-1.646.072-4.85.072s-3.584-.012-4.849-.072c-1.17-.053-1.805-.249-2.228-.413-.562-.217-.96-.477-1.382-.896-.419-.419-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.06-1.265-.072-1.645-.072-4.849s.012-3.584.072-4.849c.053-1.17.249-1.805.413-2.228.217-.562.477-.96.896-1.382.419-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413 1.265-.06 1.645-.072 4.849-.072z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M12.017 5.838a6.179 6.179 0 100 12.358 6.179 6.179 0 000-12.358zM12.017 16a4 4 0 110-8 4 4 0 010 8z"
                  clipRule="evenodd"
                />
                <path d="M18.406 4.594a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2024 Travelo, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
