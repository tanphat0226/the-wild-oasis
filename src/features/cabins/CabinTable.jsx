import { useSearchParams } from 'react-router-dom'
import Menus from '../../ui/Menus'
import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table'
import CabinRow from './CabinRow'
import { useCabins } from './useCabins'
import { CABINS_SORT_OPTIONS, FILTER_CABINS } from '../../utils/constants'
import Empty from '../../ui/Empty'

const CabinTable = () => {
	const { isLoading, cabins } = useCabins()
	const [searchParams] = useSearchParams()

	if (isLoading) return <Spinner />

	if (!cabins.length) return <Empty resource='Cabins' />

	// Filter
	const filterValue = searchParams.get('discount') || FILTER_CABINS.ALL

	let filteredCabins
	if (filterValue === FILTER_CABINS.ALL) filteredCabins = cabins

	if (filterValue === FILTER_CABINS.NO_DISCOUNT)
		filteredCabins = cabins.filter((cabin) => cabin.discount === 0)

	if (filterValue === FILTER_CABINS.WITH_DISCOUNT)
		filteredCabins = cabins.filter((cabin) => cabin.discount > 0)

	// Sort
	const sortBy =
		searchParams.get('sortBy') || CABINS_SORT_OPTIONS.DATE_ADDED_ASC

	const [field, direction] = sortBy.split('-')
	const modifier = direction === 'asc' ? 1 : -1
	const sortedCabins = filteredCabins.sort((a, b) => {
		// For string field (name), use localeCompare to compare alphabetically
		if (typeof a[field] === 'string') {
			return a[field].localeCompare(b[field]) * modifier
		}

		return (a[field] - b[field]) * modifier
	})

	return (
		<Menus>
			<Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>

				<Table.Body
					// data={cabins}
					// data={filteredCabins}
					data={sortedCabins}
					render={(cabin) => (
						<CabinRow key={cabin.id} cabin={cabin} />
					)}
				/>
			</Table>
		</Menus>
	)
}

export default CabinTable
