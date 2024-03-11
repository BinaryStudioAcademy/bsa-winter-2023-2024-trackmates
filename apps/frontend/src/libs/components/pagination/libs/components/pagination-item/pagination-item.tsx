import { Icon } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type IconName } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	hasVisuallyHiddenLabel?: boolean;
	iconName?: IconName;
	isActive?: boolean | undefined;
	isDisabled?: boolean | undefined;
	label: React.ReactNode;
	onPageChange: () => void;
};

const PaginationItem: React.FC<Properties> = ({
	hasVisuallyHiddenLabel = false,
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

	const labelStyle = getValidClassNames(
		hasVisuallyHiddenLabel && "visually-hidden",
	);

	return (
		<li className={styles["item-container"]}>
			<button
				className={linkClasses}
				disabled={isDisabled}
				onClick={onPageChange}
			>
				{iconName && <Icon name={iconName} />}
				<span className={labelStyle}>{label}</span>
			</button>
		</li>
	);
};

export { PaginationItem };
