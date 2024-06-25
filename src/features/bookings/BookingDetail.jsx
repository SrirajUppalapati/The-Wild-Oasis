import styled from "styled-components";
import { useDeleteBooking, useGetBooking } from "./useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";

import { FaRegCalendarCheck } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { BiCheck } from "react-icons/bi";
import { useCheckInOut } from "../check-in-out/useCheckIn";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { MdDeleteOutline } from "react-icons/md";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  margin-bottom: 2rem;
`;

function BookingDetail() {
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const { isPending, checkInOut } = useCheckInOut();
  const { isLoading, getBooking } = useGetBooking();

  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { id } = useParams();

  if (isLoading || isPending) return <Spinner />;

  if (!getBooking) {
    return <Empty resource={`booking #${id}`} />;
  }
  const status = getBooking.status;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{getBooking.id}</Heading>
          <Tag type={statusToTagName[status]}>{status?.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={getBooking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            variation="secondary"
            size="small"
            onClick={() => navigate(`/checkin/${getBooking.id}`)}
          >
            <FaRegCalendarCheck /> Check In
          </Button>
        )}
        {status === "checked-in" && (
          <Modal>
            <Modal.Open opens="confirm-checkout">
              <Button size="small" variation="secondary">
                <BiCheck /> Check Out
              </Button>
            </Modal.Open>
            <Modal.Window name="confirm-checkout">
              <ConfirmDelete
                onConfirm={() =>
                  checkInOut({
                    bookingId: getBooking.id,
                    status: "checked-out",
                  })
                }
                disabled={isPending}
                resourceName={`checkout this booking`}
                variation="primary"
                buttonText="Check Out"
              />
            </Modal.Window>
          </Modal>
        )}
        <Modal>
          <Modal.Open opens="confirm-delete">
            <Button size="small" variation="danger">
              <MdDeleteOutline /> Delete
            </Button>
          </Modal.Open>
          <Modal.Window name="confirm-delete">
            <ConfirmDelete
              onConfirm={() => deleteBooking(getBooking.id)}
              disabled={isDeleting}
              resourceName="delete booking"
              variation="danger"
              buttonText="Delete"
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
