import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.ts";
import {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from "~/modules/users/users.ts";

import { name as sliceName } from "./auth.slice.ts";

const signUp = createAsyncThunk<
  UserSignUpResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, (registerPayload, { extra }) => {
  const { authApi } = extra;

  return authApi.signUp(registerPayload);
});

export { signUp };
