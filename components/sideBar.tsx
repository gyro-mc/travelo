"use client";

import Image from "next/image";
import { RiHomeLine } from "react-icons/ri";
import { LuUsersRound } from "react-icons/lu";
import { PiFilmStrip } from "react-icons/pi";
import { TbLogout2 } from "react-icons/tb";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
export default function SideBar() {
    const [currentDir, setCurrentDir] = useState<string>("")
    const pathname = usePathname()
    useEffect(() => {
        const dirs = pathname.split("/").filter(Boolean)
        setCurrentDir(dirs[dirs.length - 1])
    }, [pathname])

    const router = useRouter()
    const { user, isLoaded } = useUser()

    useEffect(() => {
        if (isLoaded && !user) {
            router.push("/sign-in");
        }
    }, [isLoaded, user, router]);

    if (!isLoaded) return null

    return (
        <div className=" h-[100vh] p-4 w-[270px] flex flex-col shadow-md ">
            <div className="flex-1/12">

                <div className="flex items-center gap-2 mb-6 pt-5 ">
                    <Image src="/assets/icons/logo.svg" alt="logo" width={30} height={30} />
                    <h1 className="text-xl font-bold">Tourvisto</h1>
                </div>
                <Separator className="my-4" />
            </div>
            <div className="flex-11/12 flex flex-col justify-between" >

                <div className="flex flex-col gap-4  ">
                    <Button variant="ghost" className={cn("cursor-pointer justify-start gap-3 p-5 py-7 text-lg w-full hover:bg-button-bg hover:text-white", currentDir === "dashboard" ? "bg-blue-600 text-white" : "")} onClick={() => { router.push("/admin/dashboard") }}>
                        <RiHomeLine />
                        Dashboard
                    </Button>
                    <Button variant="ghost" className={cn(" cursor-pointer justify-start gap-2 p-5 py-7 text-lg w-full hover:bg-button-bg hover:text-white", currentDir === "all-users" ? "bg-blue-600 text-white" : "")} onClick={() => { router.push("/admin/dashboard/all-users") }}>
                        <LuUsersRound />
                        All Users
                    </Button>
                    <Button variant="ghost" className={cn("cursor-pointer justify-start gap-2 p-5 py-7 text-lg w-full hover:bg-button-bg hover:text-white ", currentDir === "ai-trip" ? "bg-blue-600 text-white" : "")} onClick={() => { router.push("/admin/dashboard/ai-trip") }} >
                        <PiFilmStrip />
                        AI Trips
                    </Button>
                </div>
                <div className="flex flex-row gap-2 items-center hover:bg-gray-100 p-4">
                    <div className="w-[30px] h-[30px]">
                        {user && user.imageUrl ? (
                            <Image
                                src={user.imageUrl}
                                width={30}
                                height={30}
                                alt="user image"
                                className="object-cover rounded-full"
                            />
                        ) : (
                            <Image
                                src="/assets/icons/logo.svg"
                                width={30}
                                height={30}
                                alt="user image"
                                className="object-cover rounded-full"
                            />
                        )}
                    </div>

                    <div className="text-[12px] ">
                        <p>{user?.fullName}</p>
                        <p className="opacity-[0.7]">{user?.primaryEmailAddress?.emailAddress}</p>
                    </div>
                    <SignOutButton >
                        <TbLogout2 className="text-red-600  size-6 cursor-pointer" />
                    </SignOutButton>
                </div>

            </div>

        </div>
    );
}
