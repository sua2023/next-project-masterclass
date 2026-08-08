"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig
} from "@/components/ui/chart"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import type { IProducts } from "../products/page"
import type { IUser } from "../users/page"
import { FieldGroup } from "@/components/ui/field"

interface ICart {
    id: number;
    userId: number;
    products: { productId: number; quantity: number }[];
}

interface ICategoryCount {
    category: string;
    products: number;
}

const chartConfig = {
    products: {
        label: "Products",
        theme: {
            light: "#2a78d6",
            dark: "#3987e5",
        },
    },
} satisfies ChartConfig

export default function DashboardChart() {
    const [totalUsers, setTotalUsers] = useState<number | null>(null)
    const [activeUsers, setActiveUsers] = useState<number | null>(null)
    const [totalProducts, setTotalProducts] = useState<number | null>(null)
    const [chartData, setChartData] = useState<ICategoryCount[]>([])

    const fetchDashboard = async () => {
        try {
            const [usersRes, productsRes, cartsRes] = await Promise.all([
                fetch("https://fakestoreapi.com/users"),
                fetch("https://fakestoreapi.com/products"),
                fetch("https://fakestoreapi.com/carts"),
            ]);
            if (!usersRes.ok || !productsRes.ok || !cartsRes.ok) {
                throw new Error("HTTP error while loading dashboard data");
            }
            const users: IUser[] = await usersRes.json();
            const products: IProducts[] = await productsRes.json();
            const carts: ICart[] = await cartsRes.json();

            setTotalUsers(users.length);
            setActiveUsers(new Set(carts.map((cart) => cart.userId)).size);
            setTotalProducts(products.length);

            const byCategory = new Map<string, number>();
            for (const product of products) {
                byCategory.set(product.category, (byCategory.get(product.category) ?? 0) + 1);
            }
            setChartData(
                Array.from(byCategory, ([category, count]) => ({
                    category,
                    products: count,
                }))
            );
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        }
    }
    useEffect(() => {
        fetchDashboard()
    }, []);

    const stats = [
        { label: "Total Users", value: totalUsers },
        { label: "Active Users", value: activeUsers },
        { label: "Total Products", value: totalProducts },
    ]

    return (
        <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                    <Card key={stat.label}>
                        <CardHeader>
                            <CardDescription>{stat.label}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <span className="text-3xl font-semibold">
                                {stat.value ?? "—"}
                            </span>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <FieldGroup className="grid grid-cols-2">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Products by category</CardTitle>
                        <CardDescription>Number of products in each category</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="min-h-50 w-full">
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="category"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={5}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar
                                    dataKey="products"
                                    fill="var(--color-products)"
                                    radius={[4, 4, 0, 0]}
                                    maxBarSize={20}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <ChartAreaInteractive />
            </FieldGroup>

        </div>
    )
}
