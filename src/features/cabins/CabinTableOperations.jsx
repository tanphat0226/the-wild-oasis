import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import { CABINS_SORT_OPTIONS, FILTER_CABINS } from '../../utils/constant'
import SortBy from '../../ui/SortBy'

const CabinTableOperations = () => {
	return (
		<TableOperations>
			<Filter
				filterField='discount'
				options={[
					{
						label: 'All',
						value: FILTER_CABINS.ALL,
					},
					{
						label: 'No discount',
						value: FILTER_CABINS.NO_DISCOUNT,
					},
					{
						label: 'With discount',
						value: FILTER_CABINS.WITH_DISCOUNT,
					},
				]}
			/>

			<SortBy
				options={[
					{
						label: 'Sort by name (A-Z)',
						value: CABINS_SORT_OPTIONS.NAME_ASC,
					},
					{
						label: 'Sort by name (Z-A)',
						value: CABINS_SORT_OPTIONS.NAME_DESC,
					},
					{
						label: 'Sort by price (low first)',
						value: CABINS_SORT_OPTIONS.PRICE_ASC,
					},
					{
						label: 'Sort by price (high first)',
						value: CABINS_SORT_OPTIONS.PRICE_DESC,
					},
					{
						label: 'Sort by capacity (low first)',
						value: CABINS_SORT_OPTIONS.CAPACITY_ASC,
					},
					{
						label: 'Sort by capacity (high first)',
						value: CABINS_SORT_OPTIONS.CAPACITY_DESC,
					},
				]}
			/>
		</TableOperations>
	)
}

export default CabinTableOperations
