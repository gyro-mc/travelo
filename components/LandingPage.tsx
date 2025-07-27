"use client"
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, Calendar } from "lucide-react";
import { useState } from "react";

const featuredDestinations = [
    {
        id: 1,
        title: "Barcelona Tour",
        location: "Barcelona, Spain",
        price: "$2k",
        rating: 4.8,
        reviews: 2847,
        image: "/assets/images/card-img-1.png",
        size: "large"
    },
    {
        id: 2,
        title: "Amalfi Coast",
        location: "Italy",
        price: "$1.5k",
        rating: 4.9,
        reviews: 1523,
        image: "/assets/images/card-img-2.png",
        size: "small"
    },
    {
        id: 3,
        title: "London United State",
        location: "London, UK",
        price: "$3k",
        rating: 4.7,
        reviews: 3241,
        image: "/assets/images/card-img-3.png",
        size: "medium"
    },
    {
        id: 4,
        title: "Australia Tour",
        location: "Sydney, Australia",
        price: "$4k",
        rating: 4.8,
        reviews: 1876,
        image: "/assets/images/card-img-4.png",
        size: "medium"
    },
    {
        id: 5,
        title: "Santorini",
        location: "Greece",
        price: "$2.5k",
        rating: 4.9,
        reviews: 2156,
        image: "/assets/images/card-img-5.png",
        size: "small"
    }
];

const handpickedTrips = [
    {
        id: 1,
        title: "Thornridge Cir. Shiloh",
        location: "St. George's Ln Singapore",
        category: "Mountains",
        subcategory: "City",
        price: "$300",
        image: "/assets/images/card-img-1.png"
    },
    {
        id: 2,
        title: "Roraima Tepui",
        location: "Canaima Park, Venezuela",
        category: "Solo travel",
        subcategory: "Budget",
        price: "$750",
        image: "/assets/images/card-img-2.png"
    },
    {
        id: 3,
        title: "Socotra Island",
        location: "Yemen",
        category: "Luxury",
        subcategory: "Beach",
        price: "$870",
        image: "/assets/images/card-img-3.png"
    },
    {
        id: 4,
        title: "San Lake Baikal",
        location: "Siberia, Russia",
        category: "Sports",
        subcategory: "Adventure",
        price: "$604",
        image: "/assets/images/card-img-4.png"
    },
    {
        id: 5,
        title: "Araku Source d'Argent",
        location: "Seychelles",
        category: "Beach",
        subcategory: "Luxury",
        price: "$1200",
        image: "/assets/images/card-img-5.png"
    },
    {
        id: 6,
        title: "Kyoto Temples",
        location: "Japan",
        category: "Cultural",
        subcategory: "Adventure",
        price: "$950",
        image: "/assets/images/card-img-6.png"
    },
    {
        id: 7,
        title: "Torres Negras",
        location: "Patagonia, Chile",
        category: "Mountains",
        subcategory: "Hiking",
        price: "$800",
        image: "/assets/images/card-img-1.png"
    },
    {
        id: 8,
        title: "Zhangye Landform",
        location: "China",
        category: "Geological",
        subcategory: "Nature",
        price: "$650",
        image: "/assets/images/card-img-2.png"
    }
];

