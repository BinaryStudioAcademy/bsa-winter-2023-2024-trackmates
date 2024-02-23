import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useEffect,
	useFormController,
	useRef,
	useState,
} from "~/libs/hooks/hooks.js";

import { MINIMAL_NUMBER_OF_LINES } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	className?: string | undefined;
	color?: "dark" | "light";
	control: Control<T, null>;
	errors: FieldErrors<T>;
	label: string;
	name: FieldPath<T>;
	placeholder?: string;
	type?: "email" | "password" | "text";
};

const Input = <T extends FieldValues>({
	className,
	color = "light",
	control,
	errors,
	label,
	name,
	placeholder = "",
	type = "text",
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });
	const textReference = useRef<HTMLSpanElement | null>(null);

	const [isMultiline, setIsMultiline] = useState(false);

	useEffect(() => {
		const checkMultiline = (): void => {
			const element = textReference.current;

			if (element) {
				const lineHeight = Number.parseFloat(
					window.getComputedStyle(element).lineHeight,
				);

				const containerHeight = element.clientHeight;
				const numberOfLines = Math.round(containerHeight / lineHeight);

				setIsMultiline(numberOfLines > MINIMAL_NUMBER_OF_LINES);
			}
		};

		checkMultiline();
	});

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	const inputClasses = getValidClassNames(
		className,
		styles["input"],
		styles[color],
		hasError && styles["error-input"],
	);

	return (
		<label className={styles["container"]}>
			<span className={styles["heading"]}>{label}</span>
			<input
				className={inputClasses}
				{...field}
				placeholder={placeholder}
				type={type}
			/>
			{hasError && (
				<span
					className={getValidClassNames(
						styles["error"],
						isMultiline && styles["error-two-lines"],
					)}
					ref={textReference}
				>
					{error as string}
				</span>
			)}
		</label>
	);
};

export { Input };
