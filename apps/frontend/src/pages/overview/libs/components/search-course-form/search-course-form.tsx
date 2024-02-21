import { Input } from "~/libs/components/components.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";

import { DEFAULT_SEARCH_COURSE_PAYLOAD } from "../../constants/constants.js";

type Properties = {
	onSearchChange: (value: string) => void;
};

const SearchCourseForm: React.FC<Properties> = ({
	onSearchChange,
}: Properties) => {
	const { control, errors, watch } = useAppForm({
		defaultValues: DEFAULT_SEARCH_COURSE_PAYLOAD,
	});

	const handleSearchChange = useCallback(() => {
		onSearchChange(watch("search"));
	}, [onSearchChange, watch]);

	return (
		<>
			<form onChange={handleSearchChange}>
				<Input
					control={control}
					errors={errors}
					hasVisuallyHiddenLabel
					label="Search course"
					name="search"
					placeholder="Course name..."
					type="text"
				/>
			</form>
		</>
	);
};

export { SearchCourseForm };
