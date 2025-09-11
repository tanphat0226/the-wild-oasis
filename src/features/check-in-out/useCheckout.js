import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateBooking } from '../../services/apiBookings'
import { BOOKINGS_STATUS } from '../../utils/constants'

export const useCheckout = () => {
	const queryClient = useQueryClient()
	const { mutate: checkout, isPending: isCheckingOut } = useMutation({
		mutationFn: (bookingId) =>
			updateBooking(bookingId, {
				status: BOOKINGS_STATUS.CHECKED_OUT,
			}),

		onSuccess: (data) => {
			toast.success(`Booking #${data.id} checked out successfully`)

			// Revalidate all active queries so visible UI stays in sync with server data
			queryClient.invalidateQueries({ active: true })
		},

		onError: () => toast.error('There was an error while checking out'),
	})

	return { checkout, isCheckingOut }
}
