import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/modules/notification/notification.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type AddCourseRequestDto,
	type UserCourseResponseDto,
	type UserCoursesResponseDto,
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
	UserCoursesResponseDto,
	{
		id: number;
		search: string;
	},
	AsyncThunkConfig
>(`${sliceName}/load-all`, (loadMyCoursesPayload, { extra }) => {
	const { userCourseApi } = extra;

	return userCourseApi.getAllByUserId(loadMyCoursesPayload);
});

const loadUserCourses = createAsyncThunk<
	UserCoursesResponseDto,
	number,
	AsyncThunkConfig
>(`${sliceName}/load-user-courses`, (userId, { extra }) => {
	const { userCourseApi } = extra;

	return userCourseApi.getAllByUserId({
		id: userId,
		search: "",
	});
});

export { add, loadMyCourses, loadUserCourses };
