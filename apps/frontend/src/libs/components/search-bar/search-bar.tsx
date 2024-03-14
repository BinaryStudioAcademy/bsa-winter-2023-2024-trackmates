import { QueryParameterName } from "~/libs/enums/enums.js";
import { getValidClassNames, initDebounce } from "~/libs/helpers/helpers.js";
import {
	useAppForm,
	useCallback,
	useEffect,
	useLocation,
	useSearchParams,
} from "~/libs/hooks/hooks.js";
import { SEARCH_COURSES_DELAY_MS } from "~/modules/courses/courses.js";

import { Input } from "../input/input.js";
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
	const { pathname } = useLocation();
	const [searchParameters, setSearchParameters] = useSearchParams();
	const searchQuery = searchParameters.get(QueryParameterName.SEARCH);

	const { control, errors, handleSubmit, reset } = useAppForm({
		defaultValues: searchQuery
			? { search: searchQuery }
			: searchPagePathToDefaultValue[
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
			const currentSearchParameters = new URLSearchParams(
				setSearchParameters.toString(),
			);
			currentSearchParameters.set(QueryParameterName.SEARCH, payload.search);
			setSearchParameters(currentSearchParameters);
		})(event_);
	};

	const handleDebouncedSearchCourses = initDebounce(
		handleFormChange,
		SEARCH_COURSES_DELAY_MS,
	);

	useEffect(() => {
		reset();
	}, [pathname, reset]);

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
