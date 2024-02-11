import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { useFormController } from "~/libs/hooks/hooks.js";

import "./styles.css";

type Properties<T extends FieldValues> = {
	className?: string;
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
	className,
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
		"input",
		isPrimary && "primary-input",
		isBasic && "basic-input",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<label className={inputClasses}>
			<span className="input__heading">{label}</span>
			<input {...field} placeholder={placeholder} type={type} />
			{hasError && <span className="error">{error as string}</span>}
		</label>
	);
};

export { Input };
