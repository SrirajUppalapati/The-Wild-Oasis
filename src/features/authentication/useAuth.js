import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  login as loginAPI,
  logout as logoutAPI,
  signup as signupAPI,
} from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending: isLogin, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (user) => {
      navigate("/dashboard", { replace: true });
      queryClient.setQueryData(["user"], user.user);
    },
    onError: () => toast.error("Email or Password is incorrect"),
  });

  return { isLogin, login };
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, mutate: logout } = useMutation({
    mutationFn: () => logoutAPI(),
    onSuccess: () => {
      toast.success("Successfully logged out!");
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Could not logout!");
    },
  });
  return { isPending, logout };
}

export function useSignup() {
  const { isPending: isSignup, mutate: signup } = useMutation({
    mutationFn: ({ fullName, email, password, avatar }) =>
      signupAPI({ email, password, fullName, avatar }),
    onSuccess: () => {
      toast.success("User added successfully!");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Signup Failed");
    },
  });

  return { isSignup, signup };
}
