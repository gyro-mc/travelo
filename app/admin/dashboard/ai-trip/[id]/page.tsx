"use client"
import Image from "next/image"
import { useAuth } from "@clerk/nextjs"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Trip } from "@/lib/utils"
import { Calendar, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
export type TripDetail = {
    name: string;
    description: string;
    estimatedPrice: string; // e.g. "$1200"
    duration: number;
    budget: string;
    travelStyle: string;
    country: string;
    interests: string[]; // Assuming it's an array of interest strings
    groupType: string;
    bestTimeToVisit: string[]; // e.g. ['🌸 Season (from month to month): reason']
    weatherInfo: string[];     // e.g. ['☀️ Season: temp (temp)']
    location: {
        city: string;
        coordinates: [number, number]; // [latitude, longitude]
        openStreetMap: string;
    };
    itinerary: {
        day: number;
        location: string;
        activities: {
            time: string; // e.g., "Morning", "Afternoon", "Evening"
            description: string;
        }[];
    }[];
};


export default function Page() {
    const { getToken } = useAuth()
    const [Trip, setTrip] = useState<Trip>()
    const params = useParams()
    const [tripDetail, setTripDetail] = useState<TripDetail | null>(null)
    const tripId = params.id
    useEffect(() => {
        const fetchTrip = async () => {
            const token = await getToken()
            try {
                const response = await fetch(`/api/admin/trips/trip`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(tripId)
                })
                if (!response.ok) {
                    throw new Error("failed to fetch the trip")
                }
                const tripData = await response.json()
                setTrip(tripData)
                // Parse and set tripDetail when tripData is received
                if (tripData?.tripDetail) {

                    setTripDetail(JSON.parse(tripData.tripDetail))

                }
            }
            catch (error) {
                console.error("Error fetching trip:", error)
            }
        }

        if (tripId) {
            fetchTrip()
        }
    }, [tripId, getToken])
    return (
        <div className="p-6">
            {!tripDetail ? (
                <div>Loading trip details...</div>
            ) : (
                <div className="h-auto flex flex-col gap-14">
                    <div className="w-full flex flex-col ">
                        <h1 className="text-xl font-bold">Trips</h1>
                        <p className="opacity-[0.7]">View and edit Ai-generated Travel plans</p>
                    </div>
                    <div className="container mx-auto w-[50%] flex-col flex gap-4">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-3xl font-bold">{tripDetail.name}</h1>
                            <div className="flex flex-row gap-4">
                                <p className="flex flex-row gap-2">

                                    <Calendar />
                                    {tripDetail.duration} days plan
                                </p>
                                <p className="flex flex-row gap-2">
                                    <MapPin />
                                    {tripDetail.location.city}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-4">
                            <div className="flex-2/3 relative h-64 rounded-2xl">
                                {Trip?.imageUrls?.[0] ? (
                                    <Image
                                        src={Trip.imageUrls[0]}
                                        alt="image"
                                        fill
                                        className="object-cover rounded-2xl"
                                    />
                                ) : (
                                    <Image
                                        src="/assets/images/auth-img.webp"
                                        alt="no img"
                                        fill
                                        className="object-cover rounded-2xl"
                                    />
                                )}
                            </div>
                            <div className="flex-1/3 flex flex-col gap-4">
                                <div className="flex-1/2 relative h-64 rounded-2xl">
                                    {Trip?.imageUrls?.[1] ? (
                                        <Image
                                            src={Trip.imageUrls[1]}
                                            alt="image"
                                            fill
                                            className="object-cover rounded-2xl"
                                        />
                                    ) : (
                                        <Image
                                            src="/assets/images/auth-img.webp"
                                            alt="no img"
                                            fill
                                            className="object-cover rounded-2xl"
                                        />
                                    )}
                                </div>
                                <div className="flex-1/2 relative h-64 rounded-2xl">
                                    {Trip?.imageUrls?.[2] ? (
                                        <Image
                                            src={Trip.imageUrls[2]}
                                            alt="image"
                                            fill
                                            className="object-cover rounded-2xl"
                                        />
                                    ) : (
                                        <Image
                                            src="/assets/images/auth-img.webp"
                                            alt="no img"
                                            fill
                                            className="object-cover rounded-2xl"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-9">
                            <Badge className="bg-blue-100 text-blue-800">{tripDetail.groupType}</Badge>
                            <Badge className="bg-green-100 text-green-800">{tripDetail.interests}</Badge>
                            <Badge className="bg-purple-100 text-purple-800">{tripDetail.budget}</Badge>
                            <Badge className="bg-orange-100 text-orange-800">{tripDetail.travelStyle}</Badge>

                        </div>
                        {/* Trip Header with Price */}
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold mb-2">{tripDetail.name}</h1>
                                    <p className="text-gray-600 text-sm">{tripDetail.travelStyle}, {tripDetail.groupType}, and Harmony</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-bold">{tripDetail.estimatedPrice}</div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {tripDetail.description}
                                </p>
                            </div>

                            {/* Itinerary */}
                            <div className="space-y-6">
                                {tripDetail.itinerary.map((dayPlan, index) => (
                                    <div key={index}>
                                        <h3 className="font-semibold text-gray-800 mb-3">
                                            Day {dayPlan.day}: {dayPlan.location}
                                        </h3>
                                        <ul className="space-y-2">
                                            {dayPlan.activities.map((activity, activityIndex) => (
                                                <li key={activityIndex} className="flex items-start text-sm">
                                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                                    <span className="text-gray-700">{activity.description}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Best Time to Visit */}
                            <div className="mt-8">
                                <h3 className="font-semibold text-gray-800 mb-3">Best Time to Visit:</h3>
                                <ul className="space-y-2">
                                    {tripDetail.bestTimeToVisit.map((time, index) => (
                                        <li key={index} className="flex items-start text-sm">
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                            <span className="text-gray-700">{time}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Weather Info */}
                            <div className="mt-6">
                                <h3 className="font-semibold text-gray-800 mb-3">Weather Info:</h3>
                                <ul className="space-y-2">
                                    {tripDetail.weatherInfo.map((weather, index) => (
                                        <li key={index} className="flex items-start text-sm">
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                            <span className="text-gray-700">{weather}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}