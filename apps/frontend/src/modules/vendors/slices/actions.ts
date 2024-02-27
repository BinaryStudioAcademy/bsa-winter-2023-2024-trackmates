import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type VendorResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./vendors.slice.js";

const loadAll = createAsyncThunk<
	VendorResponseDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, (_, { extra }) => {
	const { vendorApi } = extra;

	return vendorApi.getAll();
});

export { loadAll };
