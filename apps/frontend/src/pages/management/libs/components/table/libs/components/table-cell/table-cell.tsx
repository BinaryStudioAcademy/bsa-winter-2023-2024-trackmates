import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	isCentered?: boolean;
	isCroppedText?: boolean;
	width?: "medium" | "narrow" | "wide";
};

const TableCell: React.FC<Properties> = ({
	children,
	isCentered = false,
	isCroppedText = false,
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
					isCroppedText && styles["cropped"],
				)}
			>
				{children}
			</div>
		</td>
	);
};

export { TableCell };
