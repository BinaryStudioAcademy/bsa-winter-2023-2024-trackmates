import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { DEFAULT_COURSES_DATA } from "~/libs/constants/constants.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type CourseDto } from "../libs/types/types.js";
import { add, loadAll, search } from "./actions.js";

type State = {
	courses: CourseDto[];
	dataStatus: ValueOf<typeof DataStatus>;
	searchDataStatus: ValueOf<typeof DataStatus>;
	searchedCourses: CourseDto[];
};

const initialState: State = {
	courses: DEFAULT_COURSES_DATA,
	dataStatus: DataStatus.IDLE,
	searchDataStatus: DataStatus.IDLE,
	searchedCourses: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(add.fulfilled, (state, action) => {
			state.courses = [...state.courses, action.payload];
			state.searchDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(search.fulfilled, (state, action) => {
			state.searchedCourses = action.payload.courses;
			state.searchDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAll.fulfilled, (state, action) => {
			state.courses = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addMatcher(isAnyOf(add.pending, search.pending), (state) => {
			state.searchDataStatus = DataStatus.PENDING;
		});
		builder.addMatcher(isAnyOf(add.rejected, search.rejected), (state) => {
			state.searchDataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "courses",
	reducers: {},
});

export { actions, name, reducer };
