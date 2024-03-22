import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { actions as userCoursesActions } from "~/modules/user-courses/user-courses.js";

import {
	type CourseDto,
	type CourseSearchResponseDto,
} from "../libs/types/types.js";
import {
	deleteById,
	getAll,
	getAllByVendor,
	getById,
	getRecommended,
	update,
} from "./actions.js";

type State = {
	addedVendorCourseDataStatuses: Record<string, ValueOf<typeof DataStatus>>;
	allCourses: CourseDto[];
	allCoursesDataStatus: ValueOf<typeof DataStatus>;
	courseToDataStatus: Record<
		number,
		{
			deleteDataStatus?: ValueOf<typeof DataStatus>;
			updateDataStatus?: ValueOf<typeof DataStatus>;
		}
	>;
	currentCourse: CourseDto | null;
	recommendedCourses: CourseSearchResponseDto[];
	searchDataStatus: ValueOf<typeof DataStatus>;
	searchedCourses: CourseSearchResponseDto[];
	totalCoursesCount: number;
};

const initialState: State = {
	addedVendorCourseDataStatuses: {},
	allCourses: [],
	allCoursesDataStatus: DataStatus.IDLE,
	courseToDataStatus: {},
	currentCourse: null,
	recommendedCourses: [],
	searchDataStatus: DataStatus.IDLE,
	searchedCourses: [],
	totalCoursesCount: 0,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAllByVendor.fulfilled, (state, action) => {
			state.searchedCourses = [
				...state.searchedCourses,
				...action.payload.courses,
			];
			state.searchDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAllByVendor.pending, (state) => {
			state.searchDataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAllByVendor.rejected, (state) => {
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
				const hasUserCourse = course.vendorCourseId === vendorCourseId;

				return hasUserCourse ? { ...course, hasUserCourse } : course;
			});

			state.recommendedCourses = state.recommendedCourses.map((course) => {
				const hasUserCourse = course.vendorCourseId === vendorCourseId;

				return hasUserCourse ? { ...course, hasUserCourse } : course;
			});

			state.addedVendorCourseDataStatuses[vendorCourseId] =
				DataStatus.FULFILLED;
		});
		builder.addCase(
			getAll.fulfilled,
			(state, { payload: { items, total } }) => {
				state.allCourses = items;
				state.totalCoursesCount = total;
				state.allCoursesDataStatus = DataStatus.FULFILLED;
			},
		);
		builder.addCase(getAll.pending, (state) => {
			state.allCoursesDataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAll.rejected, (state) => {
			state.allCoursesDataStatus = DataStatus.REJECTED;
		});

		builder.addCase(
			deleteById.fulfilled,
			(
				state,
				{
					meta: {
						arg: { courseId },
					},
					payload,
				},
			) => {
				if (payload) {
					state.allCourses = state.allCourses.filter((course) => {
						return course.id !== courseId;
					});
					state.courseToDataStatus[courseId] = {
						deleteDataStatus: DataStatus.FULFILLED,
					};
				}
			},
		);
		builder.addCase(
			deleteById.pending,
			(
				state,
				{
					meta: {
						arg: { courseId },
					},
				},
			) => {
				state.courseToDataStatus[courseId] = {
					deleteDataStatus: DataStatus.PENDING,
				};
			},
		);
		builder.addCase(
			deleteById.rejected,
			(
				state,
				{
					meta: {
						arg: { courseId },
					},
				},
			) => {
				state.courseToDataStatus[courseId] = {
					deleteDataStatus: DataStatus.REJECTED,
				};
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
				state.courseToDataStatus[courseId] = {
					updateDataStatus: DataStatus.FULFILLED,
				};
			},
		);

		builder.addCase(
			update.pending,
			(
				state,
				{
					meta: {
						arg: { id: courseId },
					},
				},
			) => {
				state.courseToDataStatus[courseId] = {
					updateDataStatus: DataStatus.PENDING,
				};
			},
		);
		builder.addCase(
			update.rejected,
			(
				state,
				{
					meta: {
						arg: { id: courseId },
					},
				},
			) => {
				state.courseToDataStatus[courseId] = {
					updateDataStatus: DataStatus.REJECTED,
				};
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
