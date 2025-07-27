import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AuthPage from "./AuthPage";

export default async function Page() {
    const user = await currentUser();

    if (user) redirect("/");

    return <AuthPage />;
}
