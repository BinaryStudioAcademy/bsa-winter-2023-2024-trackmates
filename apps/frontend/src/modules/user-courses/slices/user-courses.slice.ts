import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type CourseDto } from "../libs/types/types.js";
import { add, loadMyCourses, searchMyCourses } from "./actions.js";

type State = {
	courses: CourseDto[];
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	courses: [],
	dataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(add.fulfilled, (state, action) => {
			state.courses = [...state.courses, action.payload];
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(add.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(add.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(loadMyCourses.fulfilled, (state, action) => {
			state.courses = action.payload.courses;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadMyCourses.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadMyCourses.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(searchMyCourses.fulfilled, (state, action) => {
			state.courses = action.payload.courses;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(searchMyCourses.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(searchMyCourses.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "user-courses",
	reducers: {},
});

export { actions, name, reducer };
