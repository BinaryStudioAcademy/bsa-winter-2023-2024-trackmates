import { Button } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
} from "~/libs/hooks/hooks.js";
import { actions as usersActions } from "~/modules/users/users.js";

import { Chip } from "../chip/chip.js";
import { TableCell, TableRow } from "../table/libs/components/components.js";
import { Table } from "../table/table.js";
import { UsersTableHeader } from "./libs/enums/enums.js";
import { usersHeaderToColumnName } from "./libs/maps/maps.js";
import styles from "./styles.module.css";

const UsersTab: React.FC = () => {
	const { users } = useAppSelector((state) => {
		return {
			users: state.users.users,
		};
	});

	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(usersActions.getAll());
	}, [dispatch]);

	const tableHeaders = [
		UsersTableHeader.ID,
		UsersTableHeader.EMAIL,
		UsersTableHeader.FIRST_NAME,
		UsersTableHeader.LAST_NAME,
		UsersTableHeader.GROUPS,
		UsersTableHeader.EDIT,
		UsersTableHeader.DELETE,
	];

	const tableData = users.map((user) => {
		return {
			delete: (
				<Button
					className={styles["icon-button"]}
					hasVisuallyHiddenLabel
					iconName="delete"
					label={UsersTableHeader.DELETE}
				/>
			),
			edit: (
				<Button
					className={styles["icon-button"]}
					hasVisuallyHiddenLabel
					iconName="edit"
					label={UsersTableHeader.EDIT}
				/>
			),
			email: user.email,
			firstName: user.firstName,
			groups: [
				user.groups.map((group) => {
					return <Chip key={group.id} label={group.name} />;
				}),
			],
			id: user.id,
			lastName: user.lastName,
		};
	});

	return (
		<div className={styles["container"]}>
			<Table headers={tableHeaders}>
				{tableData.map((data) => {
					return (
						<TableRow key={data.id}>
							<TableCell centered>
								{data[usersHeaderToColumnName[UsersTableHeader.ID]]}
							</TableCell>
							<TableCell>
								{data[usersHeaderToColumnName[UsersTableHeader.EMAIL]]}
							</TableCell>
							<TableCell>
								{data[usersHeaderToColumnName[UsersTableHeader.FIRST_NAME]]}
							</TableCell>
							<TableCell>
								{data[usersHeaderToColumnName[UsersTableHeader.LAST_NAME]]}
							</TableCell>
							<TableCell centered>
								{data[usersHeaderToColumnName[UsersTableHeader.GROUPS]]}
							</TableCell>
							<TableCell centered narrowed>
								{data[usersHeaderToColumnName[UsersTableHeader.EDIT]]}
							</TableCell>
							<TableCell centered narrowed>
								{data[usersHeaderToColumnName[UsersTableHeader.DELETE]]}
							</TableCell>
						</TableRow>
					);
				})}
			</Table>
		</div>
	);
};

export { UsersTab };
