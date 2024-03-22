import { type Column, useFlexLayout, useTable } from "react-table";

import { type ValueOf } from "~/libs/types/types.js";

import { type TableColumnAlign } from "./libs/enums/enums.js";
import { getCellProperties } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

type Properties<Data extends Record<string, unknown>> = {
	columnAlign: Record<string, ValueOf<typeof TableColumnAlign>>;
	columns: Column<Data>[];
	data: readonly Data[];
};

const Table = <Data extends Record<string, unknown>>({
	columnAlign,
	columns,
	data,
}: Properties<Data>): React.ReactElement => {
	const { getTableBodyProps, getTableProps, headers, prepareRow, rows } =
		useTable(
			{
				columns,
				data,
			},
			useFlexLayout,
		);

	return (
		<table {...getTableProps()} className={styles["table"]}>
			<thead>
				<tr className={styles["table-row"]}>
					{headers.map((column) => {
						const { key, ...properties } = column.getHeaderProps();

						return (
							<th {...properties} className={styles["table-header"]} key={key}>
								{column.render("Header")}
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					const { key, ...properties } = row.getRowProps();

					return (
						<tr {...properties} className={styles["table-row"]} key={key}>
							{row.cells.map((cell) => {
								const { key, ...properties } = getCellProperties(
									cell,
									columnAlign,
								);

								return (
									<td
										{...properties}
										className={styles["table-cell"]}
										key={key}
									>
										{cell.render("Cell")}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export { Table };
