import { useEffect, useState } from "react"
import {
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
} from "recharts"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { ChartConfig, ChartContainer } from "../ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
const weeklyData = [
    { day: "Mon", newPatients: 120, appointments: 145 },
    { day: "Tue", newPatients: 144, appointments: 162 },
    { day: "Wed", newPatients: 132, appointments: 155 },
    { day: "Thu", newPatients: 167, appointments: 178 },
    { day: "Fri", newPatients: 157, appointments: 170 },
    { day: "Sat", newPatients: 142, appointments: 168 },
    { day: "Sun", newPatients: 139, appointments: 152 },
];

const monthlyData = [
    { day: "Week 1", newPatients: 210, appointments: 245 },
    { day: "Week 2", newPatients: 245, appointments: 262 },
    { day: "Week 3", newPatients: 232, appointments: 255 },
    { day: "Week 4", newPatients: 268, appointments: 280 },


]; // your monthly data here
const yearlyData = [
    {
        day: 'Jan',
        newPatients: 120, appointments: 145
    },
    {
        day: 'Feb',
        newPatients: 144, appointments: 162
    },
    {
        day: 'Mar', newPatients: 132, appointments: 155
    },

    {
        day: 'Apr',
        newPatients: 120, appointments: 145
    },
    {
        day: 'May',
        newPatients: 144, appointments: 162
    },
    {
        day: 'Jun', newPatients: 132, appointments: 155
    },

    {
        day: 'Jul',
        newPatients: 120, appointments: 145
    },
    {
        day: 'Aug',
        newPatients: 144, appointments: 162
    },
    {
        day: 'Sep', newPatients: 132, appointments: 155
    },

    {
        day: 'Oct',
        newPatients: 120, appointments: 145
    },
    {
        day: 'Nov',
        newPatients: 144, appointments: 162
    },
    {
        day: 'Dec', newPatients: 132, appointments: 155
    },

];

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig


export function GrowthOverviewChart() {
    const [selectedPeriod, setSelectedPeriod] = useState<"Weekly" | "Monthly" | "Yearly">("Weekly")

    const data =
        selectedPeriod === "Weekly"
            ? weeklyData
            : selectedPeriod === "Monthly"
                ? monthlyData
                : yearlyData

    useEffect(() => {
        console.log(selectedPeriod)
        console.log(data)
    }, [selectedPeriod])

    return (
        <div className="rounded-xl shadow">

            <Card>
                <CardHeader className="flex justify-between">
                    <CardTitle>Growth Overview</CardTitle>

                    <CardDescription>
                        <Tabs value={selectedPeriod} onValueChange={(val) => setSelectedPeriod(val as "Weekly" | "Monthly" | "Yearly")}>
                            <TabsList>
                                <TabsTrigger value="Yearly">Yearly</TabsTrigger>
                                <TabsTrigger value="Monthly">Monthly</TabsTrigger>
                                <TabsTrigger value="Weekly">Weekly</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </CardDescription>
                </CardHeader>
                <CardContent >
                    <ChartContainer config={chartConfig} className="max-h-[350px] w-full">
                        <LineChart
                            accessibilityLayer
                            data={data}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={"day"} />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="newPatients"
                                stroke="#3b82f6"
                                activeDot={{ r: 6 }}
                                strokeWidth={2}
                            />
                            <Line
                                type="monotone"
                                dataKey="appointments"
                                stroke="#a855f7"
                                activeDot={{ r: 6 }}
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>

            </Card>
        </div>
    )
}
