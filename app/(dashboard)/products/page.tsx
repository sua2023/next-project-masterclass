"use client"
import Image from "next/image";
import { useEffect, useState } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BsThreeDots } from "react-icons/bs";

export interface IProducts {
    id: number;
    category: string;
    description: string;
    image: string;
    price: string
    rating: {
        count: number
        rate: string;
    }
    title: string;
}
export default function Product() {
    const [products, setProduct] = useState<IProducts[] | []>([])

    const fetchProducts = async () => {
        const url = "https://fakestoreapi.com/products";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);

            setProduct(data)
            return data;
        } catch (error) {
            console.error("Failed to fetch products:", error);
            throw error;
        }
    }
    useEffect(() => {
        fetchProducts()
    }, []);


    return <div>
        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
            <table className="w-full text-sm text-left rtl:text-right text-body">
                <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                    <tr>
                        <th scope="col" className="px-6 py-3 font-medium">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 && products.map((row, index) => (
                        <tr key={index} className="bg-neutral-primary border-b border-default">
                            <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                {row.id}
                            </th>
                            <td className="px-6 py-4">
                                <img src={row.image} alt="image" width={100} height={100} />
                            </td>
                            <td className="px-6 py-4">
                                {row.price}
                            </td>
                            <td className="px-6 py-4">
                                {row.description}
                            </td>
                            <td className="px-6 py-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                                        <BsThreeDots />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    </div>
}
