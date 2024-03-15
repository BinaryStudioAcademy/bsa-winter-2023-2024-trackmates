import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	hasLongText?: boolean;
	isCentered?: boolean;
	width?: "medium" | "narrow" | "wide";
};

const TableCell: React.FC<Properties> = ({
	children,
	hasLongText = false,
	isCentered = false,
	width = "wide",
}: Properties) => {
	return (
		<td
			className={getValidClassNames(styles["table-data-cell"], styles[width])}
		>
			<div
				className={getValidClassNames(
					styles["content"],
					isCentered && styles["centered"],
					hasLongText && styles["long-text"],
				)}
			>
				{children}
			</div>
		</td>
	);
};

export { TableCell };
