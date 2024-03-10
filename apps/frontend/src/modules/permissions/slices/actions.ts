import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/async-thunk-config.type.js";

import { type PermissionResponseDto } from "./../libs/types/types.js";
import { name as sliceName } from "./permissions.slice.js";

const getAllPermissions = createAsyncThunk<
	{ items: PermissionResponseDto[] },
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-all-permissions`, (_, { extra }) => {
	const { permissionsApi } = extra;

	return permissionsApi.getAllPermissions();
});

export { getAllPermissions };
