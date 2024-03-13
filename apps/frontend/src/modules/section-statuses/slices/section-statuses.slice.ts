import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type SectionStatusResponseDto } from "../libs/types/types.js";
import { create, getAll, getAllToCompare, updateStatus } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	sectionStatuses: SectionStatusResponseDto[];
	sectionToCompareStatuses: SectionStatusResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	sectionStatuses: [],
	sectionToCompareStatuses: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAll.fulfilled, (state, action) => {
			state.sectionStatuses = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(getAllToCompare.fulfilled, (state, action) => {
			state.sectionToCompareStatuses = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAllToCompare.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAllToCompare.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(create.fulfilled, (state, action) => {
			state.sectionStatuses = [...state.sectionStatuses, action.payload];
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(create.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(create.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(updateStatus.fulfilled, (state, action) => {
			const previousStatuses = state.sectionStatuses.filter(
				(status) => status.id !== action.payload.id,
			);
			state.sectionStatuses = [...previousStatuses, action.payload];
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(updateStatus.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(updateStatus.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "section-statuses",
	reducers: {},
});

export { actions, name, reducer };
