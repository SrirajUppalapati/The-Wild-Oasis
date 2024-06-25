import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useAuth";
import SpinnerMini from "../../ui/SpinnerMini";
// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit } = useForm();

  const { signup, isSignup } = useSignup();

  function onSubmit({ fullName, email, password, avatar }) {
    signup({ fullName, email, password });
  }

  const { errors } = formState;
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is reduired." })}
          disabled={isSignup}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is reduired.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Provide a correct email format.",
            },
          })}
          disabled={isSignup}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is reduired.",
            minLength: {
              value: 8,
              message: "Password should be atleast 8 chars.",
            },
          })}
          disabled={isSignup}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is redquired.",
            validate: (value) =>
              value === getValues().password || "Passwords should match.",
          })}
          disabled={isSignup}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isSignup}>
          Cancel
        </Button>
        <Button disabled={isSignup}>
          {isSignup ? <SpinnerMini /> : "Create New User"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
