"use client"
import StatsCard from "@/components/statsCard";
import TripCard from "@/components/tripCard";
import TripTrends from "@/components/tripTrends";
import LatestUserSignups from "@/components/LatestUserSignups";
import LatestTripBookings from "@/components/LatestTripBookings";
import { Button } from "@/components/ui/button"
import UserGrowth from "@/components/UserGrowth";
import { useUser } from "@clerk/nextjs"
import { FaPlus } from "react-icons/fa";

export default function Page() {
    const { user } = useUser()

    return (
        <div className="bg-dashboard-bg p-4 min-h-screen pr-10 pl-6 flex flex-col gap-8">
            <div className="flex flex-row justify-between items-end ">
                <div className="flex flex-col items-start gap-3">
                    <h1 className="font-semibold text-xl">Welcome {user?.fullName}</h1>
                    <p className="opacity-[0.7]">Track activity, trends, and popular destinations in real time</p>
                </div>
                <Button className="py-5 px-2 bg-blue-500">
                    <FaPlus />
                    Create a trip
                </Button>
            </div>
            <div className=" w-full my-6 flex flex-row  justify-start  gap-7">
                <StatsCard data={{
                    statsData: [
                        {
                            name: 'Page A',
                            uv: 4000,
                            pv: 2400,
                            amt: 2400,
                        },
                        {
                            name: 'Page B',
                            uv: 3000,
                            pv: 1398,
                            amt: 2210,
                        },
                        {
                            name: 'Page C',
                            uv: 2000,
                            pv: 9800,
                            amt: 2290,
                        },
                        {
                            name: 'Page D',
                            uv: 2780,
                            pv: 3908,
                            amt: 2000,
                        },
                        {
                            name: 'Page E',
                            uv: 1890,
                            pv: 4800,
                            amt: 2181,
                        },
                        {
                            name: 'Page F',
                            uv: 2390,
                            pv: 3800,
                            amt: 2500,
                        },
                        {
                            name: 'Page G',
                            uv: 3490,
                            pv: 4300,
                            amt: 2100,
                        },
                    ], mainInfo: 12450,
                    secondaryInfo: 12,
                    title: "total Users"
                }} />
                <StatsCard data={{
                    statsData: [
                        {
                            name: 'Page A',
                            uv: 4000,
                            pv: 2400,
                            amt: 2400,
                        },
                        {
                            name: 'Page B',
                            uv: 3000,
                            pv: 1398,
                            amt: 2210,
                        },
                        {
                            name: 'Page C',
                            uv: 2000,
                            pv: 9800,
                            amt: 2290,
                        },
                        {
                            name: 'Page D',
                            uv: 2780,
                            pv: 3908,
                            amt: 2000,
                        },
                        {
                            name: 'Page E',
                            uv: 1890,
                            pv: 4800,
                            amt: 2181,
                        },
                        {
                            name: 'Page F',
                            uv: 2390,
                            pv: 3800,
                            amt: 2500,
                        },
                        {
                            name: 'Page G',
                            uv: 3490,
                            pv: 4300,
                            amt: 2100,
                        },
                    ], mainInfo: 12450,
                    secondaryInfo: 12,
                    title: "total Users"
                }} />
                <StatsCard data={{
                    statsData: [
                        {
                            name: 'Page A',
                            uv: 4000,
                            pv: 2400,
                            amt: 2400,
                        },
                        {
                            name: 'Page B',
                            uv: 3000,
                            pv: 1398,
                            amt: 2210,
                        },
                        {
                            name: 'Page C',
                            uv: 2000,
                            pv: 9800,
                            amt: 2290,
                        },
                        {
                            name: 'Page D',
                            uv: 2780,
                            pv: 3908,
                            amt: 2000,
                        },
                        {
                            name: 'Page E',
                            uv: 1890,
                            pv: 4800,
                            amt: 2181,
                        },
                        {
                            name: 'Page F',
                            uv: 2390,
                            pv: 3800,
                            amt: 2500,
                        },
                        {
                            name: 'Page G',
                            uv: 3490,
                            pv: 4300,
                            amt: 2100,
                        },
                    ], mainInfo: 12450,
                    secondaryInfo: 12,
                    title: "total Users"
                }} />
            </div>
            <div className="w-full">
                <div className="overflow-x-auto flex flex-nowrap gap-6 pb-6 scrollbar-thin" style={{ maxWidth: "100%" }}>
                    <TripCard data={{
                        imageUrl: "/assets/images/david.webp",
                        name: "Thomidge Cir.shioh",
                        location: "stsdlkfjlksdjf",
                        tags: ["moutains", "city"],
                        price: 299
                    }} />
                    <TripCard data={{
                        imageUrl: "/assets/images/david.webp",
                        name: "Thomidge Cir.shioh",
                        location: "stsdlkfjlksdjf",
                        tags: ["moutains", "city"],
                        price: 299
                    }} />
                    <TripCard data={{
                        imageUrl: "/assets/images/david.webp",
                        name: "Thomidge Cir.shioh",
                        location: "stsdlkfjlksdjf",
                        tags: ["moutains", "city"],
                        price: 299
                    }} />
                    <TripCard data={{
                        imageUrl: "/assets/images/david.webp",
                        name: "Thomidge Cir.shioh",
                        location: "stsdlkfjlksdjf",
                        tags: ["moutains", "city"],
                        price: 299
                    }} />
                    <TripCard data={{
                        imageUrl: "/assets/images/david.webp",
                        name: "Thomidge Cir.shioh",
                        location: "stsdlkfjlksdjf",
                        tags: ["moutains", "city"],
                        price: 299
                    }} />

                </div>
            </div>
            <div className="space-y-6 flex flex-row gap-4 items-start ">
                <UserGrowth data={{
                    monthlyData: [
                        { month: 'Jan', users: 2300, growth: 2300 },
                        { month: 'Feb', users: 1800, growth: 1800 },
                        { month: 'Mar', users: 3200, growth: 3200 },
                        { month: 'Apr', users: 1600, growth: 1600 },
                        { month: 'May', users: 1900, growth: 1900 },
                        { month: 'Jun', users: 1800, growth: 1800 }
                    ]
                }} />

                <TripTrends data={{
                    tripData: [
                        { category: 'Beach', percentage: 50, isHighlighted: false },
                        { category: 'Cultural', percentage: 15, isHighlighted: false },
                        { category: 'City', percentage: 28, isHighlighted: false },
                        { category: 'Nature', percentage: 20, isHighlighted: false },
                        { category: 'Culinary', percentage: 40, isHighlighted: true },
                        { category: 'Relax', percentage: 18, isHighlighted: false },
                        { category: 'Adventure', percentage: 32, isHighlighted: false }
                    ]
                }} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LatestUserSignups data={{
                    users: [
                        {
                            id: 1,
                            name: "James Anderson",
                            avatar: "/assets/images/james.webp",
                            itineraryCreated: 12
                        },
                        {
                            id: 2,
                            name: "Michael Johnson",
                            avatar: "/assets/images/michael.webp",
                            itineraryCreated: 21
                        },
                        {
                            id: 3,
                            name: "David Brown",
                            avatar: "/assets/images/david.webp",
                            itineraryCreated: 15
                        },
                        {
                            id: 4,
                            name: "Orlando Diggs",
                            avatar: "/assets/images/orlando.webp",
                            itineraryCreated: 26
                        }
                    ]
                }} />

                <LatestTripBookings data={{
                    bookings: [
                        {
                            id: 1,
                            destination: "Thornridge Cir. Shiloh",
                            avatar: "/assets/images/thornridge.webp",
                            travelDates: "Jun 02 - Jun 12"
                        },
                        {
                            id: 2,
                            destination: "Roraima Tepui",
                            avatar: "/assets/images/roraima.webp",
                            travelDates: "Jun 07 - Jun 09"
                        },
                        {
                            id: 3,
                            destination: "Socotra Island",
                            avatar: "/assets/images/socotra.webp",
                            travelDates: "Jun 10 - Jun 23"
                        },
                        {
                            id: 4,
                            destination: "San Lake Baikal",
                            avatar: "/assets/images/baikal.webp",
                            travelDates: "Jun 12 - Jun 26"
                        }
                    ]
                }} />
            </div>

        </div>
    )
}
