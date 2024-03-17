import { type ReactElement } from "react";

import { Button } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type IconName } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties<T> = {
	iconName: IconName;
	isDisabled?: boolean;
	isLoading?: boolean;
	item: T;
	label: string;
	onClick: (item: T) => void;
};

const ItemButton = <T,>({
	iconName,
	isDisabled = false,
	isLoading = false,
	item,
	label,
	onClick,
}: Properties<T>): ReactElement => {
	const handleClick = useCallback(() => {
		onClick(item);
	}, [item, onClick]);

	return (
		<Button
			className={styles["icon-button"]}
			hasVisuallyHiddenLabel
			iconName={iconName}
			isDisabled={isDisabled}
			isLoading={isLoading}
			label={label}
			loaderColor="orange"
			onClick={handleClick}
		/>
	);
};

export { ItemButton };
