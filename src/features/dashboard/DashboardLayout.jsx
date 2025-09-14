import styled from 'styled-components'
import Spinner from '../../ui/Spinner'
import { useCabins } from '../cabins/useCabins'
import DurationChart from './DurationChart'
import SalesChart from './SalesChart'
import Stats from './Stats'
import { useRecentBookings } from './useRecentBookings'
import { useRecentStays } from './useRecentStays'

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`

function DashboardLayout() {
	const { isLoading: isBookingLoading, bookings } = useRecentBookings()
	const {
		isLoading: isStayLoading,
		numDays,
		confirmedStays,
	} = useRecentStays()
	const { cabins, isLoading: isCabinLoading } = useCabins()

	if (isBookingLoading || isStayLoading || isCabinLoading) return <Spinner />

	return (
		<StyledDashboardLayout>
			<Stats
				bookings={bookings}
				confirmedStays={confirmedStays}
				numDays={numDays}
				cabinCount={cabins.length}
			/>
			<div>Today's Activity</div>

			<DurationChart confirmedStays={confirmedStays} />
			<SalesChart bookings={bookings} numDays={numDays} />
		</StyledDashboardLayout>
	)
}

export default DashboardLayout
