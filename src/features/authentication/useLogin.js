import { useMutation } from '@tanstack/react-query'
import { login as loginApi } from '../../services/apiAuth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const useLogin = () => {
	const navigate = useNavigate()
	const { mutate: login, isPending: isLoggingIn } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),

		onSuccess: (user) => {
			toast.success('Login successfully')
			navigate('/')
		},

		onError: (error) => {
			console.error('Login failed:', error)

			toast.error('Provied email or password is incorrect')
		},
	})

	return { login, isLoggingIn }
}
