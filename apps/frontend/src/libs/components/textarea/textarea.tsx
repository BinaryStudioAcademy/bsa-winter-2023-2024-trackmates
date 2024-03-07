import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useFormController } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	className?: string | undefined;
	control: Control<T, null>;
	errors: FieldErrors<T>;
	hasVisuallyHiddenLabel?: boolean;
	label: string;
	name: FieldPath<T>;
	placeholder?: string;
	rows?: number;
};

const Textarea = <T extends FieldValues>({
	className,
	control,
	errors,
	hasVisuallyHiddenLabel,
	label,
	name,
	placeholder = "",
	rows,
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });

	const textareaClassnames = getValidClassNames(className, styles["textarea"]);
	const labelClasses = getValidClassNames(
		styles["heading"],
		hasVisuallyHiddenLabel && "visually-hidden",
	);

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	return (
		<label className={styles["container"]}>
			<span className={labelClasses}>{label}</span>
			<TextareaAutosize
				className={textareaClassnames}
				{...field}
				placeholder={placeholder}
				rows={rows}
			/>
			{hasError && <span className={styles["error"]}>{error as string}</span>}
		</label>
	);
};

export { Textarea };
