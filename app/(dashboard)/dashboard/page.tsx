"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";
import { FaUserGroup } from "react-icons/fa6";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"

export default function DashboardComponent() {
    const chartData = [
        { month: "January", total: 186, active: 80 },
        { month: "February", total: 305, active: 200 },
        { month: "March", total: 237, active: 120 },
        { month: "April", total: 73, active: 190 },
        { month: "May", total: 209, active: 130 },
        { month: "June", total: 214, active: 140 },
    ]
    const chartConfig = {
        total: {
            label: "Total user",
            color: "#2563eb",
        },
        active: {
            label: "Active user",
            color: "#60a5fa",
        },
    } satisfies ChartConfig
    const [timeRange, setTimeRange] = React.useState("90d")
    const AreaData = [
        { date: "2024-04-01", total: 222, active: 150 },
        { date: "2024-04-02", total: 97, active: 180 },
        { date: "2024-04-03", total: 167, active: 120 },
        { date: "2024-04-04", total: 242, active: 260 },
        { date: "2024-04-05", total: 373, active: 290 },
        { date: "2024-04-06", total: 301, active: 340 },
        { date: "2024-04-07", total: 245, active: 180 },
        { date: "2024-04-08", total: 409, active: 320 },
        { date: "2024-04-09", total: 59, active: 110 },
        { date: "2024-04-10", total: 261, active: 190 },
        { date: "2024-04-11", total: 327, active: 350 },
        { date: "2024-04-12", total: 292, active: 210 },
        { date: "2024-04-13", total: 342, active: 380 },
        { date: "2024-04-14", total: 137, active: 220 },
        { date: "2024-04-15", total: 120, active: 170 },
        { date: "2024-04-16", total: 138, active: 190 },
        { date: "2024-04-17", total: 446, active: 360 },
        { date: "2024-04-18", total: 364, active: 410 },
        { date: "2024-04-19", total: 243, active: 180 },
        { date: "2024-04-20", total: 89, active: 150 },
        { date: "2024-04-21", total: 137, active: 200 },
        { date: "2024-04-22", total: 224, active: 170 },
        { date: "2024-04-23", total: 138, active: 230 },
        { date: "2024-04-24", total: 387, active: 290 },
        { date: "2024-04-25", total: 215, active: 250 },
        { date: "2024-04-26", total: 75, active: 130 },
        { date: "2024-04-27", total: 383, active: 420 },
        { date: "2024-04-28", total: 122, active: 180 },
        { date: "2024-04-29", total: 315, active: 240 },
        { date: "2024-04-30", total: 454, active: 380 },
        { date: "2024-05-01", total: 165, active: 220 },
        { date: "2024-05-02", total: 293, active: 310 },
        { date: "2024-05-03", total: 247, active: 190 },
        { date: "2024-05-04", total: 385, active: 420 },
        { date: "2024-05-05", total: 481, active: 390 },
        { date: "2024-05-06", total: 498, active: 520 },
        { date: "2024-05-07", total: 388, active: 300 },
        { date: "2024-05-08", total: 149, active: 210 },
        { date: "2024-05-09", total: 227, active: 180 },
        { date: "2024-05-10", total: 293, active: 330 },
        { date: "2024-05-11", total: 335, active: 270 },
        { date: "2024-05-12", total: 197, active: 240 },
        { date: "2024-05-13", total: 197, active: 160 },
        { date: "2024-05-14", total: 448, active: 490 },
        { date: "2024-05-15", total: 473, active: 380 },
        { date: "2024-05-16", total: 338, active: 400 },
        { date: "2024-05-17", total: 499, active: 420 },
        { date: "2024-05-18", total: 315, active: 350 },
        { date: "2024-05-19", total: 235, active: 180 },
        { date: "2024-05-20", total: 177, active: 230 },
        { date: "2024-05-21", total: 82, active: 140 },
        { date: "2024-05-22", total: 81, active: 120 },
        { date: "2024-05-23", total: 252, active: 290 },
        { date: "2024-05-24", total: 294, active: 220 },
        { date: "2024-05-25", total: 201, active: 250 },
        { date: "2024-05-26", total: 213, active: 170 },
        { date: "2024-05-27", total: 420, active: 460 },
        { date: "2024-05-28", total: 233, active: 190 },
        { date: "2024-05-29", total: 78, active: 130 },
        { date: "2024-05-30", total: 340, active: 280 },
        { date: "2024-05-31", total: 178, active: 230 },
        { date: "2024-06-01", total: 178, active: 200 },
        { date: "2024-06-02", total: 470, active: 410 },
        { date: "2024-06-03", total: 103, active: 160 },
        { date: "2024-06-04", total: 439, active: 380 },
        { date: "2024-06-05", total: 88, active: 140 },
        { date: "2024-06-06", total: 294, active: 250 },
        { date: "2024-06-07", total: 323, active: 370 },
        { date: "2024-06-08", total: 385, active: 320 },
        { date: "2024-06-09", total: 438, active: 480 },
        { date: "2024-06-10", total: 155, active: 200 },
        { date: "2024-06-11", total: 92, active: 150 },
        { date: "2024-06-12", total: 492, active: 420 },
        { date: "2024-06-13", total: 81, active: 130 },
        { date: "2024-06-14", total: 426, active: 380 },
        { date: "2024-06-15", total: 307, active: 350 },
        { date: "2024-06-16", total: 371, active: 310 },
        { date: "2024-06-17", total: 475, active: 520 },
        { date: "2024-06-18", total: 107, active: 170 },
        { date: "2024-06-19", total: 341, active: 290 },
        { date: "2024-06-20", total: 408, active: 450 },
        { date: "2024-06-21", total: 169, active: 210 },
        { date: "2024-06-22", total: 317, active: 270 },
        { date: "2024-06-23", total: 480, active: 530 },
        { date: "2024-06-24", total: 132, active: 180 },
        { date: "2024-06-25", total: 141, active: 190 },
        { date: "2024-06-26", total: 434, active: 380 },
        { date: "2024-06-27", total: 448, active: 490 },
        { date: "2024-06-28", total: 149, active: 200 },
        { date: "2024-06-29", total: 103, active: 160 },
        { date: "2024-06-30", total: 446, active: 400 },
    ]
    const AreaConfig = {
        visitors: {
            label: "Visitors",
        },
        total: {
            label: "Total user",
            color: "var(--chart-1)",
        },
        active: {
            label: "Active user",
            color: "var(--chart-2)",
        },
    } satisfies ChartConfig
    const filteredData = AreaData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2024-06-30")
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                <Card className="bg-gray-100">
                    <CardHeader>Total users</CardHeader>
                    <CardContent className="flex gap-2 items-center">
                        <FaUserGroup />
                        <p>100</p>
                    </CardContent>
                </Card>
                <Card className="bg-green-100">
                    <CardHeader>Active users</CardHeader>
                    <CardContent className="flex gap-2 items-center">
                        <FaUserGroup />
                        <p>100</p>
                    </CardContent>
                </Card>
                <Card className="bg-yellow-100">
                    <CardHeader>Inactive users</CardHeader>
                    <CardContent className="flex gap-2 items-center">
                        <FaUserGroup />
                        <p>100</p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4">
                <Card>
                    <ChartContainer config={chartConfig} className="w-full h-auto">
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar dataKey="total" fill="var(--color-total)" radius={4} />
                            <Bar dataKey="active" fill="var(--color-active)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </Card>
                <Card className="pt-0">
                    <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                        <div className="grid flex-1 gap-1">
                            <CardTitle>Area Chart - Interactive</CardTitle>
                            <CardDescription>
                                Showing total visitors for the last 3 months
                            </CardDescription>
                        </div>
                        <Select value={timeRange} onValueChange={(value) => { if (value) setTimeRange(value) }}>
                            <SelectTrigger
                                className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                                aria-label="Select a value"
                            >
                                <SelectValue placeholder="Last 3 months" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="90d" className="rounded-lg">
                                    Last 3 months
                                </SelectItem>
                                <SelectItem value="30d" className="rounded-lg">
                                    Last 30 days
                                </SelectItem>
                                <SelectItem value="7d" className="rounded-lg">
                                    Last 7 days
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                        <ChartContainer
                            config={AreaConfig}
                            className="aspect-auto h-[250px] w-full"
                        >
                            <AreaChart data={filteredData}>
                                <defs>
                                    <linearGradient id="filltotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-total)"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-total)"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                    <linearGradient id="fillactive" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="var(--color-active)"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="var(--color-active)"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    minTickGap={32}
                                    tickFormatter={(value) => {
                                        const date = new Date(value)
                                        return date.toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            labelFormatter={(value) => {
                                                return new Date(value).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                })
                                            }}
                                            indicator="dot"
                                        />
                                    }
                                />
                                <Area
                                    dataKey="active"
                                    type="natural"
                                    fill="url(#fillactive)"
                                    stroke="var(--color-active)"
                                    stackId="a"
                                />
                                <Area
                                    dataKey="total"
                                    type="natural"
                                    fill="url(#filltotal)"
                                    stroke="var(--color-total)"
                                    stackId="a"
                                />
                                <ChartLegend content={<ChartLegendContent />} />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}