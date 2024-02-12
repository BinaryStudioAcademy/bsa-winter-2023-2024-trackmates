import { formatClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	className?: string;
	label: string;
	type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
	className = "",
	label,
	type = "button",
}: Properties) => {
	const formattedClassNames = className
		? formatClassNames(className, styles)
		: "";
	return (
		<button
			className={`${styles["button"]} ${formattedClassNames}`}
			type={type}
		>
			{label}
		</button>
	);
};

export { Button };
