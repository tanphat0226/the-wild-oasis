import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'

export const useBookings = () => {
	const {
		isPending: isLoading,
		data: bookings,
		error,
	} = useQuery({
		queryKey: ['bookings'], // Unique key for the query
		queryFn: getBookings,
	})

	return { isLoading, bookings, error }
}
