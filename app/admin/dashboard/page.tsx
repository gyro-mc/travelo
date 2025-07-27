"use client"
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import StatsCard from "@/components/statsCard"
import TripCard from "@/components/tripCard"
import UserGrowth from "@/components/UserGrowth"
import TripTrends from "@/components/tripTrends"
import LatestUserSignups from "@/components/LatestUserSignups"
import LatestTripBookings from "@/components/LatestTripBookings"
import { useRouter } from "next/navigation"
interface DashboardStats {
    totalUsers: {
        value: number
        growth: number
        chartData: any[]
    }
    totalTrips: {
        value: number
        growth: number
        chartData: any[]
    }
    activeUsersToday: {
        value: number
        growth: number
        chartData: any[]
    }
}

interface Trip {
    id: string
    tripDetail: string
    imageUrls: string[]
    userId: string
}

export default function AdminDashboard() {
    const router=useRouter()
    const { getToken } = useAuth()
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [trips, setTrips] = useState<Trip[]>([])
    const [userGrowthData, setUserGrowthData] = useState(null)
    const [tripTrendsData, setTripTrendsData] = useState(null)
    const [latestUsers, setLatestUsers] = useState(null)
    const [latestBookings, setLatestBookings] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDashboardData = async () => {
            const token = await getToken()

            try {
                // Fetch all dashboard data in parallel
                const [
                    statsRes,
                    tripsRes,
                    userGrowthRes,
                    tripTrendsRes,
                    latestUsersRes,
                    latestBookingsRes
                ] = await Promise.all([
                    fetch('/api/admin/dashboard/stats', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    fetch('/api/admin/trips?limit=4', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    fetch('/api/admin/dashboard/user-growth', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    fetch('/api/admin/dashboard/trip-trends', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    fetch('/api/admin/dashboard/latest-users', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    fetch('/api/admin/dashboard/latest-bookings', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ])

                const [
                    statsData,
                    tripsData,
                    userGrowthData,
                    tripTrendsData,
                    latestUsersData,
                    latestBookingsData
                ] = await Promise.all([
                    statsRes.json(),
                    tripsRes.json(),
                    userGrowthRes.json(),
                    tripTrendsRes.json(),
                    latestUsersRes.json(),
                    latestBookingsRes.json()
                ])

                setStats(statsData)
                setTrips(tripsData.data || [])
                setUserGrowthData(userGrowthData)
                setTripTrendsData(tripTrendsData)
                setLatestUsers(latestUsersData)
                setLatestBookings(latestBookingsData)
            } catch (error) {
                console.error('Error fetching dashboard data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [getToken])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading dashboard...</div>
            </div>
        )
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        Welcome Adrian 👋
                    </h1>
                    <p className="text-gray-600 mt-1">Track activity, trends, and popular destinations in real time</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg" onClick={()=>router.push("/admin/dashboard/ai-trip/create-trip")}>
                    + Create a trip
                </Button>
            </div>

            {/* Stats Cards */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatsCard
                        data={{
                            statsData: stats.totalUsers.chartData,
                            mainInfo: stats.totalUsers.value,
                            secondaryInfo: stats.totalUsers.growth,
                            title: "Total Users"
                        }}
                    />
                    <StatsCard
                        data={{
                            statsData: stats.totalTrips.chartData,
                            mainInfo: stats.totalTrips.value,
                            secondaryInfo: stats.totalTrips.growth,
                            title: "Total Trips"
                        }}
                    />
                    <StatsCard
                        data={{
                            statsData: stats.activeUsersToday.chartData,
                            mainInfo: stats.activeUsersToday.value,
                            secondaryInfo: stats.activeUsersToday.growth,
                            title: "Active Users Today"
                        }}
                    />
                </div>
            )}

            {/* Trips Section */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Trips</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trips.map((trip) => (
                        <TripCard
                            key={trip.id}
                            data={{
                                imageUrl: trip.imageUrls[0] || '/assets/images/auth-img.webp',
                                tripDetails: trip.tripDetail,
                                userId: trip.userId,
                                tripId: trip.id
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {userGrowthData && <UserGrowth data={userGrowthData} />}
                {tripTrendsData && <TripTrends data={tripTrendsData} />}
            </div>

            {/* Latest Data Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {latestUsers && <LatestUserSignups data={latestUsers} />}
                {latestBookings && <LatestTripBookings data={latestBookings} />}
            </div>
        </div>
    )
}