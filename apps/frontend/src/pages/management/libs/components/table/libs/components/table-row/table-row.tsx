import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
};

const TableRow: React.FC<Properties> = ({ children }: Properties) => {
	return <tr className={styles["table-row"]}>{children}</tr>;
};

export { TableRow };
