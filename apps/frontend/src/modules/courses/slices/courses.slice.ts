import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { actions as userCoursesActions } from "~/modules/user-courses/user-courses.js";

import { type CourseDto } from "../libs/types/types.js";
import { getAll, getById, getRecommended } from "./actions.js";

type State = {
	addedVendorCourseIds: string[];
	currentCourse: CourseDto | null;
	recommendedCourses: CourseDto[];
	searchDataStatus: ValueOf<typeof DataStatus>;
	searchedCourses: CourseDto[];
};

const initialState: State = {
	addedVendorCourseIds: [],
	currentCourse: null,
	recommendedCourses: [],
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
			state.addedVendorCourseIds = [
				...state.addedVendorCourseIds,
				action.meta.arg.vendorCourseId,
			];
		});
		builder.addCase(userCoursesActions.add.rejected, (state, action) => {
			state.addedVendorCourseIds = state.addedVendorCourseIds.filter(
				(vendorCourseId) => {
					return vendorCourseId != action.meta.arg.vendorCourseId;
				},
			);
		});
	},
	initialState,
	name: "courses",
	reducers: {
		clearCourses(state) {
			state.recommendedCourses = [];
			state.searchedCourses = [];
			state.addedVendorCourseIds = [];
		},
	},
});

export { actions, name, reducer };
