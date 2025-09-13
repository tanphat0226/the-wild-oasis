import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateCurrentUser } from '../../services/apiAuth'

export const useUpdateUser = () => {
	const queryClient = useQueryClient()

	// Edit existing user
	const { mutate: updateUser, isPending: isUpdating } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess: ({ user }) => {
			toast.success('User account updated successfully')

			queryClient.setQueryData({ queryKey: ['user'] }, user)
			// queryClient.invalidateQueries({ queryKey: ['user'] })
		},
		onError: (error) => toast.error(error.message),
	})

	return { isUpdating, updateUser }
}
