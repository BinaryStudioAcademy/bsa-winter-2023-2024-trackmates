import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type CourseSectionDto } from "../libs/types/types.js";
import { getAllByCourseId } from "./actions.js";

type State = {
	courseSections: CourseSectionDto[];
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	courseSections: [],
	dataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAllByCourseId.fulfilled, (state, action) => {
			state.courseSections = action.payload.items;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAllByCourseId.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAllByCourseId.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "course-sections",
	reducers: {},
});

export { actions, name, reducer };
