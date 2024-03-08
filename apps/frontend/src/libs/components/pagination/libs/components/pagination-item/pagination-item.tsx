import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	isActive?: boolean | undefined;
	isDisabled?: boolean | undefined;
	label: React.ReactNode;
	onPageChange: () => void;
};

const PaginationItem: React.FC<Properties> = ({
	isActive,
	isDisabled,
	label,
	onPageChange,
}: Properties) => {
	const linkClasses = getValidClassNames(styles["item"], {
		[styles["active"] as string]: isActive,
		[styles["disabled"] as string]: isDisabled,
	});

	return (
		<li className={styles["item-container"]}>
			<button
				className={linkClasses}
				disabled={isDisabled}
				onClick={onPageChange}
			>
				{label}
			</button>
		</li>
	);
};

export { PaginationItem };
