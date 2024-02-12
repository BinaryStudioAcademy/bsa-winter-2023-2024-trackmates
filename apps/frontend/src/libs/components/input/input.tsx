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

	const inputClasses = [
		styles["input"],
		isPrimary && styles["primary"],
		isBasic && styles["basic"],
	]
		.filter(Boolean)
		.join(" ");

	return (
		<label className={styles["input__container"]}>
			<span className={styles["input__heading"]}>{label}</span>
			{children}
			<input
				className={inputClasses}
				{...field}
				placeholder={placeholder}
				type={type}
			/>
			{hasError && <span>{error as string}</span>}
		</label>
	);
};

export { Input };
