import { useCallback } from "react";

import { Button, Loader } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	isLoading: boolean;
	label: string;
	onClick: (userId: number) => void;
	userId: number;
};

const DeleteButton: React.FC<Properties> = ({
	isLoading,
	label,
	onClick,
	userId,
}: Properties) => {
	const handleClick = useCallback(() => {
		onClick(userId);
	}, [onClick, userId]);

	return (
		<>
			{isLoading ? (
				<Loader color="orange" size="small" />
			) : (
				<Button
					className={styles["icon-button"]}
					hasVisuallyHiddenLabel
					iconName="delete"
					label={label}
					onClick={handleClick}
				/>
			)}
		</>
	);
};

export { DeleteButton };
