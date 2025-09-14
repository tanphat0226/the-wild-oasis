import { HiOutlineBriefcase, HiOutlineChartBar } from 'react-icons/hi'
import Stat from './Stat'
import { HiOutlineBanknotes, HiOutlineCalendarDays } from 'react-icons/hi2'
import { formatCurrency } from '../../utils/helpers'

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {
	// 1. Bookings
	const numBookings = bookings?.length || 0

	// 2. Sales
	const sales =
		bookings?.reduce((total, booking) => total + booking.totalPrice, 0) || 0

	// 3. Check ins
	const checkIns = confirmedStays?.length || 0

	// 4. Occupancy rate
	// num checked in nights / total available nights (= num cabins * num days)
	const occupancy =
		confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
		(cabinCount * numDays)

	return (
		<>
			<Stat
				title='Bookings'
				value={numBookings}
				color='blue'
				icon={<HiOutlineBriefcase />}
			/>
			<Stat
				title='Sales'
				value={formatCurrency(sales)}
				color='green'
				icon={<HiOutlineBanknotes />}
			/>
			<Stat
				title='Check ins'
				value={checkIns}
				color='indigo'
				icon={<HiOutlineCalendarDays />}
			/>
			<Stat
				title='Occupancy rate'
				value={Math.round(occupancy * 100) + '%'}
				color='yellow'
				icon={<HiOutlineChartBar />}
			/>
		</>
	)
}

export default Stats
