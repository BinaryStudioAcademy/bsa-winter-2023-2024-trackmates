import { Button } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	label: string;
};

const Chip: React.FC<Properties> = ({ label }: Properties) => {
	return (
		<div className={styles["chip"]}>
			<span>{label}</span>
			<Button
				className={styles["icon-button"]}
				hasVisuallyHiddenLabel
				iconName="cross"
				label={label}
			/>
		</div>
	);
};

export { Chip };
