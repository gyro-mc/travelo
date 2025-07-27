import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit" )|| "10");
  const skip=(page-1)*limit
  const trips=await prisma.trip.findMany({
    skip,
    take:limit,
    orderBy:{createdAt:"desc"}

})
    const totalTrips=await prisma.trip.count()
    return NextResponse.json({
    data:trips,
    meta:{
        total:totalTrips,
        page,limit,totalPages:Math.ceil(totalTrips/limit)
    }      
  })
}
