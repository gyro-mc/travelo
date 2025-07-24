"use client"
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);


interface tableData {
    imageUrl: string,
    fullName: string,
    email: string,
    addedAt: Date,
    status: "user" | "admin"
}

const Name = (name: string, imageUrl: string) => {
    return <div className="flex flex-row gap-3 w-full items-center" >
        <Image src={imageUrl} width={25} height={25} alt="img" className="rounded-full" />
        <p>{name}</p>
    </div>
}
export default function Page() {
    const { getToken } = useAuth()


    const [usersRows, setUsersRows] = useState<tableData[] | null>()
    const [colDefs, setColDefs] = useState([
        {
            field: "fullName" as keyof tableData, cellRenderer: (params: any) => {
                return Name(params.value, params.data.imageUrl);
            },
            flex: 3
        },
        { field: "email" as keyof tableData, flex: 2 },
        { field: "addedAt" as keyof tableData, flex: 1 },
        {
            field: "status" as keyof tableData, flex: 1, cellRenderer: (params: any) => {

                return (<div className="flex items-center justify-center h-full">
                    <Badge className={cn(params.value === "user" ? "bg-green-100 text-green-900" : "bg-gray-100 text-black")}>{params.value} </Badge>
                </div>)
            }
        },
        {
            headerName: "Actions",
            cellRenderer: (params: any) => {
                return <div className="flex items-center justify-center h-full">
                    <MdOutlineDeleteOutline className="size-6 cursor-pointer" />
                </div>
            },
            flex: 1,
            sortable: false,
            filter: false
        }
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {

                const token = await getToken()
                const res = await fetch("/api/admin/users?page=1&limit=10", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                const data = await res.json()

                setUsersRows(data.users)
                console.log(data.users[0].addedAt)
            }
            catch (err) {
                console.error(err)
            }

        }
        fetchData()
    }, [])
    return (
        <div className='pl-6 pr-10 pt-10 pb-20 '>
            <div className="flex  flex-row justify-between items-center">
                <div className="flex flex-col gap-4 ">
                    <h1 className="text-xl font-medium">Manage Users</h1>
                    <p className="opacity-[0.7]">Filter, sort, and access detailed user profiles</p>
                </div>
                <Button className=" bg-blue-600  hover:bg-blue-800">
                    <FaPlus />
                    <p className="">

                        Add new user
                    </p>
                </Button>

            </div>
            <div style={{ height: 800 }} className="mt-4" >

                <AgGridReact rowData={usersRows} columnDefs={colDefs} rowHeight={60} />
            </div>
        </div>
    )
}