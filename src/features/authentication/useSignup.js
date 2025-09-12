import { useMutation } from '@tanstack/react-query'
import { signup as signupApi } from '../../services/apiAuth'
import toast from 'react-hot-toast'

export const useSignup = () => {
	const { mutate: signup, isPending: isSigningUp } = useMutation({
		mutationFn: ({ email, password, fullName }) =>
			signupApi({ email, password, fullName }),
		onSuccess: (data) => {
			toast.success(
				'Signup successful! Please check your email to confirm your account.'
			)
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	return { signup, isSigningUp }
}
