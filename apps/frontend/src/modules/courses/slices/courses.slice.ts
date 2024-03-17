import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { actions as userCoursesActions } from "~/modules/user-courses/user-courses.js";

import { type CourseDto } from "../libs/types/types.js";
import {
	deleteById,
	getAll,
	getAllByFilter,
	getById,
	getRecommended,
	update,
} from "./actions.js";

type State = {
	addedVendorCourseDataStatuses: Record<string, ValueOf<typeof DataStatus>>;
	allCourses: CourseDto[];
	allCoursesDataStatus: ValueOf<typeof DataStatus>;
	currentCourse: CourseDto | null;
	recommendedCourses: CourseDto[];
	searchDataStatus: ValueOf<typeof DataStatus>;
	searchedCourses: CourseDto[];
};

const initialState: State = {
	addedVendorCourseDataStatuses: {},
	allCourses: [],
	allCoursesDataStatus: DataStatus.IDLE,
	currentCourse: null,
	recommendedCourses: [],
	searchDataStatus: DataStatus.IDLE,
	searchedCourses: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAllByFilter.fulfilled, (state, action) => {
			state.searchedCourses = action.payload.courses;
			state.searchDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAllByFilter.pending, (state) => {
			state.searchDataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAllByFilter.rejected, (state) => {
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

			state.addedVendorCourseDataStatuses[vendorCourseId] =
				DataStatus.FULFILLED;
		});
		builder.addCase(getAll.fulfilled, (state, action) => {
			state.allCourses = action.payload;
			state.allCoursesDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAll.pending, (state) => {
			state.allCoursesDataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAll.rejected, (state) => {
			state.allCoursesDataStatus = DataStatus.REJECTED;
		});

		builder.addCase(
			deleteById.fulfilled,
			(state, { meta: { arg: courseId }, payload }) => {
				if (payload) {
					state.allCourses = state.allCourses.filter((course) => {
						return course.id !== courseId;
					});
				}
			},
		);
		builder.addCase(
			update.fulfilled,
			(
				state,
				{
					meta: {
						arg: { id: courseId },
					},
					payload,
				},
			) => {
				state.allCourses = state.allCourses.map((course) => {
					return course.id === courseId ? payload : course;
				});
			},
		);
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
