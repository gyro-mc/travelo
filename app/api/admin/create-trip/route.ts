import { FormSchema } from "@/utils/schema";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { parseMarkdownToJson } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  let userdbId = await prisma.user.findFirst({
    where: { clerkId: userId },
    select: { id: true },
  });

  if (!userdbId) {
    return NextResponse.json({
      message: "user is not authorized",
      status: 401,
    });
  }

  const {
    country,
    duration,
    groupType,
    travelStyle,
    interests,
    budgetEstimate,
  } = await req.json();

  const parsed = FormSchema.safeParse({
    country,
    duration,
    groupType,
    travelStyle,
    interests,
    budgetEstimate,
  });
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input data", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
  const unsplashApiKey = process.env.NEXT_PUBLIC_UNSPLASH_KEY!;
  try {
    const prompt = `Generate a ${duration}-day travel itinerary for ${country} based on the following user information:
    Budget: '${budgetEstimate}'
    Interests: '${interests}'
    TravelStyle: '${travelStyle}'
    GroupType: '${groupType}'
    Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
    {
    "name": "A descriptive title for the trip",
    "description": "A brief description of the trip and its highlights not exceeding 100 words",
    "estimatedPrice": "Lowest average price for the trip in USD, e.g.$price",
    "duration": ${duration},
    "budget": "${budgetEstimate}",
    "travelStyle": "${travelStyle}",
    "country": "${country}",
    "interests": ${interests},
    "groupType": "${groupType}",
    "bestTimeToVisit": [
      '🌸 Season (from month to month): reason to visit',
      '☀️ Season (from month to month): reason to visit',
      '🍁 Season (from month to month): reason to visit',
      '❄️ Season (from month to month): reason to visit'
    ],
    "weatherInfo": [
      '☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
      '🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
      '🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
      '❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)'
    ],
    "location": {
      "city": "name of the city or region",
      "coordinates": [latitude, longitude],
      "openStreetMap": "link to open street map"
    },
    "itinerary": [
    {
      "day": 1,
      "location": "City/Region Name",
      "activities": [
        {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
        {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
        {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
      ]
    },
    ...
    ]
}`;
    const textResult = await genAI
      .getGenerativeModel({ model: "gemini-2.0-flash" })
      .generateContent([prompt]);
    const trip = parseMarkdownToJson(textResult.response.text());
    console.log(trip)
    const imageResponse = await fetch(
      `https://api.unsplash.com/search/photos?query=${country} ${interests} ${travelStyle}&client_id=${unsplashApiKey}`
    );
    const imageUrls = (await imageResponse.json()).results
      .slice(0, 3)
      .map((result: any) => result.urls?.regular || null);

    const tripJson = JSON.stringify(trip);
    try {
      await prisma.trip.create({
        data: {
          tripDetail: tripJson,
          imageUrls: imageUrls,
          userId: userdbId.id,
        },
      });
    } catch (error) {
      console.log("cannot create a trip in the database", error);
      return NextResponse.json(
        { error: "Failed to save trip to database" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { tripDetails: trip, imageLink: imageUrls },
      { status: 201 }
    );
  } catch (e) {
    console.log("error trying to create a trip", e);
    return NextResponse.json(
      { error: "Failed to generate trip" },
      { status: 500 }
    );
  }
}
