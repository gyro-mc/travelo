import { ComposedChart, Bar, Line, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

interface MonthlyData {
    month: string;
    users: number;
    growth: number;
}

interface UserGrowthData {
    monthlyData: MonthlyData[];
}

export default function UserGrowth({ data }: { data: UserGrowthData }) {
    const { monthlyData } = data;

    // Custom dot component for the line
    const CustomDot = (props: any) => {
        const { cx, cy } = props;
        return (
            <circle
                cx={cx}
                cy={cy}
                r={4}
                fill="#2563eb"
                stroke="#ffffff"
                strokeWidth={2}
            />
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 w-full max-w-4xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">User Growth</h2>

            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={monthlyData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                                <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.6} />
                            </linearGradient>
                        </defs>

                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                            domain={[0, 'dataMax + 500']}
                            tickFormatter={(value) => `${value / 1000}k`}
                        />

                        <Bar
                            dataKey="users"
                            fill="url(#barGradient)"
                            radius={[4, 4, 0, 0]}
                            barSize={40}
                        />

                        <Line
                            type="monotone"
                            dataKey="growth"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={<CustomDot />}
                            activeDot={{ r: 6, fill: '#2563eb' }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}