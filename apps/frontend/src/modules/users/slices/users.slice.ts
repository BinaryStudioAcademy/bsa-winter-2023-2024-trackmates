import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	users: UserAuthResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	users: [],
};

const { actions, name, reducer } = createSlice({
	initialState,
	name: "users",
	reducers: {},
});

export { actions, name, reducer };
