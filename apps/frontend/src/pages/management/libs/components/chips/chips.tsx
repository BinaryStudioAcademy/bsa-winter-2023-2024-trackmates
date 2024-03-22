import { type CellProps } from "react-table";

import { type GroupsTableRow } from "../groups-tab/libs/components/groups-table/libs/types/types.js";
import { type UsersTableRow } from "../users-tab/libs/components/users-table/libs/types/types.js";
import { Chip } from "./libs/components/components.js";

type Properties<T extends GroupsTableRow | UsersTableRow> = CellProps<
	T,
	string[]
>;

const Chips = <T extends GroupsTableRow | UsersTableRow>({
	value: labels,
}: Properties<T>): React.ReactElement => {
	return (
		<>
			{labels.map((label) => {
				return <Chip key={label} label={label} />;
			})}
		</>
	);
};

export { Chips };
