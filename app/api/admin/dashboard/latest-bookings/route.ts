import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get latest trips (bookings)
    const trips = await prisma.trip.findMany({
      take: 4,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        tripDetail: true,
        createdAt: true,
        imageUrls: true,
      },
    });

    // Mock data if no trips found
    const mockBookings = [
      {
        id: 1,
        destination: "Thornridge Cir. Shiloh",
        avatar:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center",
        travelDates: "Jun 02 - Jun 12",
      },
      {
        id: 2,
        destination: "Roraima Tepui",
        avatar:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop&crop=center",
        travelDates: "Jun 07 - Jun 09",
      },
      {
        id: 3,
        destination: "Socotra Island",
        avatar:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop&crop=center",
        travelDates: "Jun 10 - Jun 23",
      },
    ];

    if (trips.length === 0) {
      return NextResponse.json({ bookings: mockBookings });
    }

    // Format real trip data
    const formattedBookings = trips.map((trip, index) => {
      let destination = `Trip ${trip.id.slice(-4)}`;
      let avatar =
        "https://ui-avatars.com/api/?name=Trip&background=06b6d4&color=ffffff";

      try {
        const details = JSON.parse(trip.tripDetail);
        destination = details.name || details.location?.city || destination;
      } catch (error) {
        // Use default if parsing fails
      }

      // Use trip image if available
      if (trip.imageUrls && trip.imageUrls.length > 0) {
        avatar = trip.imageUrls[0];
      }

      // Generate travel dates based on creation date
      const startDate = new Date(trip.createdAt);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 7); // 7 day trip

      const formatDate = (date: Date) => {
        return date.toLocaleDateString("en", {
          month: "short",
          day: "2-digit",
        });
      };

      return {
        id: index + 1,
        destination,
        avatar,
        travelDates: `${formatDate(startDate)} - ${formatDate(endDate)}`,
      };
    });

    return NextResponse.json({ bookings: formattedBookings });
  } catch (error) {
    console.error("Error fetching latest bookings:", error);

    // Return mock data on error
    const mockBookings = [
      {
        id: 1,
        destination: "Thornridge Cir. Shiloh",
        avatar:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center",
        travelDates: "Jun 02 - Jun 12",
      },
      {
        id: 2,
        destination: "Roraima Tepui",
        avatar:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop&crop=center",
        travelDates: "Jun 07 - Jun 09",
      },
      {
        id: 3,
        destination: "Socotra Island",
        avatar:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop&crop=center",
        travelDates: "Jun 10 - Jun 23",
      },
    ];

    return NextResponse.json({ bookings: mockBookings });
  }
}
