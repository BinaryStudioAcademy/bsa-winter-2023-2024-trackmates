import { Button, Input } from "~/libs/components/components.tsx";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.ts";
import {
  type UserSignUpRequestDto,
  userSignUpValidationSchema,
} from "~/modules/users/users.ts";

import { DEFAULT_SIGN_UP_PAYLOAD } from "./libs/constants.ts";

type Properties = {
  onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
  const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
    defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
    validationSchema: userSignUpValidationSchema,
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <>
      <h3>Sign Up</h3>
      <form onSubmit={handleFormSubmit}>
        <p>
          <Input
            control={control}
            errors={errors}
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="text"
          />
        </p>
        <p>
          <Input
            control={control}
            errors={errors}
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="text"
          />
        </p>
        <Button label="Sign up" type="submit" />
      </form>
    </>
  );
};

export { SignUpForm };
