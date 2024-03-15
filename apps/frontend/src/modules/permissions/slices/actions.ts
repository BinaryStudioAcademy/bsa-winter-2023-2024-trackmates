import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type AllPermissionsResponseDto } from "./../libs/types/types.js";
import { name as sliceName } from "./permissions.slice.js";

const getAllPermissions = createAsyncThunk<
	AllPermissionsResponseDto,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-all-permissions`, (_, { extra }) => {
	const { permissionsApi } = extra;

	return permissionsApi.getAllPermissions();
});

export { getAllPermissions };
