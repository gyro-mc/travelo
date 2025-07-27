"use client";
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form";
import { ImSpinner8 } from "react-icons/im";
import { FormSchema } from "@/utils/schema";
import type { z } from "zod"
import { useMemo, useState } from "react";
import countryList from "react-select-country-list"
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
type FormValues = z.infer<typeof FormSchema>

export default function Page() {
    const router = useRouter()
    const { getToken } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const countries = useMemo(() => countryList().getData(), [])


    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        mode: "onBlur"
    });
    const interestsOptions = ["Food & Culinary", "Hiking & Nature Walks", "Historical Sites", "Museums & Art", "Beaches & Water Activities", "Nightlife & Bars", "Photography Spots", "Shopping", "Local Experiences"]
    const budgetOptions = ["budget", "Mid-range", "Premium", "Luxury"]
    const groupOptions = ["Solo", "Couple", "Family", "Friends", "Business"]
    const TravelOptions = ["Relaxed", "Adventure", "Culture", "Luxury", "Nature & Outdoors", "City Exploration"]


    const onSubmit = async (data: FormValues) => {
        setIsLoading(true)
        try {
            const token = await getToken()

            const response = await fetch("/api/admin/create-trip", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()


            router.push("/admin/dashboard")
        }
        catch (error) {
            console.error("Failed to create trip:", error)
            throw new Error("Failed to create trip");
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="p-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-medium">Add new Trips</h1>
                <p className="opacity-[0.7]">View and generate Ai travel plans</p>
            </div>
            <div className=" lg:w-[700px] mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">

                    {/* Country Selection */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                            Country
                        </label>
                        <select
                            id="country"
                            {...register("country")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">country...</option>
                            {countries.map((country) => (
                                <option key={country.value} value={country.value}>
                                    {country.label}
                                </option>
                            ))}
                        </select>
                        {errors.country && (
                            <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="duration" className="block font-medium text-gray-700 mb-2">Duration</label >
                        <input type="number" {...register("duration", { valueAsNumber: true })} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Select number of days (e.g , 5,12)" />
                        {errors.duration && (
                            <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="group">Group Type</label>
                        <select id="group" {...register("groupType")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">select a group type</option>
                            {
                                groupOptions.map((group) => (
                                    <option key={group} value={group}>
                                        {group}
                                    </option>
                                ))
                            }
                        </select>
                        {errors.groupType && (
                            <p className="mt-1 text-sm text-red-600">{errors.groupType.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="travelStyle">Travel style</label>
                        <select id="travelStyle" {...register("travelStyle")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">select your travel style </option>
                            {
                                TravelOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))
                            }
                        </select>
                        {errors.travelStyle && (
                            <p className="mt-1 text-sm text-red-600">{errors.travelStyle.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="interests">Interests</label>
                        <select id="interests" {...register("interests")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">select your Interests </option>
                            {
                                interestsOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))
                            }
                        </select>
                        {errors.interests && (
                            <p className="mt-1 text-sm text-red-600">{errors.interests.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="budgetEstimate">Budget Estimate</label>
                        <input type="number" {...register("budgetEstimate", { valueAsNumber: true })} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter budget amount (e.g., 1000)" />
                        {errors.budgetEstimate && (
                            <p className="mt-1 text-sm text-red-600">{errors.budgetEstimate.message}</p>
                        )}
                    </div>


                    <button
                        disabled={isLoading}
                        type="submit"
                        className="w-full flex justify-center items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-60"
                    >
                        {isLoading ? (
                            <div className="flex flex-row gap-2 items-center">
                                <p>creating the trip</p>
                                < ImSpinner8 className="animate-spin text-white" size={18} />
                            </div>
                        ) : (
                            "Create Trip"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}