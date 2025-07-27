 import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const offset = (page - 1) * limit;
  try {
    const client = await clerkClient();
    const rawUsers = await client.users.getUserList({
      limit,
      offset,
    });
    const users = rawUsers.data.map((user) => ({
      fullName: user.fullName,
      email: user.emailAddresses[0]?.emailAddress || null,
      addedAt: new Date(user.createdAt).toISOString().split("T")[0],
      status: user.publicMetadata?.role || "user",
      imageUrl: user.imageUrl,
    }));
    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        nextOffset: offset + limit,
      },
    });
  } catch (error) {
    console.error("Failed to get users:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
