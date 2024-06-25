import styled from "styled-components";
import { useGetUser } from "./useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { user } = useGetUser();

  return (
    <StyledUserAvatar>
      <Avatar
        src={
          !user.user_metadata.avatar
            ? "/default-user.jpg"
            : user.user_metadata.avatar
        }
      />
      <span>{user.user_metadata.fullName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
