import { type CellProps } from "react-table";

import { type GroupsTableRow } from "../groups-tab/libs/components/groups-table/libs/types/types.js";
import { Chip } from "./libs/components/components.js";

type Properties = CellProps<GroupsTableRow, string[]>;

const Chips: React.FC<Properties> = ({ value: labels }: Properties) => {
	return (
		<>
			{labels.map((label) => {
				return <Chip key={label} label={label} />;
			})}
		</>
	);
};

export { Chips };
