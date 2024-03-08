import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useFormController } from "~/libs/hooks/hooks.js";
import { type IconName } from "~/libs/types/types.js";

import { Icon } from "../icon/icon.js";
import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	className?: string | undefined;
	color?: "dark" | "light";
	control: Control<T, null>;
	errors: FieldErrors<T>;
	hasVisuallyHiddenLabel?: boolean;
	iconName?: IconName;
	label: string;
	name: FieldPath<T>;
	placeholder?: string;
	rows?: number;
	type?: "email" | "password" | "text";
};

const Input = <T extends FieldValues>({
	className,
	color = "light",
	control,
	errors,
	hasVisuallyHiddenLabel,
	iconName,
	label,
	name,
	placeholder = "",
	rows,
	type = "text",
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });

	const icon = iconName ? (
		<Icon className={styles["icon"]} name={iconName} />
	) : null;
	const hasIcon = Boolean(iconName);

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	const isTextArea = Boolean(rows);

	const inputClasses = getValidClassNames(
		className,
		isTextArea ? styles["textarea"] : styles["input"],
		styles[color],
		hasError && styles["error-input"],
		hasIcon && styles["input-with-icon"],
	);
	const labelClasses = getValidClassNames(
		styles["heading"],
		hasVisuallyHiddenLabel && "visually-hidden",
	);

	return (
		<label className={styles["container"]}>
			<span className={labelClasses}>{label}</span>
			{icon}
			{isTextArea ? (
				<textarea
					className={inputClasses}
					{...field}
					placeholder={placeholder}
					rows={rows}
				/>
			) : (
				<input
					className={inputClasses}
					{...field}
					placeholder={placeholder}
					type={type}
				/>
			)}
			{hasError && <span className={styles["error"]}>{error as string}</span>}
		</label>
	);
};

export { Input };
