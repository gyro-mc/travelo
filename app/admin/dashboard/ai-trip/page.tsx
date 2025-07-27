"use client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Loader } from 'lucide-react';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import TripCard from "@/components/tripCard";
import { Trip } from "@/lib/utils";

// Define the Trip type based on your Prisma schema


export default function Page() {
  const { getToken } = useAuth()
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [trips, setTrips] = useState<Trip[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)
  const limit = 8
  useEffect(() => {
    const fetchTrips = async () => {
      setIsLoading(true)
      const token = await getToken()
      try {
        const response = await fetch(`/api/admin/trips?page=${page}&limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        if (!response.ok) {
          throw new Error("failed to fetch trips")
        }
        const json = await response.json()
        console.log("API Response:", json)

        setTrips(json.data)
        setTotalPages(json.meta?.totalPages || 1)
      }
      catch (err) {
        console.log(err)
      }
      finally {
        setIsLoading(false)
      }
    }
    fetchTrips()
  }, [page])
  const router = useRouter()

  // Smart pagination logic - show only 4 page buttons
  const getVisiblePages = () => {
    const maxVisible = 4;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    // Adjust start if we're near the end
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    isLoading
      ? (<div className="h-full w-full justify-center flex items-center">
        <div className="flex flex-col gap-4"><Loader /> data is loading ...</div>
      </div>)
      : (
        <div className="h-full p-8 flex flex-col gap-4">
          <div className="flex flex-row items-end justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold">Trips</h1>
              <p className="opacity-[0.8]">View and generate Ai travel plans</p>
            </div>
            <div>
              <Button className="bg-blue-600 cursor-pointer hover:bg-blue-700" onClick={() => { router.push("/admin/dashboard/ai-trip/create-trip") }}>
                <FaPlus />
                Create a trip
              </Button>
            </div>
          </div>
          <div className="flex flex-row gap-5 flex-wrap">
            {trips.map((trip) => <TripCard data={{ imageUrl: trip.imageUrls[0], tripDetails: trip.tripDetail, userId: trip.userId, tripId: trip.id }} key={trip.id} />)}
          </div>
          <div className="absolute bottom-14 translate-x-1/2 right-1/2">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                    className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {/* Show ellipsis if we're not showing page 1 */}
                {visiblePages[0] > 1 && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => setPage(1)}
                        className="cursor-pointer"
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    {visiblePages[0] > 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                  </>
                )}

                {/* Render visible page numbers */}
                {visiblePages.map((pageNum) => (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => setPage(pageNum)}
                      isActive={page === pageNum}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {/* Show ellipsis if we're not showing the last page */}
                {visiblePages[visiblePages.length - 1] < totalPages && (
                  <>
                    {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => setPage(totalPages)}
                        className="cursor-pointer"
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                    className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )
  )
}