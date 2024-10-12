import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCabin as updateCabinApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export const useUpdateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isUpdate } = useMutation({
    mutationFn: ({ newCabinData, id }) => updateCabinApi(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfully edited');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdate, updateCabin };
};
