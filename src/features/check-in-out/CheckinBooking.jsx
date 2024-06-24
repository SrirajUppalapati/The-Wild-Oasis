import { useEffect, useState } from "react";
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "../bookings/useBooking";
import { useBreakfast, useCheckInOut } from "./useCheckIn";
import { useNavigate } from "react-router-dom";
import { useGetSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const navigate = useNavigate();

  const { isLoading, getBooking } = useGetBooking();

  const [confirmPaid, setConfirmPaid] = useState(false);

  const [confirmBreakfast, setConfirmBreakFast] = useState(false);

  const { isPending, checkInOut } = useCheckInOut();

  const { isPending: isLoadingSettings, settings } = useGetSettings();

  const { wantBreakfast, breakfast } = useBreakfast();
  useEffect(
    function () {
      setConfirmPaid(getBooking?.has_paid);
    },
    [getBooking]
  );

  useEffect(
    function () {
      setConfirmPaid(getBooking?.has_breakfast);
    },
    [getBooking]
  );

  if (isPending || isLoading || isLoadingSettings || wantBreakfast)
    return <Spinner />;

  const {
    id: bookingId,
    created_at,
    start_date,
    end_date,
    num_nights,
    num_guests,
    cabin_price,
    extra_price,
    total_price,
    has_breakfast,
    observations,
    has_paid,
    guests: { full_name: guestName, email, country, country_flag, national_id },
    cabins: { name: cabinName },
  } = getBooking;

  const optionalBreakfast = settings.breakfast_price * num_nights * num_guests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (confirmBreakfast) {
      breakfast({
        bookingId,
        has_breakfast: {
          has_breakfast: true,
          extra_price: optionalBreakfast,
          total_price: total_price + optionalBreakfast,
        },
      });
      navigate("/dashboard");
    } else {
      checkInOut({ bookingId, status: "checked-in" });
      navigate("/dashboard");
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={getBooking} />
      {!has_breakfast && (
        <Box>
          <Checkbox
            value={confirmBreakfast}
            onChange={() => {
              setConfirmBreakFast((add) => !add);
              setConfirmPaid(false);
            }}
            checked={confirmBreakfast}
            id="breakfast"
          >
            Want to add breakfast for ${optionalBreakfast}?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          value={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          checked={confirmPaid}
          id="bookingId"
        >
          I confirm that {guestName} has fully paid.
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
