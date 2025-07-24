import { Badge } from "./ui/badge"
import Image from "next/image"
import { CiLocationOn } from "react-icons/ci";
interface tripCardType {
    imageUrl: string,
    price: number,
    name: string,
    location: string,
    tags: string[]

}

export default function TripCard({ data }: { data: tripCardType }) {
    const { imageUrl, price, name, location, tags } = data
    return (
        <div className="h-[316px] w-[256px] rounded-2xl flex flex-col shadow-sm bg-white">
            <div className="h-[180px] relative">
                <Badge className="absolute z-50 bg-white text-black right-4 top-4">
                    ${price}
                </Badge>
                <Image src={imageUrl} alt="trip" fill className="object-cover rounded-t-2xl z-25" />
            </div>
            <div className="h-[136px]  flex flex-col items-start gap-2 pl-3 justify-center">
                <h1>{name}</h1>
                <p className="flex flex-row items-center gap-1"><CiLocationOn />{location}</p>
                <div className="flex flex-row gap-2">
                    {tags.map((tag,index) => (<Badge key={index}>{tag}</Badge>))}
                </div>

            </div>
        </div>
    )
}