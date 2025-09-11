import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getBooking } from '../../services/apiBookings'

export const useBooking = () => {
	const { bookingId } = useParams()

	const {
		isPending: isLoading,
		data: booking,
		error,
	} = useQuery({
		queryKey: ['bookings', bookingId], // Unique key for the query
		queryFn: () => getBooking(bookingId), // Function that fetches the data
		retry: false, // Disable automatic retries on failure
	})

	return { isLoading, booking, error }
}
