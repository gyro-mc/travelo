import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { useState } from 'react';

interface TripData {
    category: string;
    percentage: number;
    isHighlighted?: boolean;
}

interface TripTrendsData {
    tripData: TripData[];
}

export default function TripTrends({ data }: { data: TripTrendsData }) {
    const { tripData } = data;
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Custom tooltip component
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg">
                    <p className="font-medium">{`${payload[0].value}%`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 w-full max-w-4xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Trip Trends</h2>

            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={tripData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis
                            dataKey="category"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                            domain={[0, 60]}
                            tickFormatter={(value) => `${value}%`}
                        />

                        <Tooltip content={<CustomTooltip />} />

                        <Bar
                            dataKey="percentage"
                            radius={[4, 4, 0, 0]}
                            barSize={40}
                        >
                            {tripData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        entry.isHighlighted || activeIndex === index
                                            ? '#4f46e5'
                                            : '#e0e7ff'
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}