import { type CellProps } from "react-table";

import { Button } from "~/libs/components/components.js";

import { type GroupsTableRow } from "../groups-tab/libs/components/groups-table/libs/types/types.js";
import { type UsersTableRow } from "../users-tab/libs/components/users-table/libs/types/types.js";
import { type ActionCellProperties } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties<T extends GroupsTableRow | UsersTableRow> = CellProps<
	T,
	ActionCellProperties
>;

const ActionCell = <T extends GroupsTableRow | UsersTableRow>({
	value: {
		isDeleteDisabled,
		isDeleteLoading,
		isEditDisabled,
		isEditLoading,
		onDelete,
		onEdit,
	},
}: Properties<T>): React.ReactElement => {
	return (
		<div className={styles["column-buttons"]}>
			<Button
				className={styles["icon-button"]}
				hasVisuallyHiddenLabel
				iconName="edit"
				isDisabled={isEditDisabled}
				isLoading={isEditLoading}
				label="edit"
				loaderColor="orange"
				onClick={onEdit}
			/>
			<Button
				className={styles["icon-button"]}
				hasVisuallyHiddenLabel
				iconName="delete"
				isDisabled={isDeleteDisabled}
				isLoading={isDeleteLoading}
				label="delete"
				loaderColor="orange"
				onClick={onDelete}
			/>
		</div>
	);
};

export { ActionCell };
