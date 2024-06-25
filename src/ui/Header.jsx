import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { BiUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: right;
`;

const StyledMenu = styled.ul`
  display: flex;
  gap: 2rem;
`;

function Header() {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <StyledMenu>
        <li>
          <UserAvatar />
        </li>
        <li>
          <ButtonIcon
            onClick={() => {
              navigate("/account");
            }}
          >
            <BiUser />
          </ButtonIcon>
        </li>
        <li>
          <Logout />
        </li>
      </StyledMenu>
    </StyledHeader>
  );
}

export default Header;
