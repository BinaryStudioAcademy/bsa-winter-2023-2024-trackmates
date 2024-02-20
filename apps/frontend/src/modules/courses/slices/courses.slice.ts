import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type CourseDto } from "../libs/types/types.js";
import { search } from "./actions.js";

type State = {
	searchDataStatus: ValueOf<typeof DataStatus>;
	searchedCourses: CourseDto[];
};

const initialState: State = {
	searchDataStatus: DataStatus.IDLE,
	searchedCourses: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(search.fulfilled, (state, action) => {
			state.searchedCourses = action.payload.courses;
			state.searchDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(search.pending, (state) => {
			state.searchDataStatus = DataStatus.PENDING;
		});
		builder.addCase(search.rejected, (state) => {
			state.searchDataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "courses",
	reducers: {},
});

export { actions, name, reducer };
