import styles from "./styles.module.css";

type Properties = {
	title: string;
};

const EmptyPagePlaceholder: React.FC<Properties> = ({ title }: Properties) => {
	return <p className={styles["empty-page-placeholder"]}>{title}</p>;
};

export { EmptyPagePlaceholder };
