"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
	{ month: "January", resolved: 186, unresolved: 80 },
	{ month: "February", resolved: 305, unresolved: 200 },
	{ month: "March", resolved: 237, unresolved: 120 },
	{ month: "April", resolved: 73, unresolved: 190 },
	{ month: "May", resolved: 209, unresolved: 130 },
	{ month: "June", resolved: 214, unresolved: 140 },
]

const chartConfig = {
	resolved: {
		label: "Resolved",
		color: "hsl(var(--chart-1))",
	},
	unresolved: {
		label: "unresolved",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig

export function Resolved() {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Resolved Alerts (Monthly)</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="dashed" />}
						/>
						<Bar dataKey="resolved" fill="var(--color-resolved)" radius={4} />
						<Bar dataKey="unresolved" fill="var(--color-unresolved)" radius={4} />
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing total visitors for the last 6 months
				</div>
			</CardFooter>
		</Card>
	)
}
