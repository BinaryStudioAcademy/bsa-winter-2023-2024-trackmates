import { createAction, createReducer } from "@reduxjs/toolkit";

import { debounce } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useCallback,
	useEffect,
	useReducer,
} from "~/libs/hooks/hooks.js";
import {
	type CourseSearchRequestDto,
	actions as courseActions,
} from "~/modules/courses/courses.js";
import {
	VendorResponseDto,
	actions as vendorActions,
} from "~/modules/vendors/vendors.js";

import { SEARCH_COURSES_DELAY_MS } from "../constants/constants.js";

type State = CourseSearchRequestDto;

const FilterAction = {
	SET_SEARCH: createAction<State["search"]>("setSearch"),
	SET_VENDORS: createAction<State["vendors"]>("setVendors"),
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
			state.vendors = action.payload;
		});
	},
);

const useSearchCourse = (): {
	handleChangeSearch: (value: State["search"]) => void;
	handleChangeVendors: (vendors: State["vendors"]) => void;
} => {
	const dispatch = useAppDispatch();
	const [searchCourseFilter, dispatchSearchCourseFilter] = useReducer(
		searchCourseFilterReducer,
		searchCourseFilterInitialState,
	);

	const handleChangeSearch = useCallback((value: State["search"]) => {
		dispatchSearchCourseFilter(FilterAction.SET_SEARCH(value));
	}, []);
	const handleChangeVendors = useCallback((vendors: State["vendors"]) => {
		dispatchSearchCourseFilter(FilterAction.SET_VENDORS(vendors));
	}, []);

	const handleSearchCourses = useCallback(
		(filter: State) => {
			void dispatch(courseActions.search(filter));
		},
		[dispatch],
	);

	const debouncedSearchCourses = useCallback(
		debounce(handleSearchCourses, SEARCH_COURSES_DELAY_MS),
		[dispatch],
	);

	useEffect(() => {
		void dispatch(vendorActions.loadAll())
			.unwrap()
			.then((vendors: VendorResponseDto[]) => {
				const defaultVendors = vendors.map((vendor) => vendor.key);
				dispatchSearchCourseFilter(FilterAction.SET_VENDORS(defaultVendors));
			});
	}, []);

	useEffect(() => {
		if (searchCourseFilter.search) {
			debouncedSearchCourses(searchCourseFilter);
		}
		return () => {
			debouncedSearchCourses.clear();
		};
	}, [handleSearchCourses, searchCourseFilter]);

	return { handleChangeSearch, handleChangeVendors };
};

export { useSearchCourse };
