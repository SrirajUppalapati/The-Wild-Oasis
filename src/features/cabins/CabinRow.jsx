import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import {
  MdDeleteOutline,
  MdOutlineContentCopy,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import UpdateCabinForm from "./UpdateCabinForm";
import { useCreateCabin, useDeleteCabin } from "./useCabins";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import { useState } from "react";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const DesButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  color: var(--color-brand-800);
  border: none;
  &:hover {
    text-decoration: underline;
  }
  &:focus {
    outline: none;
  }
`;

function CabinRow({ cabin }) {
  const { id, name, maxCapacity, reg_price, discount, description, image } =
    cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();

  const [decrease, setDecrease] = useState(true);

  const { createCabin } = useCreateCabin();
  function handleCopyCabin() {
    const copyCabin = {
      name: `Copy of ${name}`,
      maxCapacity,
      reg_price,
      discount,
      description,
      image,
    };

    createCabin(copyCabin);
  }

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>
          {decrease
            ? `${description.split(" ").splice(0, 10).join(" ")}.....  `
            : description}
          <DesButton onClick={() => setDecrease((decrease) => !decrease)}>
            {decrease ? "Show More" : "Show Less"}
          </DesButton>
        </div>
        <div>Fits upto {maxCapacity} guests</div>
        <Discount>
          {discount !== 0 ? (
            formatCurrency(discount)
          ) : (
            <span
              style={{
                fontSize: "30px",
                color: "var(--color-grey-700)",
                alignItems: "center",
              }}
            >
              &minus;
            </span>
          )}
        </Discount>
        <Price>{formatCurrency(reg_price)}</Price>
        <div style={{ display: "flex", gap: "2px" }}>
          <Modal>
            <Modal.Open opens="edit-cabin">
              <Button size="small">
                <MdOutlineModeEditOutline />
              </Button>
            </Modal.Open>
            <Modal.Window name="edit-cabin">
              <UpdateCabinForm cabin={cabin} />
            </Modal.Window>
          </Modal>
          <Button onClick={handleCopyCabin} size="small" variation="secondary">
            <MdOutlineContentCopy />
          </Button>
          <Modal>
            <Modal.Open opens="confirm-delete">
              <Button size="small" variation="danger">
                <MdDeleteOutline />
              </Button>
            </Modal.Open>
            <Modal.Window name="confirm-delete">
              <ConfirmDelete
                onConfirm={() => deleteCabin(id)}
                disabled={isDeleting}
                resourceName="delete cabin"
                variation="danger"
                buttonText="Delete"
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
