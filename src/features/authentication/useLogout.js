import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { logout as logoutApi } from '../../services/apiAuth'

export const useLogout = () => {
	const queryClient = useQueryClient()
	const navigation = useNavigate()
	const { mutate: logout, isPending: isLoggingOut } = useMutation({
		mutationFn: logoutApi,
		onSuccess: () => {
			queryClient.removeQueries()

			navigation('/login', { replace: true })
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	return { logout, isLoggingOut }
}
