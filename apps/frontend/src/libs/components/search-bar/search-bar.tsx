import { initDebounce } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
} from "~/libs/hooks/hooks.js";
import {
	type CourseSearchRequestDto,
	DEFAULT_SEARCH_COURSE_PAYLOAD,
	SEARCH_COURSES_DELAY_MS,
} from "~/modules/courses/courses.js";
import { actions as userCourseActions } from "~/modules/user-courses/user-courses.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { Icon } from "../icon/icon.js";
import { Input } from "../input/input.js";
import styles from "./styles.module.css";

const SearchBar: React.FC = () => {
	const { user } = useAppSelector((state) => ({
		user: state.auth.user as UserAuthResponseDto,
	}));
	const dispatch = useAppDispatch();

	const { control, errors, handleSubmit } = useAppForm({
		defaultValues: DEFAULT_SEARCH_COURSE_PAYLOAD,
		mode: "onChange",
	});

	const handleSearchCourses = (
		filterFormData: CourseSearchRequestDto,
	): void => {
		void dispatch(
			userCourseActions.searchMyCourses({
				id: user.id,
				search: filterFormData.search,
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
		<form className={styles["form"]} onChange={handleDebouncedSearchCourses}>
			<Input
				className={styles["search"]}
				color="light"
				control={control}
				errors={errors}
				hasVisuallyHiddenLabel
				label="Search"
				name="search"
				placeholder="Search or type"
			/>
			<Icon className={styles["search-icon"]} name="search" />
		</form>
	);
};

export { SearchBar };
