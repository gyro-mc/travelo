import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  return (
    <div>
      <SignedIn>
        <LandingPage />
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Tourvisto
            </h1>
            <p className="text-gray-600 mb-6">
              Please sign in to access your travel planning dashboard
            </p>
            <SignInButton mode="modal">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
    </div>
  );
}
