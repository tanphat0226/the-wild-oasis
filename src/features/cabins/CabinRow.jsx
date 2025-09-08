import styled from 'styled-components'

import { formatCurrency } from '../../utils/helpers'

import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import Modal from '../../ui/Modal'
import CabinForm from './CabinForm'
import { useCreateCabin } from './useCreateCabin'
import { useDeleteCabin } from './useDeleteCabin'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Table from '../../ui/Table'

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`

const Price = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`

const Discount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
	color: var(--color-green-700);
`

const CabinRow = ({ cabin }) => {
	const { isDeleting, deleteCabin } = useDeleteCabin()
	const { isCreating, createCabin } = useCreateCabin()

	const { name, image, maxCapacity, regularPrice, discount, description } =
		cabin

	const handleDuplicate = () => {
		createCabin({
			name: `Copy of ${cabin.name}`,
			image,
			maxCapacity,
			regularPrice,
			discount,
			description,
		})
	}

	return (
		<Table.Row>
			<Img src={image} />
			<Cabin>{name}</Cabin>
			<div>Fits up to {maxCapacity} guests</div>
			<Price>{formatCurrency(regularPrice)}</Price>
			{discount ? (
				<Discount>{formatCurrency(discount)}</Discount>
			) : (
				<span>&mdash;</span>
			)}
			<div>
				<button onClick={handleDuplicate} disabled={isCreating}>
					<HiSquare2Stack />
				</button>

				<Modal>
					<Modal.Open opens={'edit'}>
						<button>
							<HiPencil />
						</button>
					</Modal.Open>
					<Modal.Window name={'edit'}>
						<CabinForm cabinToEdit={cabin} />
					</Modal.Window>

					<Modal.Open opens={'delete'}>
						<button disabled={isDeleting}>
							<HiTrash />
						</button>
					</Modal.Open>
					<Modal.Window name={'delete'}>
						<ConfirmDelete
							resourceName={`cabin "${cabin.name}"`}
							onConfirm={() => deleteCabin(cabin.id)}
							disabled={isDeleting}
						/>
					</Modal.Window>
				</Modal>
			</div>
		</Table.Row>
	)
}

export default CabinRow
