import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import { FILTER_CABINS } from '../../utils/constant'

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
		</TableOperations>
	)
}

export default CabinTableOperations
