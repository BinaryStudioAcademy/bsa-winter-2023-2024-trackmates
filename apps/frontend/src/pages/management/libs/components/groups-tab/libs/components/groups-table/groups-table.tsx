import { Table } from "~/libs/components/components.js";
import { type DataStatus } from "~/libs/enums/enums.js";
import { useMemo } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type GroupResponseDto } from "~/modules/groups/groups.js";

import { getGroupColumns, getGroupData } from "./libs/helpers/helpers.js";
import { groupsTableColumnToColumnAlign } from "./libs/maps/maps.js";

type Properties = {
	checkIfCurrentUserHasGroup: (groupId: number) => boolean;
	groupToDataStatus: Record<
		number,
		{
			deleteDataStatus?: ValueOf<typeof DataStatus>;
			updateDataStatus?: ValueOf<typeof DataStatus>;
		}
	>;
	groups: GroupResponseDto[];
	onDelete: (groupId: number) => void;
	onEdit: (groupId: number) => void;
};

const GroupsTable: React.FC<Properties> = ({
	checkIfCurrentUserHasGroup,
	groupToDataStatus,
	groups,
	onDelete,
	onEdit,
}: Properties) => {
	const groupData = useMemo(() => {
		return getGroupData(groups);
	}, [groups]);

	const groupColumns = useMemo(() => {
		return getGroupColumns({
			checkIfCurrentUserHasGroup,
			groupToDataStatus,
			onDelete,
			onEdit,
		});
	}, [groupToDataStatus, onDelete, onEdit, checkIfCurrentUserHasGroup]);

	return (
		<Table
			columnAlign={groupsTableColumnToColumnAlign}
			columns={groupColumns}
			data={groupData}
		/>
	);
};

export { GroupsTable };
