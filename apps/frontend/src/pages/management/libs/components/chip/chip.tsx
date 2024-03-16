import styles from "./styles.module.css";

type Properties = {
	label: string;
};

const Chip: React.FC<Properties> = ({ label }: Properties) => {
	return (
		<div className={styles["chip"]}>
			<span>{label}</span>
		</div>
	);
};

export { Chip };
