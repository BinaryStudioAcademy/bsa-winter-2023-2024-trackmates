import { createSlice } from "@reduxjs/toolkit";

import { DataStatus, PaginationValue } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type CourseDto } from "~/modules/courses/courses.js";

import { type UserCourseResponseDto } from "../libs/types/types.js";
import {
	add,
	loadCommonCourses,
	loadMyCourses,
	loadUserCourses,
} from "./actions.js";

type State = {
	addCourseDataStatus: ValueOf<typeof DataStatus>;
	commonCourses: CourseDto[];
	commonDataStatus: ValueOf<typeof DataStatus>;
	dataStatus: ValueOf<typeof DataStatus>;
	myCourses: UserCourseResponseDto[];
	totalMyCoursesCount: number;
	totalUserCoursesCount: number;
	userCourses: UserCourseResponseDto[];
};

const initialState: State = {
	addCourseDataStatus: DataStatus.IDLE,
	commonCourses: [],
	commonDataStatus: DataStatus.IDLE,
	dataStatus: DataStatus.IDLE,
	myCourses: [],
	totalMyCoursesCount: 0,
	totalUserCoursesCount: 0,
	userCourses: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(add.fulfilled, (state, action) => {
			if (state.totalMyCoursesCount < PaginationValue.DEFAULT_COUNT) {
				state.myCourses.unshift(action.payload);
			}

			state.totalMyCoursesCount++;
			state.addCourseDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(add.pending, (state) => {
			state.addCourseDataStatus = DataStatus.PENDING;
		});
		builder.addCase(add.rejected, (state) => {
			state.addCourseDataStatus = DataStatus.REJECTED;
		});
		builder.addCase(loadMyCourses.fulfilled, (state, action) => {
			state.myCourses = action.payload.items;
			state.totalMyCoursesCount = action.payload.total;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadMyCourses.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadMyCourses.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(loadUserCourses.fulfilled, (state, action) => {
			state.userCourses = action.payload.items;
			state.totalUserCoursesCount = action.payload.total;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadUserCourses.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadUserCourses.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(loadCommonCourses.fulfilled, (state, action) => {
			state.commonCourses = action.payload;
			state.commonDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadCommonCourses.pending, (state) => {
			state.commonDataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadCommonCourses.rejected, (state) => {
			state.commonDataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "user-courses",
	reducers: {
		reset() {
			return initialState;
		},
	},
});

export { actions, name, reducer };
