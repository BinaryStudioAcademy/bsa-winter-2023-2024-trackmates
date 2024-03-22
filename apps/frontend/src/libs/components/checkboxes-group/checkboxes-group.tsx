import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useFormController } from "~/libs/hooks/hooks.js";
import { type SelectOption } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	hasVisuallyHiddenLabel?: boolean;
	items: SelectOption[];
	label: string;
	labelClassName?: string | undefined;
	name: FieldPath<T>;
};

const CheckboxesGroup = <T extends FieldValues>({
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
	const currentValue = value as string[];

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			const { checked, value: name } = event.target;

			const newValue: string[] = checked
				? [...currentValue, name]
				: currentValue.filter((item: string) => item !== name);

			onChange(newValue);
		},
		[currentValue, onChange],
	);

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	const labelClasses = getValidClassNames(
		labelClassName,
		styles["label"],
		hasVisuallyHiddenLabel && "visually-hidden",
	);

	return (
		<div className={styles["group-container"]}>
			<span className={labelClasses}>{label}</span>
			{items.map(({ label, value }) => {
				return (
					<label className={styles["checkbox-container"]} key={value}>
						<span className={styles["checkbox-label"]}>{label}</span>
						<input
							checked={currentValue.includes(value)}
							value={value}
							{...inputProperties}
							className={styles["checkbox"]}
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
