import styles from "./styles.module.css";

type Properties = {
	progress: number;
};

const LinearProgress: React.FC<Properties> = ({ progress }: Properties) => {
	return (
		<div
			className={styles["progress"]}
			style={
				{
					"--progress": `${progress}%`,
				} as React.CSSProperties
			}
		>
			<div className={styles["progress-fill"]} />
		</div>
	);
};

export { LinearProgress };
