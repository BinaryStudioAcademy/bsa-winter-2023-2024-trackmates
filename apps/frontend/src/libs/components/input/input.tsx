import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { formatClassNames } from "~/libs/helpers/helpers.js";
import { useFormController } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	children?: React.ReactNode;
	className?: string;
	control: Control<T, null>;
	errors: FieldErrors<T>;
	label: string;
	name: FieldPath<T>;
	placeholder?: string;
	type?: "email" | "password" | "text";
};

const Input = <T extends FieldValues>({
	children,
	className,
	control,
	errors,
	label,
	name,
	placeholder = "",
	type = "text",
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	const formattedClassNames = className
		? formatClassNames(className, styles)
		: "";
	return (
		<label className={styles["input__container"]}>
			<span className={styles["input__heading"]}>{label}</span>
			{children}
			<input
				className={`${styles["input"]} ${formattedClassNames}`}
				{...field}
				placeholder={placeholder}
				type={type}
			/>
			{hasError && <span>{error as string}</span>}
		</label>
	);
};

export { Input };
