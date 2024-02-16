import { Input } from "~/libs/components/components.js";
import { useAppForm, useEffect } from "~/libs/hooks/hooks.js";

import { DEFAULT_SEARCH_COURSE_PAYLOAD } from "./libs/constants/constants.js";

type Properties = {
	onSearchChange: (value: string) => void;
};

const SearchCourseForm: React.FC<Properties> = ({
	onSearchChange,
}: Properties) => {
	const { control, watch } = useAppForm({
		defaultValues: DEFAULT_SEARCH_COURSE_PAYLOAD,
	});

	const search = watch("search");

	useEffect(() => {
		onSearchChange(search);
	}, [search, onSearchChange]);

	return (
		<>
			<form name="search-course">
				<Input
					control={control}
					name="search"
					placeholder="Course name..."
					type="text"
					wide
				/>
			</form>
		</>
	);
};

export { SearchCourseForm };
