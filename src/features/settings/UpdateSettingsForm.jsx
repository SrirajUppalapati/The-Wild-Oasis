import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useGetSettings, useUpdateSettings } from "./useSettings";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const Label = styled.label`
  font-weight: 500;
`;

function UpdateSettingsForm() {
  const { isPending, settings } = useGetSettings();

  const { register, handleSubmit, formState, getValues } = useForm();

  const errors = formState;

  const { isUpdating, updateSetting } = useUpdateSettings();

  if (isPending) return <Spinner />;

  const { breakfast_price, max_days, max_guests_per_booking, min_days } =
    settings;

  function onSubmit(data) {
    updateSetting({ data });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="min_days">Minimum Nights/booking</Label>
        <Input
          type="number"
          id="min_days"
          defaultValue={min_days}
          disabled={isUpdating}
          {...register("min_days", {
            required: "This field is required",
            min: 1,
          })}
        />
        {errors?.min_days?.message && <Error>{errors.min_days.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="max_days">Maximum nights/booking</Label>
        <Input
          type="number"
          id="max_days"
          disabled={isUpdating}
          defaultValue={max_days}
          {...register("max_days", {
            required: "This field is required",
            validate: (value) =>
              Number(value) > Number(getValues().min_days) ||
              "Maximum number of days should be greater than minimum.",
          })}
        />
        {errors?.max_days?.message && <Error>{errors.max_days.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="max_guests_per_booking">Maximum guests/booking</Label>
        <Input
          type="number"
          id="max_guests_per_booking"
          disabled={isUpdating}
          defaultValue={max_guests_per_booking}
          {...register("max_guests_per_booking", {
            required: "This field is required",
          })}
        />{" "}
        {errors?.max_guests_per_booking?.message && (
          <Error>{errors.max_guests_per_booking.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <Label htmlFor="image">Breakfast price</Label>
        <Input
          type="number"
          id="breakfast_price"
          disabled={isUpdating}
          defaultValue={breakfast_price}
          {...register("breakfast_price", {
            required: "This field is required",
          })}
        />{" "}
        {errors?.breakfast_price?.message && (
          <Error>{errors.breakfast_price.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <Button>Change Settings</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
