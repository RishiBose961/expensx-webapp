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
import GraphTotalIncome from "@/hook/HookIncome/GraphTotalIncome";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import InputBox from "../InputBox/InputBox";
import { useState } from "react";
import MonthYear from "@/hook/HookIncome/MonthYear";
import { Filter, X } from "lucide-react";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
export function IncomeChart() {
  const [months, setMonths] = useState("");
  const [showInput, setShowInput] = useState(false);

  const { isPending, totalsgraphresult } = GraphTotalIncome({ months }) as {
    isPending: boolean;
    totalsgraphresult: {
      totalIncome: string;
      totalExpense: number;
      remainingBalance: number;
    };
  };

  // Convert month number to full month name
  const getMonthName = (monthNumber: string) => {
    return new Date(2023, parseInt(monthNumber) - 1).toLocaleString("default", {
      month: "long",
    });
  };

  // Get selected year and month from the utility function
  const { selectedYear, selectedMonth } = MonthYear({ months });

  const formattedMonth = getMonthName(selectedMonth);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <div className=" flex justify-between items-center">
          <CardTitle>Month Wise</CardTitle>
          {!showInput && <Filter className="mx-2 size-5" onClick={() => setShowInput(true)} />}
          {showInput && <X className="mx-2 size-5" onClick={() => setShowInput(false)} />}
        </div>

        {showInput && (
          <InputBox
            title={"Month"}
            type={"month"}
            value={months}
            onChange={(e) => setMonths(e.target.value)}
          />
        )}
 
        <CardDescription>
          <p>
            {formattedMonth} {selectedYear}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={[totalsgraphresult]}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {isPending
                            ? "Loading"
                            : totalsgraphresult?.remainingBalance?.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Remaining Balance
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="totalIncome"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-desktop)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="totalExpense"
              fill="var(--color-mobile)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing Remaining Balance for the last 1 months
        </div>
      </CardFooter>
    </Card>
  );
}
