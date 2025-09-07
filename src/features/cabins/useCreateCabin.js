import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { createEditCabin } from '../../services/apiCabins'

export const useCreateCabin = () => {
	const queryClient = useQueryClient()

	// Create new cabin
	const { mutate: createCabin, isPending: isCreating } = useMutation({
		mutationFn: createEditCabin,
		onSuccess: (data) => {
			toast.success('New cabin created successfully')

			queryClient.invalidateQueries({ queryKey: ['cabins'] })
		},
		onError: (error) => toast.error(error.message),
	})

	return { isCreating, createCabin }
}
