import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useFormController } from "~/libs/hooks/hooks.js";

import { type Option } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	hasVisuallyHiddenLabel?: boolean;
	label: string;
	name: FieldPath<T>;
	options: Option[];
	placeholder?: string;
};

const Select = <T extends FieldValues>({
	control,
	errors,
	hasVisuallyHiddenLabel,
	label,
	name,
	options,
	placeholder = "",
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	const selectClasses = getValidClassNames(
		styles["select"],
		hasError && styles["error-input"],
	);
	const labelClasses = getValidClassNames(
		styles["heading"],
		hasVisuallyHiddenLabel && "visually-hidden",
	);

	const defaultValue = field.value ?? "";

	return (
		<label className={styles["container"]}>
			<span className={labelClasses}>{label}</span>
			<select className={selectClasses} {...field} value={defaultValue}>
				<option disabled hidden value="">
					{placeholder}
				</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{hasError && <span className={styles["error"]}>{error as string}</span>}
		</label>
	);
};

export { Select };
export { type Option } from "./libs/types/types.js";
