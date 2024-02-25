import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/modules/notification/notification.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type AddCourseRequestDto,
	type CourseDto,
	type CoursesResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./user-courses.slice.js";

const add = createAsyncThunk<CourseDto, AddCourseRequestDto, AsyncThunkConfig>(
	`${sliceName}/add`,
	async (requestPayload, { extra }) => {
		const { notification, userCourseApi } = extra;

		const newCourse = await userCourseApi.add(requestPayload);
		notification.success(NotificationMessage.COURSE_ADDED);

		return newCourse;
	},
);

const loadMyCourses = createAsyncThunk<
	CoursesResponseDto,
	number,
	AsyncThunkConfig
>(`${sliceName}/load-all`, (userId, { extra }) => {
	const { userCourseApi } = extra;

	return userCourseApi.getAllByUserId({
		id: userId,
		search: "",
	});
});

const searchMyCourses = createAsyncThunk<
	CoursesResponseDto,
	{
		id: number;
		search: string;
	},
	AsyncThunkConfig
>(`${sliceName}/search`, (searchMyCoursesPayload, { extra }) => {
	const { userCourseApi } = extra;

	return userCourseApi.getAllByUserId(searchMyCoursesPayload);
});

export { add, loadMyCourses, searchMyCourses };
