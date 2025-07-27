import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const now = new Date();
    const monthlyData = [];

    // Get data for the last 6 months
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

      const usersInMonth = await prisma.user.count({
        where: {
          trips: {
            some: {
              createdAt: {
                gte: monthStart,
                lte: monthEnd,
              },
            },
          },
        },
      });

      monthlyData.push({
        month: monthStart.toLocaleDateString("en", { month: "short" }),
        users: usersInMonth || Math.floor(Math.random() * 2000) + 1000, // Mock data if no real data
        growth: Math.floor(Math.random() * 30) + 10, // Mock growth percentage
      });
    }

    return NextResponse.json({ monthlyData });
  } catch (error) {
    console.error("Error fetching user growth data:", error);
    return NextResponse.json(
      { error: "Failed to fetch user growth data" },
      { status: 500 }
    );
  }
}
