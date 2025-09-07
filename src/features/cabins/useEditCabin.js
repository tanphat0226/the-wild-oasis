import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createEditCabin } from '../../services/apiCabins'

export const useEditCabin = () => {
	const queryClient = useQueryClient()

	// Edit existing cabin
	const { mutate: editCabin, isPending: isEditing } = useMutation({
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		onSuccess: (data) => {
			toast.success('Cabin edited successfully')

			queryClient.invalidateQueries({ queryKey: ['cabins'] })
		},
		onError: (error) => toast.error(error.message),
	})

	return { isEditing, editCabin }
}
