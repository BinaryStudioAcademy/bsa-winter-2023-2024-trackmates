import { type GroupResponseDto } from "~/modules/groups/groups.js";

import { type GroupsTableRow } from "../../types/types.js";

const getGroupData = (groups: GroupResponseDto[]): GroupsTableRow[] => {
	return groups.map(({ id, name, permissions }) => {
		return {
			id,
			name,
			permissions: permissions.map((permission) => {
				return permission.name;
			}),
		};
	});
};

export { getGroupData };
