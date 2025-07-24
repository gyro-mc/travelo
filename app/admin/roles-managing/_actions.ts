"use server";

import { checkRole } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";

export async function setRole(formData: FormData) {
  const client = await clerkClient();

  // Check that the user trying to set the role is an admin
  if (!checkRole("admin")) {
    console.error("Not authorized to set role");
    return; // Early return without data
  }

  try {
    await client.users.updateUserMetadata(formData.get("id") as string, {
      publicMetadata: { role: formData.get("role") },
    });
    // Don't return anything for form actions
  } catch (err) {
    console.error("Error setting role:", err);
    // You could throw an error here if you want to handle it in the UI
    // throw new Error("Failed to set role");
  }
}

export async function removeRole(formData: FormData) {
  const client = await clerkClient();

  try {
    await client.users.updateUserMetadata(formData.get("id") as string, {
      publicMetadata: { role: null },
    });
    // Don't return anything for form actions
  } catch (err) {
    console.error("Error removing role:", err);
    // You could throw an error here if you want to handle it in the UI
    // throw new Error("Failed to remove role");
  }
}
