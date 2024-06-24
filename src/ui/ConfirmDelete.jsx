import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  handleShowForm,
  variation,
  buttonText,
}) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Confirm {resourceName}</Heading>
      <p>
        Are you sure you want to {resourceName} permanently? This action cannot
        be undone.
      </p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={handleShowForm}
        >
          Cancel
        </Button>
        <Button variation={variation} disabled={disabled} onClick={onConfirm}>
          {buttonText}
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
