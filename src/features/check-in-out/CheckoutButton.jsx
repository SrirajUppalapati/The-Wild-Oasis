import Button from "../../ui/Button";
import { useCheckInOut } from "./useCheckIn";

function CheckoutButton({ bookingId }) {
  const { isPending, checkInOut } = useCheckInOut();
  return (
    <Button
      variation="secondary"
      size="small"
      disabled={isPending}
      onClick={checkInOut({ bookingId, status: "checked-out" })}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
