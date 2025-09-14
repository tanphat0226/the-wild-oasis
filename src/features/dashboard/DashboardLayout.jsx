import styled from 'styled-components'
import Spinner from '../../ui/Spinner'
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
	const { isLoading: isStayLoading, stays } = useRecentStays()

	if (isBookingLoading || isStayLoading) return <Spinner />
	console.log(stays)

	return (
		<StyledDashboardLayout>
			<div>Statistics</div>
			<div>Today's Activity</div>
			<div>Chart stay durations</div>
			<div>Chart sales</div>
		</StyledDashboardLayout>
	)
}

export default DashboardLayout
