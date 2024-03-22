import { type Column } from "react-table";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type ActionsCellProperties } from "~/pages/management/libs/components/actions-cell/libs/types/types.js";
import {
	ActionsCell,
	Chips,
} from "~/pages/management/libs/components/components.js";

import { UserEmail, UserName } from "../../components/components.js";
import { UsersTableAccessor, UsersTableHeader } from "../../enums/enums.js";
import { type UsersTableRow } from "../../types/types.js";

const getUserColumns = ({
	checkIfSameUser,
	hasPermissionToDelete,
	hasPermissionToEdit,
	onDelete,
	onEdit,
	userToDataStatus,
}: {
	checkIfSameUser: (userId: number) => boolean;
	hasPermissionToDelete: boolean;
	hasPermissionToEdit: boolean;
	onDelete: (userId: number) => void;
	onEdit: (userId: number) => void;
	userToDataStatus: Record<
		number,
		{
			deleteDataStatus?: ValueOf<typeof DataStatus>;
			updateDataStatus?: ValueOf<typeof DataStatus>;
		}
	>;
}): Column<UsersTableRow>[] => {
	return [
		{
			Header: UsersTableHeader.ID,
			accessor: UsersTableAccessor.ID,
			width: 50,
		},
		{
			Cell: UserEmail,
			Header: UsersTableHeader.EMAIL,
			accessor: UsersTableAccessor.EMAIL,
			width: 215,
		},
		{
			Cell: UserName,
			Header: UsersTableHeader.FIRST_NAME,
			accessor: UsersTableAccessor.FIRST_NAME,
			width: 215,
		},
		{
			Cell: UserName,
			Header: UsersTableHeader.LAST_NAME,
			accessor: UsersTableAccessor.LAST_NAME,
			width: 215,
		},
		{
			Cell: Chips,
			Header: UsersTableHeader.GROUPS,
			accessor: UsersTableAccessor.GROUPS,
			width: 260,
		},
		{
			Cell: ActionsCell,
			Header: UsersTableHeader.ACTIONS,
			accessor: ({ id }): ActionsCellProperties => {
				return {
					isDeleteDisabled: !hasPermissionToDelete || checkIfSameUser(id),
					isDeleteLoading:
						userToDataStatus[id]?.deleteDataStatus === DataStatus.PENDING,
					isEditDisabled: !hasPermissionToEdit || checkIfSameUser(id),
					isEditLoading:
						userToDataStatus[id]?.updateDataStatus === DataStatus.PENDING,
					onDelete: (): void => {
						onDelete(id);
					},
					onEdit: (): void => {
						onEdit(id);
					},
				};
			},
			width: 100,
		},
	];
};

export { getUserColumns };
