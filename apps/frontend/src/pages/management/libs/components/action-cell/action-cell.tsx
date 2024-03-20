import { type CellProps } from "react-table";

import { Button, Loader } from "~/libs/components/components.js";

import { type GroupsTableRow } from "../groups-tab/libs/components/groups-table/libs/types/types.js";
import { type ActionCellProperties } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = CellProps<GroupsTableRow, ActionCellProperties>;

const ActionCell: React.FC<Properties> = ({
	value: { isDisabled, isLoading, onDelete, onEdit },
}: Properties) => {
	if (isLoading) {
		return <Loader color="orange" size="small" />;
	}

	return (
		<div className={styles["column-buttons"]}>
			<Button
				className={styles["icon-button"]}
				hasVisuallyHiddenLabel
				iconName="edit"
				label="edit"
				loaderColor="orange"
				onClick={onEdit}
			/>
			<Button
				className={styles["icon-button"]}
				hasVisuallyHiddenLabel
				iconName="delete"
				isDisabled={isDisabled}
				label="delete"
				loaderColor="orange"
				onClick={onDelete}
			/>
		</div>
	);
};

export { ActionCell };
