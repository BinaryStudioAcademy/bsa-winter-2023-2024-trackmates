import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	centered?: boolean;
	children: React.ReactNode;
	narrowed?: boolean;
};

const TableCell: React.FC<Properties> = ({
	centered = false,
	children,
	narrowed = false,
}: Properties) => {
	return (
		<td
			className={getValidClassNames(
				styles["table-data-cell"],
				narrowed && styles["narrow-column"],
			)}
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
