import { Table } from "~/libs/components/components.js";
import { type DataStatus } from "~/libs/enums/enums.js";
import { useMemo } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { getUserColumns, getUserData } from "./libs/helpers/helpers.js";
import { usersTableColumnToColumnAlign } from "./libs/maps/maps.js";

type Properties = {
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
	users: UserAuthResponseDto[];
};

const UsersTable: React.FC<Properties> = ({
	checkIfSameUser,
	hasPermissionToDelete,
	hasPermissionToEdit,
	onDelete,
	onEdit,
	userToDataStatus,
	users,
}: Properties) => {
	const userData = useMemo(() => {
		return getUserData(users);
	}, [users]);

	const userColumns = useMemo(() => {
		return getUserColumns({
			checkIfSameUser,
			hasPermissionToDelete,
			hasPermissionToEdit,
			onDelete,
			onEdit,
			userToDataStatus,
		});
	}, [
		checkIfSameUser,
		userToDataStatus,
		onDelete,
		onEdit,
		hasPermissionToDelete,
		hasPermissionToEdit,
	]);

	return (
		<Table
			columnAlign={usersTableColumnToColumnAlign}
			columns={userColumns}
			data={userData}
		/>
	);
};

export { UsersTable };
