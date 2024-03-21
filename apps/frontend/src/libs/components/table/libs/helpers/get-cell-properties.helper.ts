import { type Cell, type TableCellProps } from "react-table";

import { type ValueOf } from "~/libs/types/types.js";

import { TableColumnAlign } from "../enums/enums.js";

const getCellProperties = <T extends Record<string, unknown>>(
	cell: Cell<T, unknown>,
	columnAlign: Record<string, ValueOf<typeof TableColumnAlign>>,
): TableCellProps => {
	return {
		...cell.getCellProps((properties) => {
			return [
				properties,
				{
					style: {
						justifyContent:
							columnAlign[String(cell.column.Header)] ??
							TableColumnAlign.CENTER,
					},
				},
			];
		}),
	};
};

export { getCellProperties };
