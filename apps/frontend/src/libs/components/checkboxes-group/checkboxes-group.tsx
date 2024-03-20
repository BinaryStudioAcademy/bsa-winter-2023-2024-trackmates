import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useFormController } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type CheckboxItem = {
	isDisabled?: boolean;
	key: string;
	label: string;
};

type Properties<T extends FieldValues> = {
	checkboxClassName?: string | undefined;
	checkboxLabelClassName?: string | undefined;
	control: Control<T, null>;
	errors: FieldErrors<T>;
	hasVisuallyHiddenLabel?: boolean;
	items: CheckboxItem[];
	label: string;
	labelClassName?: string | undefined;
	name: FieldPath<T>;
};

const CheckboxesGroup = <T extends FieldValues>({
	checkboxClassName,
	checkboxLabelClassName,
	control,
	errors,
	hasVisuallyHiddenLabel,
	items,
	label,
	labelClassName,
	name,
}: Properties<T>): JSX.Element => {
	const {
		field: { onChange, value, ...inputProperties },
	} = useFormController({ control, name });

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			const currentValue = value as string[];
			const { checked, value: name } = event.target;

			const newValue: string[] = checked
				? [...currentValue, name]
				: currentValue.filter((item: string) => item !== name);

			onChange(newValue);
		},
		[onChange, value],
	);

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	const labelClasses = getValidClassNames(
		labelClassName,
		styles["label"],
		hasVisuallyHiddenLabel && "visually-hidden",
	);

	const checkboxLabelClasses = getValidClassNames(
		checkboxLabelClassName,
		styles["checkbox-label"],
	);

	const checkboxClasses = getValidClassNames(
		checkboxClassName,
		styles["checkbox"],
	);

	return (
		<div className={styles["group-container"]}>
			<span className={labelClasses}>{label}</span>
			{items.map(({ isDisabled, key, label }) => {
				return (
					<label className={styles["checkbox-container"]} key={key}>
						<span className={checkboxLabelClasses}>{label}</span>
						<input
							id={key}
							value={key}
							{...inputProperties}
							className={checkboxClasses}
							disabled={isDisabled}
							onChange={handleChange}
							type="checkbox"
						/>
					</label>
				);
			})}
			{hasError && <span className={styles["error"]}>{error as string}</span>}
		</div>
	);
};

export { CheckboxesGroup };
