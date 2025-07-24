import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;
    if (eventType == "user.created") {
      try {
        const user = await prisma.user.create({
          data: {
            clerkId: evt.data.id,
          },
        });
        return new Response(
          "webhook received and new user added to the database",
          { status: 200 }
        );
      } catch (err) {
        console.log("failed to create a new user", err);
      }
    }
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
