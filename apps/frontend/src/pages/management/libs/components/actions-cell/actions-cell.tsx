import { type ReactElement } from "react";

import { Button } from "~/libs/components/components.js";
import { useCallback } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties<T> = {
	isDeleteDisabled: boolean;
	isEditDisabled: boolean;
	isLoading: boolean;
	item: T;
	onDelete: (item: T) => void;
	onEdit: (item: T) => void;
};

const ActionsCell = <T,>({
	isDeleteDisabled,
	isEditDisabled,
	isLoading,
	item,
	onDelete,
	onEdit,
}: Properties<T>): ReactElement => {
	const handleEdit = useCallback(() => {
		onEdit(item);
	}, [item, onEdit]);

	const handleDelete = useCallback(() => {
		onDelete(item);
	}, [item, onDelete]);

	return (
		<div className={styles["column-buttons"]}>
			<Button
				className={styles["icon-button"]}
				hasVisuallyHiddenLabel
				iconName="edit"
				isDisabled={isEditDisabled}
				isLoading={isLoading}
				label="edit"
				loaderColor="orange"
				onClick={handleEdit}
			/>
			<Button
				className={styles["icon-button"]}
				hasVisuallyHiddenLabel
				iconName="delete"
				isDisabled={isDeleteDisabled}
				isLoading={isLoading}
				label="delete"
				loaderColor="orange"
				onClick={handleDelete}
			/>
		</div>
	);
};

export { ActionsCell };
