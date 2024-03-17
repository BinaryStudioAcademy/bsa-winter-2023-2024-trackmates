import { type AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type IconName, type ValueOf } from "~/libs/types/types.js";

import { Button } from "./../../../../button/button.js";
import styles from "./styles.module.css";

type Properties = {
	iconName?: IconName;
	isActive?: boolean;
	isDisabled?: boolean;
	label: string;
	to: ValueOf<typeof AppRoute>;
};

const PaginationItem: React.FC<Properties> = ({
	iconName,
	isActive,
	isDisabled,
	label,
	to,
}: Properties) => {
	const linkClasses = getValidClassNames(styles["item"], {
		[styles["active"] as string]: isActive,
		[styles["disabled"] as string]: isDisabled,
	});

	return (
		<li className={styles["item-container"]}>
			<Button
				className={linkClasses}
				href={to}
				iconName={iconName}
				isDisabled={isDisabled}
				label={label}
			/>
		</li>
	);
};

export { PaginationItem };
