import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id?: string[] } }
) {
  try {
    const body = await req.json();
    const tripId = body;

    if (!tripId || typeof tripId !== "string") {
      return NextResponse.json(
        { error: "Trip ID is required" },
        { status: 400 }
      );
    }

    console.log("API Route - Searching for trip with ID:", tripId);

    const trip = await prisma.trip.findFirst({
      where: { id: tripId },
    });

    console.log("API Route - Found trip:", trip ? "Yes" : "No");

    if (!trip) {
      // Let's also check if there are any trips in the database
      const totalTrips = await prisma.trip.count();
      console.log("API Route - Total trips in database:", totalTrips);

      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json(trip, { status: 200 });
  } catch (err) {
    console.error("Error fetching trip:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
