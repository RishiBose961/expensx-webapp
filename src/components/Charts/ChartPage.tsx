import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import GraphTotalExpense from "@/hook/HookExpense/GraphTotalExpense";
import { Link } from "@tanstack/react-router";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function ChartPage() {
  const { isPending, fetchgraphicExpense } = GraphTotalExpense() as {
    isPending: boolean;
    fetchgraphicExpense: { monthlyExpenses: [] };
  };

  const getMonthName = (dateString: string) => {
    const [year, month] = dateString.split("-"); // Extract year and month
    return new Date(`${year}-${month}-01`).toLocaleString("en-US", {
      month: "short",
    }); // "Jan"
  };

  const chartData = fetchgraphicExpense?.monthlyExpenses
    ? Object?.entries(fetchgraphicExpense?.monthlyExpenses)?.map(
        ([key, value]) => ({
          month: getMonthName(key), // e.g., "2025-01"
          expense: value, // Expense value
        })
      )
    : [];

  if (isPending) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (chartData.length === 0) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  const year = new Date().getFullYear();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Tracker</CardTitle>
        <CardDescription>January - December {year}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis dataKey="expense" type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="expense"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            ></Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing the total expenses for the months. More Information{" "}
          <Link
            to="/statistical"
            className=" uppercase font-bold text-blue-500"
          >
            Statistical
          </Link>
          .
        </div>
      </CardFooter>
    </Card>
  );
}
