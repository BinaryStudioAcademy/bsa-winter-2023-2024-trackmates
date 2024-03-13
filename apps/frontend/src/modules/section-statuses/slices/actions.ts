import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type SectionStatusAddRequestDto,
	type SectionStatusGetAllRequestDto,
	type SectionStatusResponseDto,
	type SectionStatusUpdateRequestDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./section-statuses.slice.js";

const getAll = createAsyncThunk<
	SectionStatusResponseDto[],
	SectionStatusGetAllRequestDto,
	AsyncThunkConfig
>(`${sliceName}/get-all`, async (requestPayload, { extra }) => {
	const { sectionStatusApi } = extra;

	const { items } =
		await sectionStatusApi.getAllByCourseIdAndUserId(requestPayload);

	return items;
});

const getAllToCompare = createAsyncThunk<
	SectionStatusResponseDto[],
	SectionStatusGetAllRequestDto,
	AsyncThunkConfig
>(`${sliceName}/get-all-to-compare`, async (requestPayload, { extra }) => {
	const { sectionStatusApi } = extra;

	const { items } =
		await sectionStatusApi.getAllByCourseIdAndUserId(requestPayload);

	return items;
});

const create = createAsyncThunk<
	SectionStatusResponseDto,
	SectionStatusAddRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create`, async (requestPayload, { extra }) => {
	const { sectionStatusApi } = extra;

	return await sectionStatusApi.create(requestPayload);
});

const updateStatus = createAsyncThunk<
	SectionStatusResponseDto,
	{ payload: SectionStatusUpdateRequestDto; sectionStatusId: number },
	AsyncThunkConfig
>(`${sliceName}/update`, async ({ payload, sectionStatusId }, { extra }) => {
	const { sectionStatusApi } = extra;

	return await sectionStatusApi.updateStatus(sectionStatusId, payload);
});

export { create, getAll, getAllToCompare, updateStatus };
