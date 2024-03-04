import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type AddCourseRequestDto } from "~/modules/user-courses/user-courses.js";

import { type CourseDto } from "../libs/types/types.js";
import { getAll, getRecommended } from "./actions.js";

type State = {
	recommendedCourses: CourseDto[];
	searchDataStatus: ValueOf<typeof DataStatus>;
	searchedCourses: CourseDto[];
};

const initialState: State = {
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
	},
	initialState,
	name: "courses",
	reducers: {
		removeAlreadyAddedCourses(
			state,
			action: PayloadAction<AddCourseRequestDto[]>,
		) {
			state.recommendedCourses = state.recommendedCourses.filter((course) => {
				return !action.payload.some(
					(payload) =>
						payload.vendorCourseId === course.vendorCourseId &&
						payload.vendorId === course.vendor.id,
				);
			});

			state.searchedCourses = state.searchedCourses.filter((course) => {
				return !action.payload.some(
					(payload) =>
						payload.vendorCourseId === course.vendorCourseId &&
						payload.vendorId === course.vendor.id,
				);
			});
		},
	},
});

export { actions, name, reducer };
