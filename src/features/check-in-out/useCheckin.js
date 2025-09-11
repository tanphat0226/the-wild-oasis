import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from '../../services/apiBookings'
import { BOOKINGS_STATUS } from '../../utils/constants'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const useCheckin = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const { mutate: checkin, isPending: isCheckingIn } = useMutation({
		mutationFn: ({ bookingId, breakfast }) =>
			updateBooking(bookingId, {
				status: BOOKINGS_STATUS.CHECKED_IN,
				isPaid: true,
				...breakfast,
			}),

		onSuccess: (data) => {
			toast.success(`Booking #${data.id} checked in successfully`)

			// Revalidate all active queries so visible UI stays in sync with server data
			queryClient.invalidateQueries({ active: true })

			navigate('/')
		},

		onError: () => toast.error('There was an error while checking in'),
	})

	return { checkin, isCheckingIn }
}
