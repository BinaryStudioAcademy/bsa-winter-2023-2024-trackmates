import { type CellProps } from "react-table";

import { Image } from "~/libs/components/components.js";

import { type CoursesTableRow } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = CellProps<CoursesTableRow, string>;

const VendorLogo: React.FC<Properties> = ({ value: key }: Properties) => {
	return (
		<Image
			alt="Vendor source logo"
			className={styles["source-logo"]}
			src={`/vendors/${key}.svg`}
		/>
	);
};

export { VendorLogo };
