import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../../services/apiAuth'

export const useUser = () => {
	const {
		isLoading,
		error,
		data: user,
	} = useQuery({
		queryKey: ['user'],
		queryFn: getCurrentUser,
	})

	return {
		isLoading,
		error,
		user,
		isAuthenticated: user?.role === 'authenticated',
	}
}
