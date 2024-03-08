import { AppRoute, PaginationValue } from "~/libs/enums/enums.js";
import { getValidClassNames, initDebounce } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useLocation,
} from "~/libs/hooks/hooks.js";
import {
	type CourseSearchRequestDto,
	SEARCH_COURSES_DELAY_MS,
} from "~/modules/courses/courses.js";
import { actions as userCourseActions } from "~/modules/user-courses/user-courses.js";
import { actions as userNotificationActions } from "~/modules/user-notifications/user-notifications.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { Input } from "../input/input.js";
import { SearchPagePathToDefaultValue } from "./libs/maps/maps.js";
import { type SearchPagePath } from "./libs/types/types.js";
import styles from "./styles.module.css";

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
	const { pathname } = useLocation();

	const SearchHandler = {
		[AppRoute.NOTIFICATIONS]: ({ search }: { search: string }): void => {
			void dispatch(userNotificationActions.getUserNotifications(search));
		},
		[AppRoute.ROOT]: (filterFormData: CourseSearchRequestDto): void => {
			void dispatch(
				userCourseActions.loadMyCourses({
					count: PaginationValue.DEFAULT_COUNT,
					page: PaginationValue.DEFAULT_PAGE,
					search: filterFormData.search,
					userId: user.id,
				}),
			);
		},
	} as const;

	const { control, errors, handleSubmit } = useAppForm({
		defaultValues: SearchPagePathToDefaultValue[pathname as SearchPagePath],
		mode: "onChange",
	});

	const handleFormSubmit = useCallback(
		(event_: React.FormEvent<HTMLFormElement>): void => {
			event_.preventDefault();
		},
		[],
	);

	const handleFormChange = (event_: React.BaseSyntheticEvent): void => {
		void handleSubmit(SearchHandler[pathname as SearchPagePath])(event_);
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
