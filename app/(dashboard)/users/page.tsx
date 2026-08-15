// users/page.tsx
"use client"

import { UsePagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IUserTypes } from "@/interfaces/userInterface";
import { MoreHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function UsersPage() {
    const [users, setUsers] = useState<IUserTypes[]>([]);
    const [limit, setLimit] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const url = "https://fakestoreapi.com/users";
    const fetchUsers = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            setUsers(data)
            return data;
        } catch (error) {
            console.error("Failed to fetch users:", error);
            throw error;
        }
    }
    useEffect(() => {
        fetchUsers()
    }, []);
    const items = ["10", "20", "30", "40", "50", "100"]
    return (
        <div className="w-full p-4">
            <h1 className="text-xl font-bold mb-4">List all users</h1>
            <div className="flex items-center justify-between mb-4">
                <Select defaultValue="10">
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {items.map((item) => (
                                <SelectItem key={item} value={item} onClick={() => setLimit(Number(item))}>
                                    {item}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="flex items-center gap-4">
                    <Input type="text" placeholder="Search users..." className="min-w-sm" />
                    <Button className="p-2">Add User</Button>
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-body">
                <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                    <tr>
                        <th scope="col" className="px-6 py-3 font-bold">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3 font-bold">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3 font-bold">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3 font-bold">
                            Address
                        </th>
                        <th scope="col" className="px-6 py-3 font-bold">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 && users.map((row, index) => (
                        <tr key={index} className="bg-neutral-primary border-b border-default">
                            <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                {row.id}
                            </th>
                            <td className="px-6 py-4">
                                {row.username}
                            </td>

                            <td className="px-6 py-4">
                                {row.email}
                            </td>
                            <td className="px-6 py-4">
                                {row.address.city}
                            </td>
                            <td className="px-6 py-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger render={<Button variant="ghost" />}>
                                        <MoreHorizontalIcon />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-center justify-between mt-4 w-full">
                <p className="w-full">Showing {limit} of {users.length} entries</p>
                <UsePagination currentPage={currentPage} totalPages={100} onPageChange={(page) => setCurrentPage(page)
                } />
            </div>
        </div>
    );
}