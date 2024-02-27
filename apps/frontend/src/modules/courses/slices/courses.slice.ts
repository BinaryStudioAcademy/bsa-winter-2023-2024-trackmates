import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type CourseDto } from "../libs/types/types.js";
import { getAll, getRecommended } from "./actions.js";

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
		builder.addCase(getAll.fulfilled, (state, action) => {
			state.searchedCourses = action.payload.courses;
			state.searchDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAll.pending, (state) => {
			state.searchDataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAll.rejected, (state) => {
			state.searchDataStatus = DataStatus.REJECTED;
		});
		builder.addCase(getRecommended.fulfilled, (state, action) => {
			state.searchedCourses = action.payload.courses;
			state.searchDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getRecommended.pending, (state) => {
			state.searchDataStatus = DataStatus.PENDING;
		});
		builder.addCase(getRecommended.rejected, (state) => {
			state.searchDataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "courses",
	reducers: {},
});

export { actions, name, reducer };
