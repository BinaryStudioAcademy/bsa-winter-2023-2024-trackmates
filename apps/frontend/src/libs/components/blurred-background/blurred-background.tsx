import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Proprieties = {
	className?: string | undefined;
	isVisible: boolean;
	onClick?: () => void;
};

const BlurredBackground: React.FC<Proprieties> = ({
	className,
	isVisible,
	onClick,
}: Proprieties) => {
	if (!isVisible) {
		return null;
	}

	return (
		<button
			className={getValidClassNames(styles["blurred-background"], className)}
			onClick={onClick}
			type="button"
		/>
	);
};

export { BlurredBackground };
