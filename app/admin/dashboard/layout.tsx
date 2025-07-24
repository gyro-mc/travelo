import SideBar from "@/components/sideBar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row w-[100vw]">
            <SideBar />
            <div className="bg-dashboard w-full ">

                {children}
            </div>
        </div>
    )
}