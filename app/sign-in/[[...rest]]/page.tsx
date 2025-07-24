// app/sign-in/page.tsx (Server Component by default)
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignIn } from "@clerk/nextjs";

export default async function Page() {
    const user = await currentUser();

    if (user) redirect("/");

    return <SignIn />;
}
