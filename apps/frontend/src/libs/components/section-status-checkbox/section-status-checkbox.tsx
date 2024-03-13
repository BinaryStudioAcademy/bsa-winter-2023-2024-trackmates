import { useAppForm, useCallback, useEffect } from "~/libs/hooks/hooks.js";

import { Checkbox } from "../checkbox/checkbox.js";

type Properties = {
	isChecked: boolean;
	isDisabled?: boolean;
	name: string;
	onToggle: () => void;
};

const SectionStatusCheckbox: React.FC<Properties> = ({
	isChecked,
	isDisabled,
	name,
	onToggle,
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
		onToggle();
	}, [onToggle]);

	return (
		<form onChange={handleFormChange}>
			<Checkbox
				control={control}
				errors={errors}
				hasVisuallyHiddenLabel
				isDisabled={isDisabled}
				label="Toggle section status"
				name={name}
			/>
		</form>
	);
};

export { SectionStatusCheckbox };
