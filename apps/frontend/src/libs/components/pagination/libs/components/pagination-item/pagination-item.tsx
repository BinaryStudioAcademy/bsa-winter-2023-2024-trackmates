import { type AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type IconName, type ValueOf } from "~/libs/types/types.js";

import { Icon } from "../../../../icon/icon.js";
import { Button } from "./../../../../button/button.js";
import styles from "./styles.module.css";

type Properties = {
	href: ValueOf<typeof AppRoute>;
	iconName?: IconName;
	isActive?: boolean;
	isDisabled: boolean;
	label: string;
};

const PaginationItem: React.FC<Properties> = ({
	href,
	iconName,
	isActive,
	isDisabled = false,
	label,
}: Properties) => {
	const linkClasses = getValidClassNames(styles["item"], {
		[styles["active"] as string]: isActive,
		[styles["disabled"] as string]: isDisabled,
	});

	return (
		<li className={styles["item-container"]}>
			{isDisabled ? (
				<span className={linkClasses}>
					<Icon name={iconName as IconName} />
				</span>
			) : (
				<Button
					className={linkClasses}
					href={href}
					iconName={iconName}
					label={label}
				/>
			)}
		</li>
	);
};

export { PaginationItem };
