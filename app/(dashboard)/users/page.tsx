"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select";
import { useEffect, useState } from "react";

export interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<IUser[]>([])
    const [search, setSearch] = useState("")

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

    const pageSizeOptions = [5, 10, 20, 50, 100];
    const filteredUsers = users.filter((user) =>
        [String(user.id), user.username, user.email]
            .some((value) => value.toLowerCase().includes(search.toLowerCase()))
    );
    return (
        <div>
            <div className="relative overflow-x-auto bg-neutral-primary-soft">
                <div className="flex justify-between items-center p-2">
                    <h4>User list</h4>
                </div>
                <div className="flex items-center justify-between gap-2 p-2">
                    <Select defaultValue="10">
                        <SelectTrigger className="w-20">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                {pageSizeOptions.map((size) => (
                                    <SelectItem key={size} value={String(size)}>
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Input
                        placeholder="Search in table..."
                        className="w-full max-w-xs"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-body">
                    <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-medium">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Password
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((row, index) => (
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
                                    {row.password}
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>
                <div className="py-4 w-full flex justify-end items-center px-4">
                    <Pagination className="justify-end" aria-label="Pagination">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    )
}
