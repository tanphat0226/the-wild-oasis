import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { createEditCabin } from '../../services/apiCabins'

import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Textarea from '../../ui/Textarea'

function CreateCabinForm({ cabinToEdit = {} }) {
	const { id: editId, ...editValues } = cabinToEdit
	const isEditSession = Boolean(editId)

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm({ defaultValues: isEditSession ? editValues : {} })

	const queryClient = useQueryClient()

	// Create new cabin
	const { mutate: createCabin, isPending: isCreating } = useMutation({
		mutationFn: createEditCabin,
		onSuccess: (data) => {
			toast.success('New cabin created successfully')

			queryClient.invalidateQueries({ queryKey: ['cabins'] })

			// Reset the form fields when the createion new cabin is successful
			reset()
		},
		onError: (error) => toast.error(error.message),
	})

	// Edit existing cabin
	const { mutate: editCabin, isPending: isEditing } = useMutation({
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		onSuccess: (data) => {
			toast.success('Cabin edited successfully')

			queryClient.invalidateQueries({ queryKey: ['cabins'] })

			// Reset the form fields when the createion new cabin is successful
			reset()
		},
		onError: (error) => toast.error(error.message),
	})

	const isWorking = isCreating || isEditing

	const onSubmit = (data) => {
		const image =
			typeof data.image === 'string' ? data.image : data.image[0]

		console.log(isEditSession)

		if (isEditSession) {
			editCabin({ newCabinData: { ...data, image }, id: editId })
		} else {
			createCabin({ ...data, image })
		}
	}

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
