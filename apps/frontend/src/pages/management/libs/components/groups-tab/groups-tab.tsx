import { Button, Input } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { type GroupRequestDto } from "~/modules/groups/groups.js";
import { actions as groupsActions } from "~/modules/groups/groups.js";
import { actions as permissionsActions } from "~/modules/permissions/permissions.js";

import { Chip } from "../chip/chip.js";
import { EditModal } from "../edit-modal/edit-modal.js";
import { TableCell, TableRow } from "../table/libs/components/components.js";
import { Table } from "../table/table.js";
import { GroupsTableHeader } from "./libs/enums/enums.js";
import { groupsHeaderToColumnName } from "./libs/maps/maps.js";
import styles from "./styles.module.css";

const GroupsTab: React.FC = () => {
	const { groups } = useAppSelector((state) => {
		return {
			groups: state.management.groups,
		};
	});

	const { control, errors } = useAppForm<GroupRequestDto>({
		defaultValues: {
			name: "",
		},
	});

	const dispatch = useAppDispatch();

	const [isModalOpen, setModalOpen] = useState<boolean>(false);

	useEffect(() => {
		void dispatch(groupsActions.getAllGroups());
		void dispatch(permissionsActions.getAllPermissions());
	}, [dispatch]);

	const handleToggleModal = useCallback(() => {
		setModalOpen(!isModalOpen);
	}, [isModalOpen, setModalOpen]);

	const tableHeaders = [
		GroupsTableHeader.ID,
		GroupsTableHeader.NAME,
		GroupsTableHeader.PERMISSIONS,
		GroupsTableHeader.EDIT,
		GroupsTableHeader.DELETE,
	];

	const tableData = groups.map((group) => {
		return {
			delete: (
				<Button
					className={styles["icon-button"]}
					hasVisuallyHiddenLabel
					iconName="delete"
					label={GroupsTableHeader.DELETE}
				/>
			),
			edit: (
				<Button
					className={styles["icon-button"]}
					hasVisuallyHiddenLabel
					iconName="edit"
					label={GroupsTableHeader.EDIT}
					onClick={handleToggleModal}
				/>
			),
			id: group.id,
			name: group.name,
			permissions: [
				group.permissions.map((permission) => {
					return <Chip key={permission.id} label={permission.name} />;
				}),
			],
		};
	});

	return (
		<div className={styles["container"]}>
			<form className={styles["group-form"]}>
				<div className={styles["input"]}>
					<Input
						color="light"
						control={control}
						errors={errors}
						label="Group name"
						name="name"
						placeholder="Group name"
						type="text"
					/>
				</div>
				<Button
					className={styles["button"]}
					label="Create"
					size="small"
					style="secondary"
					type="submit"
				/>
			</form>
			<Table headers={tableHeaders}>
				{tableData.map((data) => {
					return (
						<TableRow key={data.id}>
							<TableCell centered>
								{data[groupsHeaderToColumnName[GroupsTableHeader.ID]]}
							</TableCell>
							<TableCell>
								{data[groupsHeaderToColumnName[GroupsTableHeader.NAME]]}
							</TableCell>
							<TableCell centered>
								{data[groupsHeaderToColumnName[GroupsTableHeader.PERMISSIONS]]}
							</TableCell>
							<TableCell centered narrowed>
								{data[groupsHeaderToColumnName[GroupsTableHeader.EDIT]]}
							</TableCell>
							<TableCell centered narrowed>
								{data[groupsHeaderToColumnName[GroupsTableHeader.DELETE]]}
							</TableCell>
						</TableRow>
					);
				})}
			</Table>
			{isModalOpen && (
				<EditModal onClose={handleToggleModal}>
					<></>
				</EditModal>
			)}
		</div>
	);
};

export { GroupsTab };
