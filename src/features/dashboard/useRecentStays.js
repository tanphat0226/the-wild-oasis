import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { getStaysAfterDate } from '../../services/apiBookings'
import { BOOKINGS_STATUS } from '../../utils/constants'

export const useRecentStays = () => {
	const [searchParams] = useSearchParams()

	const numDays = !searchParams.get('last') ? 7 : searchParams.get('last')

	const queryDate = subDays(new Date(), numDays).toISOString()

	const { isPending: isLoading, data: stays } = useQuery({
		queryFn: () => getStaysAfterDate(queryDate),
		queryKey: ['stays', `last-${numDays}`],
	})

	const confirmedStays = stays?.filter(
		(stay) =>
			stay.status === BOOKINGS_STATUS.CHECKED_IN ||
			stay.status === BOOKINGS_STATUS.CHECKED_OUT
	)

	return { isLoading, stays, confirmedStays }
}
