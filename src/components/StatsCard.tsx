interface StatsCardProps {
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative';
    icon: string;
}

export default function StatsCard({ title, value, change, changeType, icon }: StatsCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                    <p className={`text-sm mt-1 flex items-center ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                        <span className="mr-1">
                            {changeType === 'positive' ? '↗' : '↘'}
                        </span>
                        {change}
                    </p>
                </div>
                <div className="text-3xl">{icon}</div>
            </div>
        </div>
    );
}