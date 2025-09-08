import { useState } from 'react'
import Button from '../../ui/Button'
import CreateCabinForm from './CabinForm'
import Modal from '../../ui/Modal'

const AddCabin = () => {
	const [isOpenModal, setIsOpenModal] = useState(false)

	return (
		<div>
			<Button onClick={() => setIsOpenModal((prev) => !prev)}>
				Add new cabin
			</Button>
			{isOpenModal && (
				<Modal onClose={() => setIsOpenModal(false)}>
					<CreateCabinForm
						onCloseModal={() => setIsOpenModal(false)}
					/>
				</Modal>
			)}
		</div>
	)
}

export default AddCabin
