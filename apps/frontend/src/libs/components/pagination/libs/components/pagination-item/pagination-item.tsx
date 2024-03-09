import { Icon } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type IconName } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	iconName?: IconName;
	isActive?: boolean | undefined;
	isDisabled?: boolean | undefined;
	label: React.ReactNode;
	onPageChange: () => void;
};

const PaginationItem: React.FC<Properties> = ({
	iconName,
	isActive,
	isDisabled,
	label,
	onPageChange,
}: Properties) => {
	const linkClasses = getValidClassNames(styles["item"], {
		[styles["active"] as string]: isActive,
		[styles["disabled"] as string]: isDisabled,
	});

	const content = iconName ? <Icon name={iconName} /> : label;

	return (
		<li className={styles["item-container"]}>
			<button
				className={linkClasses}
				disabled={isDisabled}
				onClick={onPageChange}
			>
				{content}
			</button>
		</li>
	);
};

export { PaginationItem };
