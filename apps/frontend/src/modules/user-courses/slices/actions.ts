import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/modules/notification/notification.js";
import {
	type AsyncThunkConfig,
	type PaginationResponseDto,
} from "~/libs/types/types.js";

import {
	type AddCourseRequestDto,
	type CourseGetAllByUserRequestDto,
	type UserCourseResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./user-courses.slice.js";

const add = createAsyncThunk<
	UserCourseResponseDto,
	AddCourseRequestDto,
	AsyncThunkConfig
>(`${sliceName}/add`, async (requestPayload, { extra }) => {
	const { notification, userCourseApi } = extra;

	const newCourse = await userCourseApi.add(requestPayload);
	notification.success(NotificationMessage.COURSE_ADDED);

	return newCourse;
});

const loadMyCourses = createAsyncThunk<
	PaginationResponseDto<UserCourseResponseDto>,
	CourseGetAllByUserRequestDto,
	AsyncThunkConfig
>(`${sliceName}/load-all`, (loadMyCoursesPayload, { extra }) => {
	const { userCourseApi } = extra;

	return userCourseApi.getAllByUserId(loadMyCoursesPayload);
});

const loadUserCourses = createAsyncThunk<
	PaginationResponseDto<UserCourseResponseDto>,
	CourseGetAllByUserRequestDto,
	AsyncThunkConfig
>(`${sliceName}/load-user-courses`, (loadUserCoursesPayload, { extra }) => {
	const { userCourseApi } = extra;

	return userCourseApi.getAllByUserId(loadUserCoursesPayload);
});

const loadCommonCourses = createAsyncThunk<number[], number, AsyncThunkConfig>(
	`${sliceName}/load-common-courses`,
	async (userId, { extra }) => {
		const { userCourseApi } = extra;

		const { coursesIds } = await userCourseApi.getCommonWithUser(userId);

		return coursesIds;
	},
);

export { add, loadCommonCourses, loadMyCourses, loadUserCourses };
