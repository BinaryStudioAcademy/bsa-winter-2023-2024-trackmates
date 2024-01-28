import { type UserSignUpRequestDto } from "~/modules/users/users.ts";

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
  email: "",
  password: "",
};

export { DEFAULT_SIGN_UP_PAYLOAD };
