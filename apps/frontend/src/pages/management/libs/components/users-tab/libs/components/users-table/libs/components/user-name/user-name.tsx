import { type CellProps } from "react-table";

import { type UsersTableRow } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = CellProps<UsersTableRow, string>;

const UserName: React.FC<Properties> = ({ value: name }: Properties) => {
	return <p className={styles["name"]}>{name}</p>;
};

export { UserName };
