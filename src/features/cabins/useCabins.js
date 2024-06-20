import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCabin as createCabinAPI,
  deleteCabin as deleteCabinAPI,
  getCabins as getCabinsAPI,
  updateCabin as updateCabinAPI,
} from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinAPI(id),
    onSuccess: () => {
      toast.success("Successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCabin };
}

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: ({ id, data }) => {
      return updateCabinAPI(id, data);
    },
    onSuccess: () => {
      toast.success("Successfully updated");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (err) => {
      return toast.error(err.message);
    },
  });
  return { isUpdating, updateCabin };
}

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationFn: (data) => createCabinAPI(data),
    onSuccess: () => {
      toast.success("Successfully added");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createCabin };
}

export function useGetAllCabins() {
  const {
    isPending: isGettingAllCabins,
    data: getAllCabins,
    error,
  } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabinsAPI,
  });
  return { isGettingAllCabins, getAllCabins, error };
}
