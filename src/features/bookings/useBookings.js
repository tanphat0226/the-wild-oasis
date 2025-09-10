import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'
import { BOOKINGS_SORT_OPTIONS, BOOKINGS_STATUS } from '../../utils/constant'

export const useBookings = () => {
	const [searchParams] = useSearchParams()

	//  FILTER
	const filterValue = searchParams.get('status')
	const filter =
		!filterValue || filterValue === BOOKINGS_STATUS.ALL
			? null
			: { field: 'status', value: filterValue }

	// SORT
	const sortByRaw =
		searchParams.get('sortBy') || BOOKINGS_SORT_OPTIONS.START_DATE_DESC

	const [fied, direction] = sortByRaw.split('-')
	const sortBy = { field: fied, direction }

	//  FETCH BOOKINGS
	const {
		isPending: isLoading,
		data: bookings,
		error,
	} = useQuery({
		queryKey: ['bookings', filter, sortBy], // Unique key for the query
		queryFn: () => getBookings({ filter, sortBy }), // Function that fetches the data
	})

	return { isLoading, bookings, error }
}
