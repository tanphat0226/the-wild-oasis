import styled from 'styled-components'
import Spinner from '../../ui/Spinner'
import { useRecentBookings } from './useRecentBookings'
import { useRecentStays } from './useRecentStays'
import Stats from './Stats'
import { useCabins } from '../cabins/useCabins'

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`

function DashboardLayout() {
	const { isLoading: isBookingLoading, bookings } = useRecentBookings()
	const { isLoading: isStayLoading, stays, numDays } = useRecentStays()
	const { cabins, isLoading: isCabinLoading } = useCabins()

	if (isBookingLoading || isStayLoading || isCabinLoading) return <Spinner />
	console.log(stays)

	return (
		<StyledDashboardLayout>
			<Stats
				bookings={bookings}
				confirmedStays={stays}
				numDays={numDays}
				cabinCount={cabins.length}
			/>
			<div>Today's Activity</div>
			<div>Chart stay durations</div>
			<div>Chart sales</div>
		</StyledDashboardLayout>
	)
}

export default DashboardLayout
