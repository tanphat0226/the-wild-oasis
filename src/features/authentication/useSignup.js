import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export const useSignup = () => {
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: signupApi,

    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from user's email address. "
      );
    },

    onError: (error) => {
      console.log(error);
      toast.error('Something went wrong');
    },
  });

  return { signup, isSigningUp };
};
