import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get current date and calculate date ranges
    const now = new Date();
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Total Users
    const totalUsers = await prisma.user.count();
    const usersLastMonth = await prisma.user.count({
      where: {
        trips: {
          some: {
            createdAt: {
              gte: lastMonth,
              lt: currentMonth,
            },
          },
        },
      },
    });

    // Total Trips
    const totalTrips = await prisma.trip.count();
    const tripsLastMonth = await prisma.trip.count({
      where: {
        createdAt: {
          gte: lastMonth,
          lt: currentMonth,
        },
      },
    });

    // Active Users Today (users who created trips today)
    const activeUsersToday = await prisma.user.count({
      where: {
        trips: {
          some: {
            createdAt: {
              gte: today,
            },
          },
        },
      },
    });

    // Calculate percentage changes (with some mock variation for demo)
    const userGrowth =
      usersLastMonth > 0
        ? Math.round(((totalUsers - usersLastMonth) / usersLastMonth) * 100)
        : Math.round(Math.random() * 20 + 5);
    const tripGrowth =
      tripsLastMonth > 0
        ? Math.round(((totalTrips - tripsLastMonth) / tripsLastMonth) * 100)
        : Math.round(Math.random() * 10 - 5); // Can be negative
    const activeUserGrowth = Math.round(Math.random() * 10 + 2); // Mock data for demo

    // Generate mock chart data for the last 6 months
    const generateChartData = (baseValue: number) => {
      return Array.from({ length: 6 }, (_, i) => ({
        name: new Date(
          now.getFullYear(),
          now.getMonth() - (5 - i),
          1
        ).toLocaleDateString("en", { month: "short" }),
        uv: Math.floor(Math.random() * 1000) + 2000,
        pv: Math.floor(baseValue * (0.8 + Math.random() * 0.4)),
        amt: Math.floor(Math.random() * 500) + 1000,
      }));
    };

    return NextResponse.json({
      totalUsers: {
        value: totalUsers,
        growth: userGrowth,
        chartData: generateChartData(totalUsers),
      },
      totalTrips: {
        value: totalTrips,
        growth: tripGrowth,
        chartData: generateChartData(totalTrips),
      },
      activeUsersToday: {
        value: activeUsersToday,
        growth: activeUserGrowth,
        chartData: generateChartData(activeUsersToday),
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
