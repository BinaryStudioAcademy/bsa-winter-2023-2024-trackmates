import { PaginationValue } from "@trackmates/shared";
import { type FormEvent } from "react";

import { getValidClassNames, initDebounce } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
} from "~/libs/hooks/hooks.js";
import {
	type CourseSearchRequestDto,
	DEFAULT_SEARCH_MY_COURSES_PAYLOAD,
	SEARCH_COURSES_DELAY_MS,
} from "~/modules/courses/courses.js";
import { actions as userCourseActions } from "~/modules/user-courses/user-courses.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { Input } from "../input/input.js";
import styles from "./styles.module.css";

const handleFormSubmit = (event_: FormEvent<HTMLFormElement>): void => {
	event_.preventDefault();
};

type Properties = {
	className?: string | undefined;
	inputClassName?: string | undefined;
};

const SearchBar: React.FC<Properties> = ({
	className: classNames,
	inputClassName: inputClassNames,
}: Properties) => {
	const { user } = useAppSelector((state) => ({
		user: state.auth.user as UserAuthResponseDto,
	}));
	const dispatch = useAppDispatch();

	const { control, errors, handleSubmit } = useAppForm({
		defaultValues: DEFAULT_SEARCH_MY_COURSES_PAYLOAD,
		mode: "onChange",
	});

	const handleSearchCourses = (
		filterFormData: CourseSearchRequestDto,
	): void => {
		void dispatch(
			userCourseActions.loadMyCourses({
				count: PaginationValue.DEFAULT_COUNT,
				page: PaginationValue.DEFAULT_PAGE,
				search: filterFormData.search,
				userId: user.id,
			}),
		);
	};

	const handleFormChange = (event_: React.BaseSyntheticEvent): void => {
		void handleSubmit(handleSearchCourses)(event_);
	};

	const handleDebouncedSearchCourses = initDebounce(
		handleFormChange,
		SEARCH_COURSES_DELAY_MS,
	);

	return (
		<form
			className={getValidClassNames(styles["form"], classNames)}
			onChange={handleDebouncedSearchCourses}
			onSubmit={handleFormSubmit}
		>
			<Input
				className={getValidClassNames(styles["search"], inputClassNames)}
				color="light"
				control={control}
				errors={errors}
				hasVisuallyHiddenLabel
				iconName="search"
				label="Search"
				name="search"
				placeholder="Search or type"
			/>
		</form>
	);
};

export { SearchBar };
