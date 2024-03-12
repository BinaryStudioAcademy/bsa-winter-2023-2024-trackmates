import { AppRoute, PaginationValue } from "~/libs/enums/enums.js";
import { getValidClassNames, initDebounce } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { SEARCH_COURSES_DELAY_MS } from "~/modules/courses/courses.js";
import { actions as userCourseActions } from "~/modules/user-courses/user-courses.js";
import { actions as userNotificationActions } from "~/modules/user-notifications/user-notifications.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { Input } from "../input/input.js";
import { NotificationFilter } from "./libs/enums/enums.js";
import { searchPagePathToDefaultValue } from "./libs/maps/maps.js";
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

	const { control, errors, handleSubmit } = useAppForm({
		defaultValues:
			searchPagePathToDefaultValue[
				pathname as keyof typeof searchPagePathToDefaultValue
			],
		mode: "onChange",
	});

	const handleFormSubmit = useCallback(
		(event_: React.FormEvent<HTMLFormElement>): void => {
			event_.preventDefault();
		},
		[],
	);

	const handleFormChange = (event_: React.BaseSyntheticEvent): void => {
		void handleSubmit((payload) => {
			switch (pathname) {
				case AppRoute.NOTIFICATIONS: {
					void dispatch(
						userNotificationActions.getUserNotifications({
							search: payload.search,
							type: NotificationFilter.ALL,
						}),
					);
					break;
				}

				case AppRoute.ROOT: {
					void dispatch(
						userCourseActions.loadMyCourses({
							count: PaginationValue.DEFAULT_COUNT,
							page: PaginationValue.DEFAULT_PAGE,
							search: payload.search,
							userId: user.id,
						}),
					);
					break;
				}
			}
		})(event_);
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
