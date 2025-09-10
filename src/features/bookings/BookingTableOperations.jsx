import SortBy from '../../ui/SortBy'
import Filter from '../../ui/Filter'
import TableOperations from '../../ui/TableOperations'
import { BOOKINGS_SORT_OPTIONS, BOOKINGS_STATUS } from '../../utils/constants'

function BookingTableOperations() {
	return (
		<TableOperations>
			<Filter
				filterField='status'
				options={[
					{ value: BOOKINGS_STATUS.ALL, label: 'All' },
					{
						value: BOOKINGS_STATUS.CHECKED_OUT,
						label: 'Checked out',
					},
					{ value: BOOKINGS_STATUS.CHECKED_IN, label: 'Checked in' },
					{
						value: BOOKINGS_STATUS.UNCONFIRMED,
						label: 'Unconfirmed',
					},
				]}
			/>

			<SortBy
				options={[
					{
						value: BOOKINGS_SORT_OPTIONS.START_DATE_DESC,
						label: 'Sort by date (recent first)',
					},
					{
						value: BOOKINGS_SORT_OPTIONS.START_DATE_ASC,
						label: 'Sort by date (earlier first)',
					},
					{
						value: BOOKINGS_SORT_OPTIONS.TOTAL_PRICE_DESC,
						label: 'Sort by amount (high first)',
					},
					{
						value: BOOKINGS_SORT_OPTIONS.TOTAL_PRICE_ASC,
						label: 'Sort by amount (low first)',
					},
				]}
			/>
		</TableOperations>
	)
}

export default BookingTableOperations
