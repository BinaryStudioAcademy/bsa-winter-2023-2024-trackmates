import { type CellProps } from "react-table";

import { useAppSelector } from "~/libs/hooks/hooks.js";

import { type UsersTableRow } from "../../types/types.js";
import styles from "./styles.module.css";

type Properties = CellProps<UsersTableRow, string>;

const UserEmail: React.FC<Properties> = ({ value: email }: Properties) => {
	const { user } = useAppSelector((state) => {
		return {
			user: state.auth.user,
		};
	});

	return (
		<>
			<p className={styles["email"]}>{email}</p>
			{user?.email === email && (
				<span className={styles["email-highlight"]}>(you)</span>
			)}
		</>
	);
};

export { UserEmail };
