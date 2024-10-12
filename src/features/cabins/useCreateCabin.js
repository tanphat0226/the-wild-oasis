import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: updateCabin,
    onSuccess: () => {
      toast.success('Cabin successfully created');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
};
