import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCabin } from '../../services/apiCabins'
import toast from 'react-hot-toast'
import FormRow from '../../ui/FormRow'

function CreateCabinForm() {
	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm()

	const queryClient = useQueryClient()

	const { mutate, isPending: isCreating } = useMutation({
		mutationFn: createCabin,
		onSuccess: (data) => {
			toast.success('New cabin created successfully')

			queryClient.invalidateQueries({ queryKey: ['cabins'] })

			// Reset the form fields when the createion new cabin is successful
			reset()
		},
		onError: (error) => toast.error(error.message),
	})

	const onSubmit = (data) => {
		mutate({ ...data, image: data.image[0] })
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
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation='secondary' type='reset'>
					Cancel
				</Button>
				<Button disabled={isCreating} type='submit'>
					Add cabin
				</Button>
			</FormRow>
		</Form>
	)
}

export default CreateCabinForm
