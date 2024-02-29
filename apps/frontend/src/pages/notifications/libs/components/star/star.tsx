import styles from "./star.module.css";

type Properties = {
	height: string;
	left: string;
	top: string;
};

const Star: React.FC<Properties> = ({ height, left, top }: Properties) => {
	return (
		<div className={styles["star"]} style={{ height, left, top }}>
			<div className={styles["star"]} style={{ height }} />
		</div>
	);
};

export { Star };
