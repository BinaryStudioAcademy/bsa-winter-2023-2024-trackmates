import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	centered?: boolean;
	children: React.ReactNode;
	width?: "medium" | "narrow" | "wide";
};

const TableCell: React.FC<Properties> = ({
	centered = false,
	children,
	width = "wide",
}: Properties) => {
	return (
		<td
			className={getValidClassNames(styles["table-data-cell"], styles[width])}
		>
			<div
				className={getValidClassNames(
					styles["content"],
					centered && styles["centered"],
				)}
			>
				{children}
			</div>
		</td>
	);
};

export { TableCell };
