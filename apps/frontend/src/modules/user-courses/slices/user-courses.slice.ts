import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type CourseDto } from "../libs/types/types.js";
import { add, loadMyCourses, loadUserCourses } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	myCourses: CourseDto[];
	userCourses: CourseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	myCourses: [],
	userCourses: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(add.fulfilled, (state, action) => {
			state.myCourses = [...state.myCourses, action.payload];
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(add.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(add.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(loadMyCourses.fulfilled, (state, action) => {
			state.myCourses = action.payload.courses;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadMyCourses.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadMyCourses.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(loadUserCourses.fulfilled, (state, action) => {
			state.userCourses = action.payload.courses;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadUserCourses.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadUserCourses.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "user-courses",
	reducers: {},
});

export { actions, name, reducer };
