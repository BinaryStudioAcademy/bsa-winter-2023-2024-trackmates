import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useFormController } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	color?: "dark" | "light";
	control: Control<T, null>;
	errors: FieldErrors<T>;
	label: string;
	name: FieldPath<T>;
	placeholder?: string;
	type?: "email" | "password" | "text";
};

const Input = <T extends FieldValues>({
	color = "light",
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

	const inputClasses = getValidClassNames(
		styles["input"],
		styles[color],
		hasError && styles["error-input"],
	);

	const passwordRequirements = [
		"At least 8 characters",
		"Uppercase (A-Z) and lowercase (a-z) latin letters",
		"At least one digit",
		"At least one special character (,.<>/?;:'\"[]{}\\|`~!@#$%^&*()-_+=)",
	];

	return (
		<label className={styles["container"]}>
			<span className={styles["heading"]}>{label}</span>
			<input
				className={inputClasses}
				{...field}
				placeholder={placeholder}
				type={type}
			/>
			{type === "password" && (
				<div className={styles["password-hint"]}>
					<ul className={styles["password-hint-ul"]}>
						{passwordRequirements.map((requirement, index) => (
							<li className={styles["password-hint-li"]} key={index}>
								{requirement}
							</li>
						))}
					</ul>
				</div>
			)}
			{hasError && <span className={styles["error"]}>{error as string}</span>}
		</label>
	);
};

export { Input };
