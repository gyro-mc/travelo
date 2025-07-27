import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get latest users with their trip count
    const users = await prisma.user.findMany({
      take: 4,
      orderBy: {
        trips: {
          _count: "desc",
        },
      },
      include: {
        _count: {
          select: {
            trips: true,
          },
        },
        trips: {
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    // Mock data if no users found
    const mockUsers = [
      {
        id: 1,
        name: "James Anderson",
        avatar:
          "https://ui-avatars.com/api/?name=James+Anderson&background=3b82f6&color=ffffff",
        itineraryCreated: 12,
      },
      {
        id: 2,
        name: "Michael Johnson",
        avatar:
          "https://ui-avatars.com/api/?name=Michael+Johnson&background=10b981&color=ffffff",
        itineraryCreated: 21,
      },
      {
        id: 3,
        name: "David Brown",
        avatar:
          "https://ui-avatars.com/api/?name=David+Brown&background=f59e0b&color=ffffff",
        itineraryCreated: 15,
      },
      {
        id: 4,
        name: "Orlando Diggs",
        avatar:
          "https://ui-avatars.com/api/?name=Orlando+Diggs&background=ef4444&color=ffffff",
        itineraryCreated: 26,
      },
    ];

    if (users.length === 0) {
      return NextResponse.json({ users: mockUsers });
    }

    // Format real user data
    const formattedUsers = users.map((user, index) => ({
      id: index + 1,
      name: `User ${user.clerkId.slice(-4)}`, // Use last 4 chars of clerkId as name
      avatar: `https://ui-avatars.com/api/?name=User+${user.clerkId.slice(
        -4
      )}&background=3b82f6&color=ffffff`,
      itineraryCreated: user._count.trips,
    }));

    return NextResponse.json({ users: formattedUsers });
  } catch (error) {
    console.error("Error fetching latest users:", error);

    // Return mock data on error
    const mockUsers = [
      {
        id: 1,
        name: "James Anderson",
        avatar:
          "https://ui-avatars.com/api/?name=James+Anderson&background=3b82f6&color=ffffff",
        itineraryCreated: 12,
      },
      {
        id: 2,
        name: "Michael Johnson",
        avatar:
          "https://ui-avatars.com/api/?name=Michael+Johnson&background=10b981&color=ffffff",
        itineraryCreated: 21,
      },
      {
        id: 3,
        name: "David Brown",
        avatar:
          "https://ui-avatars.com/api/?name=David+Brown&background=f59e0b&color=ffffff",
        itineraryCreated: 15,
      },
      {
        id: 4,
        name: "Orlando Diggs",
        avatar:
          "https://ui-avatars.com/api/?name=Orlando+Diggs&background=ef4444&color=ffffff",
        itineraryCreated: 26,
      },
    ];

    return NextResponse.json({ users: mockUsers });
  }
}
