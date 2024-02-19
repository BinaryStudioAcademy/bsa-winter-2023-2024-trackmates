import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { RefObject } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	className?: string | undefined;
	color?: "basic" | "noImage";
	inputRef: RefObject<HTMLInputElement>;
	label: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
	size?: "small";
};

const UploadButton: React.FC<Properties> = ({
	className,
	color = "basic",
	inputRef,
	label,
	onChange,
	onClick,
	size = "small",
}: Properties) => {
	const buttonStyles = getValidClassNames(
		styles["button"],
		styles[size],
		styles[color],
		className,
	);

	return (
		<>
			<button className={buttonStyles} onClick={onClick} type="button">
				<span>{label}</span>
				<input
					accept={"image/*"}
					hidden
					onChange={onChange}
					ref={inputRef}
					type="file"
				/>
			</button>
		</>
	);
};

export { UploadButton };
