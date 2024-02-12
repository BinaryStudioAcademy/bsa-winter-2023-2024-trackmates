import clsx from "clsx";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { useFormController } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	children?: React.ReactNode;
	control: Control<T, null>;
	errors: FieldErrors<T>;
	isBasic?: boolean;
	isPrimary?: boolean;
	label: string;
	name: FieldPath<T>;
	placeholder?: string;
	type?: "email" | "password" | "text";
};

const Input = <T extends FieldValues>({
	children,
	control,
	errors,
	isBasic = false,
	isPrimary = false,
	label,
	name,
	placeholder = "",
	type = "text",
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	const inputClasses = clsx(
		styles["input"],
		isPrimary && styles["primary"],
		isBasic && styles["basic"],
		hasError && styles["error-input"],
	);

	return (
		<label className={styles["container"]}>
			<span className={styles["heading"]}>{label}</span>
			{children}
			<input
				className={inputClasses}
				{...field}
				placeholder={placeholder}
				type={type}
			/>
			{hasError && <span className={styles["error"]}>{error as string}</span>}
		</label>
	);
};

export { Input };
