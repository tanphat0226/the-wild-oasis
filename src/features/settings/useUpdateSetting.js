import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateSetting as updateSettingApi } from '../../services/apiSettings'

export const useUpdateSetting = () => {
	const queryClient = useQueryClient()

	// Edit existing cabin
	const { mutate: updateSetting, isPending: isUpdating } = useMutation({
		mutationFn: updateSettingApi,
		onSuccess: (data) => {
			toast.success('Cabin edited successfully')

			queryClient.invalidateQueries({ queryKey: ['settings'] })
		},
		onError: (error) => toast.error(error.message),
	})

	return { isUpdating, updateSetting }
}
