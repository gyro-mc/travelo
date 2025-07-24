import { Line, LineChart, ResponsiveContainer, Area, AreaChart } from 'recharts';

export interface data {
    name: string,
    uv: number,
    pv: number,
    amt: number,
}

interface statsType {
    statsData: data[],
    mainInfo: number,
    secondaryInfo: number,
    title: string
}

export default function StatsCard({ data }: { data: statsType }) {
    const { statsData, mainInfo, secondaryInfo, title } = data

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 relative overflow-hidden w-[400px] flex flex-row justify-between h-auto p-8 py-14">
            <div>

                {/* Title */}
                <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>

                {/* Main Number */}
                <div className="text-3xl font-bold text-gray-900 mb-2">
                    {mainInfo.toLocaleString()}
                </div>

                {/* Secondary Info */}
                <div className="flex items-center text-sm mb-4">
                    <span className="text-green-500 font-medium flex items-center">
                        ↗ {secondaryInfo}%
                    </span>
                    <span className="text-gray-500 ml-2">vs last month</span>
                </div>
            </div>

            {/* Chart */}
            <div className=" w-36 h-24 opacity-80 ">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={statsData}>
                        <defs>
                            <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="pv"
                            stroke="#10b981"
                            strokeWidth={2}
                            fill="url(#colorGreen)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}