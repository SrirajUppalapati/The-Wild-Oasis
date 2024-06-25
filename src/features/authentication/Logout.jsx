import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useAuth";
import SpinnerMini from "../../ui/SpinnerMini";
import { BiLogOut } from "react-icons/bi";

function Logout() {
  const { isPending, logout } = useLogout();

  return (
    <ButtonIcon onClick={logout} disabled={isPending}>
      <BiLogOut />
    </ButtonIcon>
  );
}

export default Logout;
