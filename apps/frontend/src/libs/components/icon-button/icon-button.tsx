import { getValidClassNames } from "~/libs/helpers/helpers.js";

import { Icon } from "../icon/icon.js";
import { type IconName } from "../icon/libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	className?: string | undefined;
	iconName: IconName;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const IconButton: React.FC<Properties> = ({
	className,
	iconName,
	onClick,
}: Properties) => (
	<button
		className={getValidClassNames(className, styles["icon-button"])}
		onClick={onClick}
		type="button"
	>
		<Icon name={iconName} />
	</button>
);

export { IconButton };
