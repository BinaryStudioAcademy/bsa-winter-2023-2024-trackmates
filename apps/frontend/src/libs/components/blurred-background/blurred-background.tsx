import { getValidClassNames } from "~/libs/helpers/helpers.js";

import { Button } from "../button/button.js";
import styles from "./styles.module.css";

type Properties = {
	className?: string | undefined;
	isVisible: boolean;
	onClick?: () => void;
};

const BlurredBackground: React.FC<Properties> = ({
	className,
	isVisible,
	onClick,
}: Properties) => {
	if (!isVisible) {
		return null;
	}

	return (
		<Button
			className={getValidClassNames(styles["blurred-background"], className)}
			hasVisuallyHiddenLabel
			label="blurred-background"
			onClick={onClick}
			type="button"
		/>
	);
};

export { BlurredBackground };
