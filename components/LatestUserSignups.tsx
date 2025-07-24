interface UserSignup {
    id: number;
    name: string;
    avatar: string;
    itineraryCreated: number;
}

interface LatestUserSignupsData {
    users: UserSignup[];
}

export default function LatestUserSignups({ data }: { data: LatestUserSignupsData }) {
    const { users } = data;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Latest user signups</h2>

            <div className="space-y-1">
                {/* Header */}
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">NAME</span>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">ITINERARY CREATED</span>
                </div>

                {/* User List */}
                <div className="space-y-4 pt-2">
                    {users.map((user) => (
                        <div key={user.id} className="flex justify-between items-center py-2">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3b82f6&color=ffffff`;
                                        }}
                                    />
                                </div>
                                <span className="text-sm font-medium text-gray-900">{user.name}</span>
                            </div>
                            <span className="text-sm text-gray-600">{user.itineraryCreated}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}