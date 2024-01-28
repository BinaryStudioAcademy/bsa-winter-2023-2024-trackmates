import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.ts";
import { type UserGetAllResponseDto } from "~/modules/users/users.ts";

import { name as sliceName } from "./users.slice.ts";

const loadAll = createAsyncThunk<
  UserGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/load-all`, (_, { extra }) => {
  const { userApi } = extra;

  return userApi.getAll();
});

export { loadAll };
