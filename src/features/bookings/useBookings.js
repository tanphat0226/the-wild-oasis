import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getBookings } from '../../services/apiBookings'
import {
	BOOKINGS_SORT_OPTIONS,
	BOOKINGS_STATUS,
	PAGE_SIZE,
} from '../../utils/constants'

export const useBookings = () => {
	const queryClient = useQueryClient()
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

	// PAGINATION
	const page = !searchParams.get('page')
		? 1
		: Number(searchParams.get('page'))

	//  FETCH BOOKINGS
	const {
		isPending: isLoading,
		data: { data: bookings, count } = {}, // Default to an empty object to avoid undefined
		error,
	} = useQuery({
		queryKey: ['bookings', filter, sortBy, page], // Unique key for the query
		queryFn: () => getBookings({ filter, sortBy, page }), // Function that fetches the data
	})

	// Pre-fetching
	const pageCount = Math.ceil(count / PAGE_SIZE)
	if (page < pageCount)
		queryClient.prefetchQuery({
			queryKey: ['bookings', filter, sortBy, page + 1],
			queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
		})

	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ['bookings', filter, sortBy, page - 1],
			queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
		})

	return { isLoading, bookings, error, count }
}
