import { useQuery } from '@tanstack/react-query'
import { getCabins } from '../../services/apiCabins'

export const useCabins = () => {
	const {
		isPending: isLoading,
		data: cabins,
		error,
	} = useQuery({
		queryKey: ['cabins'], // Unique key for the query
		queryFn: getCabins,
	})

	return { isLoading, cabins, error }
}
