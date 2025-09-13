import { useForm } from 'react-hook-form'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { useSignup } from './useSignup'

function SignupForm() {
	const { signup, isSigningUp } = useSignup()
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		reset,
	} = useForm()

	const onSubmit = ({ fullName, email, password }) => {
		signup(
			{ fullName, email, password },
			{
				onSettled: () => reset(),
			}
		)
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label='Full name' error={errors.fullName?.message}>
				<Input
					type='text'
					id='fullName'
					{...register('fullName', {
						required: 'This field is required',
					})}
					disabled={isSigningUp}
				/>
			</FormRow>

			<FormRow label='Email address' error={errors.email?.message}>
				<Input
					type='email'
					id='email'
					{...register('email', {
						required: 'This field is required',
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: 'Please enter a valid email address',
						},
					})}
					disabled={isSigningUp}
				/>
			</FormRow>

			<FormRow
				label='Password (min 8 characters)'
				error={errors.password?.message}
			>
				<Input
					type='password'
					id='password'
					{...register('password', {
						required: 'This field is required',
						minLength: {
							value: 8,
							message: 'Password needs a minimum of 8 characters',
						},
					})}
					disabled={isSigningUp}
				/>
			</FormRow>

			<FormRow
				label='Repeat password'
				error={errors.passwordConfirm?.message}
			>
				<Input
					type='password'
					id='passwordConfirm'
					{...register('passwordConfirm', {
						required: 'This field is required',
						validate: (value) =>
							value === getValues().password ||
							'Passwords do not match',
					})}
					disabled={isSigningUp}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation='secondary'
					type='reset'
					disabled={isSigningUp}
					onClick={reset}
				>
					Cancel
				</Button>
				<Button disabled={isSigningUp}>Create new user</Button>
			</FormRow>
		</Form>
	)
}

export default SignupForm
