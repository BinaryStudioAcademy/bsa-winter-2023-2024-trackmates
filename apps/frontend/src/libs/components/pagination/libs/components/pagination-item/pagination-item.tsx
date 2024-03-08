import { type AppRoute } from "~/libs/enums/app-route.enum.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type ValueOf } from "~/libs/types/types.js";

import { Link } from "../../../../link/link.js";
import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	isActive?: boolean | undefined;
	isDisabled?: boolean | undefined;
	to: ValueOf<typeof AppRoute>;
};

const PaginationItem: React.FC<Properties> = ({
	children,
	isActive,
	isDisabled = false,
	to,
}: Properties) => {
	const linkClasses = getValidClassNames(styles["item"], {
		[styles["active"] as string]: isActive,
		[styles["disabled"] as string]: isDisabled,
	});

	return (
		<li className={styles["item-container"]}>
			<Link className={linkClasses} isDisabled={isDisabled} to={to}>
				{children}
			</Link>
		</li>
	);
};

export { PaginationItem };
