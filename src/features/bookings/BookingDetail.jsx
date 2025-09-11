import styled from 'styled-components'

import Button from '../../ui/Button'
import ButtonGroup from '../../ui/ButtonGroup'
import ButtonText from '../../ui/ButtonText'
import Heading from '../../ui/Heading'
import Row from '../../ui/Row'
import Tag from '../../ui/Tag'
import BookingDataBox from './BookingDataBox'

import {
	HiArrowDownOnSquare,
	HiArrowUpOnSquare,
	HiTrash,
} from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { useMoveBack } from '../../hooks/useMoveBack'
import Spinner from '../../ui/Spinner'
import { BOOKINGS_STATUS } from '../../utils/constants'
import { useBooking } from './useBooking'
import { useCheckout } from '../check-in-out/useCheckout'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import { useDeleteBooking } from './useDeleteBooking'

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`

function BookingDetail() {
	const { booking, isLoading } = useBooking()
	const { checkout, isCheckingOut } = useCheckout()
	const { deleteBooking, isDeleting } = useDeleteBooking()
	const navigate = useNavigate()
	const moveBack = useMoveBack()

	if (isLoading) return <Spinner />

	const { status, id: bookingId } = booking

	const statusToTagName = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	}

	return (
		<Modal>
			<Row type='horizontal'>
				<HeadingGroup>
					<Heading as='h1'>Booking #{bookingId}</Heading>
					<Tag type={statusToTagName[status]}>
						{status.replace('-', ' ')}
					</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<ButtonGroup>
				{status === BOOKINGS_STATUS.UNCONFIRMED && (
					<Button
						icon={<HiArrowDownOnSquare />}
						onClick={() => navigate(`/checkin/${bookingId}`)}
					>
						Check in
					</Button>
				)}

				{status === BOOKINGS_STATUS.CHECKED_IN && (
					<Button
						icon={<HiArrowUpOnSquare />}
						onClick={() => checkout(bookingId)}
						disabled={isCheckingOut}
					>
						Check out
					</Button>
				)}

				<Modal.Open opens={'delete'}>
					<Button variation='danger' icon={<HiTrash />}>
						Delete booking
					</Button>
				</Modal.Open>

				<Button variation='secondary' onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>

			<Modal.Window name={'delete'}>
				<ConfirmDelete
					resourceName={`booking #${bookingId}`}
					onConfirm={() =>
						deleteBooking(bookingId, {
							onSettled: () => navigate(-1),
						})
					}
					disabled={isDeleting}
				/>
			</Modal.Window>
		</Modal>
	)
}

export default BookingDetail
