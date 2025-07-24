interface TripBooking {
    id: number;
    destination: string;
    avatar: string;
    travelDates: string;
}

interface LatestTripBookingsData {
    bookings: TripBooking[];
}

export default function LatestTripBookings({ data }: { data: LatestTripBookingsData }) {
    const { bookings } = data;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Latest trip bookings</h2>

            <div className="space-y-1">
                {/* Header */}
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">BOOKING</span>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">TRAVEL DATES</span>
                </div>

                {/* Bookings List */}
                <div className="space-y-4 pt-2">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="flex justify-between items-center py-2">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                                    <img
                                        src={booking.avatar}
                                        alt={booking.destination}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(booking.destination.charAt(0))}&background=06b6d4&color=ffffff`;
                                        }}
                                    />
                                </div>
                                <span className="text-sm font-medium text-gray-900">{booking.destination}</span>
                            </div>
                            <span className="text-sm text-gray-600">{booking.travelDates}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}