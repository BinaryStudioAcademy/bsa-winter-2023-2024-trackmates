import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { actions as userCoursesActions } from "~/modules/user-courses/user-courses.js";

import {
	type CourseDto,
	type CourseSearchResponseDto,
} from "../libs/types/types.js";
import { getAll, getById, getRecommended } from "./actions.js";

type State = {
	addedVendorCourseDataStatuses: Record<string, ValueOf<typeof DataStatus>>;
	currentCourse: CourseDto | null;
	recommendedCourses: CourseSearchResponseDto[];
	searchDataStatus: ValueOf<typeof DataStatus>;
	searchedCourses: CourseSearchResponseDto[];
};

const initialState: State = {
	addedVendorCourseDataStatuses: {},
	currentCourse: null,
	recommendedCourses: [],
	searchDataStatus: DataStatus.IDLE,
	searchedCourses: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAll.fulfilled, (state, action) => {
			state.searchedCourses = [
				...state.searchedCourses,
				...action.payload.courses,
			];
			state.searchDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAll.pending, (state) => {
			state.searchDataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAll.rejected, (state) => {
			state.searchDataStatus = DataStatus.REJECTED;
		});
		builder.addCase(getById.fulfilled, (state, action) => {
			state.currentCourse = action.payload;
			state.searchDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getById.pending, (state) => {
			state.searchDataStatus = DataStatus.PENDING;
		});
		builder.addCase(getById.rejected, (state) => {
			state.searchDataStatus = DataStatus.REJECTED;
		});
		builder.addCase(getRecommended.fulfilled, (state, action) => {
			state.recommendedCourses = action.payload.courses;
			state.searchDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getRecommended.pending, (state) => {
			state.searchDataStatus = DataStatus.PENDING;
		});
		builder.addCase(getRecommended.rejected, (state) => {
			state.searchDataStatus = DataStatus.REJECTED;
		});
		builder.addCase(userCoursesActions.add.pending, (state, action) => {
			const { vendorCourseId } = action.meta.arg;

			state.addedVendorCourseDataStatuses[vendorCourseId] = DataStatus.PENDING;
		});
		builder.addCase(userCoursesActions.add.rejected, (state, action) => {
			const { vendorCourseId } = action.meta.arg;

			state.addedVendorCourseDataStatuses[vendorCourseId] = DataStatus.REJECTED;
		});
		builder.addCase(userCoursesActions.add.fulfilled, (state, action) => {
			const { vendorCourseId } = action.meta.arg;

			state.searchedCourses = state.searchedCourses.map((course) => {
				return course.vendorCourseId === vendorCourseId
					? { ...course, isUserHasCourse: true }
					: course;
			});

			state.recommendedCourses = state.recommendedCourses.map((course) => {
				return course.vendorCourseId === vendorCourseId
					? { ...course, isUserHasCourse: true }
					: course;
			});

			state.addedVendorCourseDataStatuses[vendorCourseId] =
				DataStatus.FULFILLED;
		});
	},
	initialState,
	name: "courses",
	reducers: {
		clearCourses(state) {
			state.recommendedCourses = [];
			state.searchedCourses = [];
			state.addedVendorCourseDataStatuses = {};
		},
		clearCurrentCourse(state) {
			state.currentCourse = null;
		},
	},
});

export { actions, name, reducer };
