import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Matchers
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isAdminApiRoute = createRouteMatcher(["/api/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role;

  // Protect /admin pages
  if (isAdminRoute(req) && role !== "admin") {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url); // redirect to homepage or login
  }

  // Protect /api/admin APIs
  if (isAdminApiRoute(req) && role !== "admin") {
    return new Response("Forbidden", { status: 403 });
  }
});
