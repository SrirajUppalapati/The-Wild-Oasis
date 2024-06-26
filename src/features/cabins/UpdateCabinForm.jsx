import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useUpdateCabin } from "./useCabins";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function UpdateCabinForm({ cabin, handleShowForm }) {
  const { register, handleSubmit, getValues, formState } = useForm({
    defaultValues: cabin,
  });

  const { isUpdating, updateCabin } = useUpdateCabin();

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    handleShowForm();
    updateCabin({ id: cabin.id, data: { ...data, image: image } });
  }

  const { errors } = formState;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          disabled={isUpdating}
          {...register("name", {
            required: "This field is required",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isUpdating}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be a minimum of 1.",
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="reg_price">Regular price</Label>
        <Input
          type="number"
          id="reg_price"
          disabled={isUpdating}
          {...register("reg_price", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be a minimum of 1.",
            },
          })}
        />
        {errors?.reg_price?.message && (
          <Error>{errors.reg_price.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          disabled={isUpdating}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              return (
                Number(value) < Number(getValues().reg_price) ||
                "Discount should be less than regular price."
              );
            },
          })}
        />

        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isUpdating}
          {...register("description", {
            required: "This field is required",
          })}
        />
        {errors?.description?.message && (
          <Error>{errors.description.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          name="image"
          accept="image/*"
          type="file"
          disabled={isUpdating}
          {...register("image")}
        />

        {errors?.image?.message && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={handleShowForm}>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}
export default UpdateCabinForm;
