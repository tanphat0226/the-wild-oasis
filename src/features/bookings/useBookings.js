import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'
import { BOOKINGS_STATUS } from '../../utils/constant'

export const useBookings = () => {
	const [searchParams] = useSearchParams()

	//  FILTER
	const filterValue = searchParams.get('status')
	const filter =
		!filterValue || filterValue === BOOKINGS_STATUS.ALL
			? null
			: { field: 'status', value: filterValue }

	//  FETCH BOOKINGS
	const {
		isPending: isLoading,
		data: bookings,
		error,
	} = useQuery({
		queryKey: ['bookings', filter], // Unique key for the query
		queryFn: () => getBookings({ filter }), // Function that fetches the data
	})

	return { isLoading, bookings, error }
}
