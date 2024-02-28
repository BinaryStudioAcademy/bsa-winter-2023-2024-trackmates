import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type CourseSectionGetAllResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./course-sections.slice.js";

const getAllByCourseId = createAsyncThunk<
	CourseSectionGetAllResponseDto,
	{ courseId: number },
	AsyncThunkConfig
>(`${sliceName}/get-all`, ({ courseId }, { extra }) => {
	const { courseSectionsApi } = extra;

	return courseSectionsApi.getAllByCourseId({ courseId: courseId });
});

export { getAllByCourseId };
