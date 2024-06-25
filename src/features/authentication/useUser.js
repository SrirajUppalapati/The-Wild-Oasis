import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUser,
  updateUser as updateUserAPI,
  updatePassword as updatePasswordAPI,
} from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useGetUser() {
  const { isPending: loadingUser, data: user } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
  });

  return {
    loadingUser,
    user,
    isUserAuthenticated: user?.role === "authenticated",
  };
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: ({ password, fullName, avatar }) =>
      updateUserAPI({ password, fullName, avatar }),
    onSuccess: ({ user }) => {
      toast.success("Successfully Updated!");
      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(`${err}`);
    },
  });

  return { isUpdating, updateUser };
}

export function useUpdatePassword() {
  const queryClient = useQueryClient();
  const { isPending: isUpdatingPass, mutate: updatePassword } = useMutation({
    mutationFn: ({ fullName, avatar }) =>
      updatePasswordAPI({ fullName, avatar }),
    onSuccess: (user) => {
      toast.success("Successfully Updated!");
      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error("New password should be different from old password");
      console.err(err);
    },
  });

  return { isUpdatingPass, updatePassword };
}