export default function LandingPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const tripsPerPage = 4;
    const totalPages = Math.ceil(handpickedTrips.length / tripsPerPage);

    const getCurrentTrips = () => {
        const startIndex = (currentPage - 1) * tripsPerPage;
        return handpickedTrips.slice(startIndex, startIndex + tripsPerPage);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-cyan-400 to-blue-500">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-lg">🌍</span>
                    </div>
                    <h1 className="text-xl font-bold text-white">Tourvisto</h1>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-white text-sm">Admin Panel</span>
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "w-8 h-8"
                            }
                        }}
                    />
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-16">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex-1 max-w-lg">
                        <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                            Plan Your<br />
                            Trip with Ease
                        </h1>
                        <p className="text-white/90 text-lg mb-8 leading-relaxed">
                            Discover amazing destinations, create personalized itineraries, and book unforgettable experiences with our AI-powered travel planner.
                        </p>
                        <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg">
                            Get Started
                        </Button>
                    </div>

                    <div className="flex-1 relative">
                        <Image
                            src="/assets/images/hero-img.png"
                            alt="Travel Adventure"
                            width={600}
                            height={400}
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Featured Travel Destinations */}
            <section className="px-6 py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Travel Destinations</h2>
                    <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mb-8"></div>

                    <div className="grid grid-cols-12 gap-4 h-[500px]">
                        {/* Large card - Barcelona */}
                        <div className="col-span-6 row-span-2 relative group cursor-pointer overflow-hidden rounded-2xl">
                            <Image
                                src={featuredDestinations[0].image}
                                alt={featuredDestinations[0].title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <Badge className="bg-white/20 text-white mb-2">{featuredDestinations[0].price}</Badge>
                                <h3 className="text-2xl font-bold mb-1">{featuredDestinations[0].title}</h3>
                                <p className="flex items-center gap-1 text-white/90">
                                    <MapPin className="w-4 h-4" />
                                    {featuredDestinations[0].location}
                                </p>
                                <div className="flex items-center gap-1 mt-2">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm">{featuredDestinations[0].rating} ({featuredDestinations[0].reviews.toLocaleString()})</span>
                                </div>
                            </div>
                        </div>

                        {/* Small cards on the right */}
                        <div className="col-span-3 relative group cursor-pointer overflow-hidden rounded-2xl">
                            <Image
                                src={featuredDestinations[1].image}
                                alt={featuredDestinations[1].title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <Badge className="bg-white/20 text-white mb-2 text-xs">{featuredDestinations[1].price}</Badge>
                                <h3 className="text-lg font-bold mb-1">{featuredDestinations[1].title}</h3>
                                <p className="flex items-center gap-1 text-white/90 text-sm">
                                    <MapPin className="w-3 h-3" />
                                    {featuredDestinations[1].location}
                                </p>
                            </div>
                        </div>

                        <div className="col-span-3 relative group cursor-pointer overflow-hidden rounded-2xl">
                            <Image
                                src={featuredDestinations[4].image}
                                alt={featuredDestinations[4].title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <Badge className="bg-white/20 text-white mb-2 text-xs">{featuredDestinations[4].price}</Badge>
                                <h3 className="text-lg font-bold mb-1">{featuredDestinations[4].title}</h3>
                                <p className="flex items-center gap-1 text-white/90 text-sm">
                                    <MapPin className="w-3 h-3" />
                                    {featuredDestinations[4].location}
                                </p>
                            </div>
                        </div>

                        {/* Medium cards on bottom right */}
                        <div className="col-span-3 relative group cursor-pointer overflow-hidden rounded-2xl">
                            <Image
                                src={featuredDestinations[2].image}
                                alt={featuredDestinations[2].title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <Badge className="bg-white/20 text-white mb-2 text-xs">{featuredDestinations[2].price}</Badge>
                                <h3 className="text-lg font-bold mb-1">{featuredDestinations[2].title}</h3>
                                <p className="flex items-center gap-1 text-white/90 text-sm">
                                    <MapPin className="w-3 h-3" />
                                    {featuredDestinations[2].location}
                                </p>
                            </div>
                        </div>

                        <div className="col-span-3 relative group cursor-pointer overflow-hidden rounded-2xl">
                            <Image
                                src={featuredDestinations[3].image}
                                alt={featuredDestinations[3].title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <Badge className="bg-white/20 text-white mb-2 text-xs">{featuredDestinations[3].price}</Badge>
                                <h3 className="text-lg font-bold mb-1">{featuredDestinations[3].title}</h3>
                                <p className="flex items-center gap-1 text-white/90 text-sm">
                                    <MapPin className="w-3 h-3" />
                                    {featuredDestinations[3].location}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Handpicked Trips */}
            <section className="px-6 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Handpicked Trips</h2>
                            <p className="text-gray-600">Discover and explore top-rated travel destinations and experiences</p>
                        </div>
                    </div>

                    {/* Trip Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {getCurrentTrips().map((trip) => (
                            <div key={trip.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
                                <div className="relative h-48">
                                    <Image
                                        src={trip.image}
                                        alt={trip.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <Badge className="absolute top-3 right-3 bg-white text-gray-900 font-semibold">
                                        {trip.price}
                                    </Badge>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg text-gray-900 mb-1">{trip.title}</h3>
                                    <p className="text-gray-600 text-sm mb-3 flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {trip.location}
                                    </p>
                                    <div className="flex gap-2">
                                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                                            {trip.category}
                                        </Badge>
                                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                            {trip.subcategory}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>← Previous</span>
                        </div>

                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${currentPage === i + 1
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>Next →</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white px-6 py-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">🌍</span>
                        </div>
                        <h1 className="text-xl font-bold">Tourvisto</h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 bg-gray-800 rounded-full px-4 py-2">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">A</div>
                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">P</div>
                            <span className="text-sm">2</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}