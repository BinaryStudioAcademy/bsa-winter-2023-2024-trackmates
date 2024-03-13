import { Checkbox } from "~/libs/components/components.js";
import { useAppForm, useCallback, useEffect } from "~/libs/hooks/hooks.js";

type Properties = {
	isChecked: boolean;
	itemId: number;
	name: string;
	onToggle: (itemId: number) => void;
};

const EditCheckbox: React.FC<Properties> = ({
	isChecked,
	itemId,
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
		onToggle(itemId);
	}, [onToggle, itemId]);

	return (
		<form onChange={handleFormChange}>
			<Checkbox
				control={control}
				errors={errors}
				hasVisuallyHiddenLabel
				label="Toggle to edit"
				name={name}
			/>
		</form>
	);
};

export { EditCheckbox };
