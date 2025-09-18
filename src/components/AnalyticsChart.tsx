'use client';

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

interface AnalyticsChartProps {
    data?: {
        labels: string[];
        values: number[];
    };
}

export default function AnalyticsChart({ data }: AnalyticsChartProps) {
    // Default data if none provided
    const defaultData = [65, 78, 66, 44, 88, 90, 45, 88, 73, 55, 66, 77];
    const defaultLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Transform data for recharts
    const chartData = (data?.labels || defaultLabels).map((label, index) => ({
        name: label,
        value: (data?.values || defaultData)[index] || 0,
    }));

    const chartConfig = {
        value: {
            label: "Engagement",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig;

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Over Time</h3>
            <ChartContainer config={chartConfig} className="h-48">
                <BarChart
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <ChartTooltip
                        content={<ChartTooltipContent />}
                    />
                    <Bar
                        dataKey="value"
                        fill="var(--color-value)"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ChartContainer>
        </div>
    );
}