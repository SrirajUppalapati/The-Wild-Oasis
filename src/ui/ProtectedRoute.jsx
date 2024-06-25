import { useNavigate } from "react-router-dom";
import { useGetUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { loadingUser, isUserAuthenticated } = useGetUser();

  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isUserAuthenticated && !loadingUser) {
        navigate("/login");
      }
    },
    [isUserAuthenticated, navigate, loadingUser]
  );

  if (loadingUser) return <Spinner />;

  if (isUserAuthenticated) {
    return children;
  }
}

export default ProtectedRoute;
