"use client"
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function AuthPage() {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            {/* Main Container */}
            <div className="relative w-full max-w-6xl h-[700px] rounded-3xl overflow-hidden shadow-2xl">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/assets/images/auth-img.webp"
                        alt="Travel Adventure Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Overlay for better contrast */}
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                {/* Auth Card */}
                <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md mx-4 shadow-xl">
                        {/* Logo and Title */}
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">🌍</span>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">Tourvisto</h1>
                            </div>

                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Admin Dashboard Login
                            </h2>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Sign in with Google to manage destinations,<br />
                                itineraries, and user activity with ease.
                            </p>
                        </div>

                        {/* Custom Styled Clerk SignIn */}
                        <div className="clerk-signin-wrapper">
                            <SignIn
                                appearance={{
                                    elements: {
                                        rootBox: "w-full",
                                        card: "shadow-none bg-transparent border-none p-0",
                                        headerTitle: "hidden",
                                        headerSubtitle: "hidden",
                                        socialButtonsBlockButton: "w-full bg-blue-600 hover:bg-blue-700 text-white border-none rounded-lg py-3 px-4 font-medium transition-colors duration-200 flex items-center justify-center gap-2",
                                        socialButtonsBlockButtonText: "text-white font-medium",
                                        dividerLine: "bg-gray-300",
                                        dividerText: "text-gray-500 text-sm",
                                        formFieldInput: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200",
                                        formFieldLabel: "text-gray-700 font-medium mb-2",
                                        formButtonPrimary: "w-full bg-blue-600 hover:bg-blue-700 text-white border-none rounded-lg py-3 px-4 font-medium transition-colors duration-200",
                                        footerActionLink: "text-blue-600 hover:text-blue-700 font-medium",
                                        identityPreviewText: "text-gray-700",
                                        identityPreviewEditButton: "text-blue-600 hover:text-blue-700",
                                        formResendCodeLink: "text-blue-600 hover:text-blue-700",
                                        otpCodeFieldInput: "border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                                        alertText: "text-red-600 text-sm",
                                        formFieldSuccessText: "text-green-600 text-sm",
                                        formFieldErrorText: "text-red-600 text-sm",
                                    },
                                    layout: {
                                        socialButtonsPlacement: "top",
                                        showOptionalFields: false,
                                    },
                                }}
                                redirectUrl="/admin/dashboard"
                                signUpUrl="/sign-up"
                            />
                        </div>
                    </div>
                </div>

                {/* Top Left Auth Label */}
                <div className="absolute top-6 left-6 z-20">
                    <span className="text-white/80 text-sm font-medium bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        Auth
                    </span>
                </div>
            </div>
        </div>
    );
}