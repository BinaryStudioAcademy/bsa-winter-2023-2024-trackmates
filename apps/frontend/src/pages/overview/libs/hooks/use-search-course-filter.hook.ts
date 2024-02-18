import { createAction, createReducer } from "@reduxjs/toolkit";

import { useCallback, useReducer } from "~/libs/hooks/hooks.js";

type State = {
	search: string;
	vendors: string[];
};

const FilterAction = {
	SET_SEARCH: createAction<State["search"]>("setSearch"),
	SET_VENDORS: createAction<Record<string, boolean>>("setVendors"),
} as const;

const searchCourseFilterInitialState: State = {
	search: "",
	vendors: [],
};

const searchCourseFilterReducer = createReducer(
	searchCourseFilterInitialState,
	(builder) => {
		builder.addCase(FilterAction.SET_SEARCH, (state, action) => {
			state.search = action.payload;
		});
		builder.addCase(FilterAction.SET_VENDORS, (state, action) => {
			const vendors = Object.entries(action.payload)
				.filter(([, value]) => value)
				.map(([key]) => key);

			state.vendors = vendors;
		});
	},
);

const useSearchCourseFilter = (): {
	handleChangeSearch: (value: State["search"]) => void;
	handleChangeVendors: (vendors: Record<string, boolean>) => void;
	searchCourseFilter: State;
} => {
	const [searchCourseFilter, dispatchSearchCourseFilter] = useReducer(
		searchCourseFilterReducer,
		searchCourseFilterInitialState,
	);

	const handleChangeSearch = useCallback((value: State["search"]) => {
		dispatchSearchCourseFilter(FilterAction.SET_SEARCH(value));
	}, []);
	const handleChangeVendors = useCallback(
		(vendors: Record<string, boolean>) => {
			dispatchSearchCourseFilter(FilterAction.SET_VENDORS(vendors));
		},
		[],
	);

	return { handleChangeSearch, handleChangeVendors, searchCourseFilter };
};

export { useSearchCourseFilter };
