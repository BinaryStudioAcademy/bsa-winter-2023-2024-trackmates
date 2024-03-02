import { Checkbox } from "~/libs/components/components.js";
import { useAppForm, useCallback, useEffect } from "~/libs/hooks/hooks.js";
import { type CourseSectionWithStatusDto } from "~/modules/course-sections/course-sections.js";

type Properties = {
	isChecked: boolean;
	name: string;
	onToggle: (section: CourseSectionWithStatusDto) => void;
	section: CourseSectionWithStatusDto;
};

const SectionStatusCheckbox: React.FC<Properties> = ({
	isChecked,
	name,
	onToggle,
	section,
}: Properties) => {
	const { control, errors, reset } = useAppForm({
		defaultValues: {
			[name]: isChecked,
		},
	});

	useEffect(() => {
		reset({
			[name]: isChecked,
		});
	}, [name, isChecked, reset]);

	const handleFormChange = useCallback((): void => {
		onToggle(section);
	}, [onToggle, section]);

	return (
		<form onChange={handleFormChange}>
			<Checkbox
				control={control}
				errors={errors}
				hasVisuallyHiddenLabel
				label="Toggle section status"
				name={name}
			/>
		</form>
	);
};

export { SectionStatusCheckbox };
