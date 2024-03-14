import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	headers: string[];
};

const Table: React.FC<Properties> = ({ children, headers }: Properties) => {
	return (
		<table className={styles["table"]}>
			<thead>
				<tr>
					{headers.map((header, index) => {
						return (
							<th className={styles["table-header"]} key={index}>
								{header}
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody>{children}</tbody>
		</table>
	);
};

export { Table };
export { TableCell, TableRow } from "./libs/components/components.js";
