import { type CellProps } from "react-table";

import { type CoursesTableRow } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = CellProps<CoursesTableRow, string>;

const CourseText: React.FC<Properties> = ({ value: text }: Properties) => {
	return <p className={styles["text"]}>{text}</p>;
};

export { CourseText };
