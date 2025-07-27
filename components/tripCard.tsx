"use client"
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge"
import Image from "next/image"
import { CiLocationOn } from "react-icons/ci";

interface tripCardType {
    imageUrl: string,
    tripDetails: string,
    userId: string,
    tripId: string
}

// Array of random color combinations for badges
const badgeColors = [
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
    "bg-yellow-100 text-yellow-800",
    "bg-indigo-100 text-indigo-800",
    "bg-red-100 text-red-800",
    "bg-orange-100 text-orange-800",
    "bg-teal-100 text-teal-800",
    "bg-cyan-100 text-cyan-800"
];

// Function to get random color
const getRandomBadgeColor = () => {
    return badgeColors[Math.floor(Math.random() * badgeColors.length)];
};

export default function TripCard({ data }: { data: tripCardType }) {
    const router = useRouter()
    const { imageUrl, tripDetails, tripId } = data
    const parsedTripDetails = JSON.parse(tripDetails)

    return (
        <div
            className="w-[300px] h-[400px] flex flex-col cursor-pointer rounded-b-lg relative bg-white shadow-lg hover:scale-110 transition-transform duration-300"
            onClick={() => router.push(`/admin/dashboard/ai-trip/${tripId}`)}
        >
            <div className="relative flex-3/5 rounded-t-2xl">
                <Image fill src={imageUrl} alt="trip-main-image" className="object-cover rounded-t-2xl" />
            </div>
            <div className="flex-2/5 p-2 flex flex-col gap-2">
                <h1 className="text-xl font-bold">{parsedTripDetails.name}</h1>
                <p className=" flex flex-row items-center gap-2"><CiLocationOn /> {parsedTripDetails.location.city}</p>
                <div className=" flex flex-row gap-4">
                    <Badge className={getRandomBadgeColor()}>{parsedTripDetails.interests}</Badge>
                    <Badge className={getRandomBadgeColor()}>{parsedTripDetails.groupType}</Badge>
                </div>
            </div>
            <Badge className="absolute top-2 right-2 bg-white text-black">{parsedTripDetails.estimatedPrice}</Badge>
        </div>
    )
}