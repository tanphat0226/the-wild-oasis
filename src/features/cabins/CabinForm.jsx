import { useForm } from 'react-hook-form'

import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Textarea from '../../ui/Textarea'

import { useCreateCabin } from './useCreateCabin'
import { useEditCabin } from './useEditCabin'

function CreateCabinForm({ cabinToEdit = {} }) {
	const { isCreating, createCabin } = useCreateCabin()
	const { isEditing, editCabin } = useEditCabin()
	const isWorking = isCreating || isEditing

	const { id: editId, ...editValues } = cabinToEdit
	const isEditSession = Boolean(editId)

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm({ defaultValues: isEditSession ? editValues : {} })

	// Handle form submission
	const onSubmit = (data) => {
		const image =
			typeof data.image === 'string' ? data.image : data.image[0]

		if (isEditSession) {
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: () => reset(),
				}
			)
		} else {
			createCabin(
				{ ...data, image },
				{
					onSuccess: () => reset(),
				}
			)
		}
	}

	// Handle form errors
	const onError = (errors) => {
		// console.log(errors)
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label='Cabin name' error={errors?.name?.message}>
				<Input
					type='text'
					id='name'
					disabled={isWorking}
					{...register('name', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow
				label='Maximum capacity'
				error={errors?.maxCapacity?.message}
			>
				<Input
					type='number'
					id='maxCapacity'
					disabled={isWorking}
					{...register('maxCapacity', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capacity must be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow
				label='Regular price'
				error={errors?.regularPrice?.message}
			>
				<Input
					type='number'
					id='regularPrice'
					disabled={isWorking}
					{...register('regularPrice', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Price must be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label='Discount' error={errors?.discount?.message}>
				<Input
					type='number'
					id='discount'
					defaultValue={0}
					disabled={isWorking}
					{...register('discount', {
						required: 'This field is required',
						validate: (value) =>
							Number(value) <= Number(getValues().regularPrice) ||
							'Discount should be less than regular price',
					})}
				/>
			</FormRow>

			<FormRow label='Description' error={errors?.description?.message}>
				<Textarea
					id='description'
					defaultValue=''
					disabled={isWorking}
					{...register('description', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label='Image'>
				<FileInput
					id='image'
					accept='image/*'
					{...register('image', {
						required: isEditSession
							? false
							: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation='secondary' type='reset'>
					Cancel
				</Button>
				<Button disabled={isWorking} type='submit'>
					{isEditSession ? 'Save changes' : 'Create new cabin'}
				</Button>
			</FormRow>
		</Form>
	)
}

export default CreateCabinForm
