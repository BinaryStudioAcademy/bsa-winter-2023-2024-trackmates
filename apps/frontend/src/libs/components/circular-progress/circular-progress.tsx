import styles from "./styles.module.css";

type Properties = {
	percentage: number;
};

const CircularProgress: React.FC<Properties> = ({ percentage }: Properties) => {
	return (
		<div className={styles["progress"]}>
			<svg
				className={styles["progress-bar"]}
				style={
					{
						"--percentage": percentage,
					} as React.CSSProperties
				}
				viewBox="0 0 160 160"
			>
				<circle className={styles["in-process"]} cx="80" cy="80" r="70" />
				<circle className={styles["completed"]} cx="80" cy="80" r="70" />
			</svg>
			<p className={styles["percents"]}>{percentage}%</p>
		</div>
	);
};

export { CircularProgress };
