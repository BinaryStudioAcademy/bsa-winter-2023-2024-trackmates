import { Button, Input } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	type GroupRequestDto,
	type GroupResponseDto,
	groupNameFieldValidationSchema,
	actions as groupsActions,
} from "~/modules/groups/groups.js";
import { actions as managementActions } from "~/modules/management/management.js";
import { actions as permissionsActions } from "~/modules/permissions/permissions.js";

import { Chip } from "../chip/chip.js";
import { EditCheckbox } from "../edit-checkbox/edit-checkbox.js";
import { EditModal } from "../edit-modal/edit-modal.js";
import { TableCell, TableRow } from "../table/libs/components/components.js";
import { Table } from "../table/table.js";
import { GroupsTableHeader } from "./libs/enums/enums.js";
import { groupsHeaderToColumnName } from "./libs/maps/maps.js";
import styles from "./styles.module.css";

const GroupsTab: React.FC = () => {
	const dispatch = useAppDispatch();
	const { currentGroup, groups, permissions } = useAppSelector((state) => {
		return {
			currentGroup: state.management.currentGroup,
			groups: state.management.groups,
			permissions: state.management.permissions,
		};
	});
	const { control, errors, handleSubmit, reset } = useAppForm<GroupRequestDto>({
		defaultValues: {
			key: "",
			name: "",
		},
		validationSchema: groupNameFieldValidationSchema,
	});

	const [isModalOpen, setModalOpen] = useState<boolean>(false);

	useEffect(() => {
		void dispatch(groupsActions.getAllGroups());
		void dispatch(permissionsActions.getAllPermissions());
	}, [dispatch]);

	const handleCreateGroup = useCallback(
		(group: GroupRequestDto) => {
			const key = group.name.trim().replace(" ", "-").toLowerCase();
			void dispatch(groupsActions.createGroup({ key, name: group.name }));
			reset();
		},
		[dispatch, reset],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(handleCreateGroup)(event_);
		},
		[handleSubmit, handleCreateGroup],
	);

	const handleDeleteGroup = useCallback(
		(groupId: number) => {
			return () => {
				void dispatch(groupsActions.deleteGroup(groupId));
			};
		},
		[dispatch],
	);

	const handleOpenModal = useCallback(
		(group: GroupResponseDto) => {
			return () => {
				setModalOpen(true);
				void dispatch(managementActions.setCurrentGroup(group));
			};
		},
		[dispatch],
	);

	const handleCloseModal = useCallback(() => {
		setModalOpen(false);
		void dispatch(managementActions.setCurrentGroup(null));
	}, [dispatch]);

	const handleChangeGroupPermissions = useCallback(
		(groupId: number, permissionId: number) => {
			void dispatch(
				groupsActions.updateGroupPermissions({ groupId, permissionId }),
			);
		},
		[dispatch],
	);

	const handleToggleCheckbox = useCallback(
		(permissionId: number) => {
			handleChangeGroupPermissions(currentGroup?.id as number, permissionId);
		},
		[currentGroup, handleChangeGroupPermissions],
	);

	const tableHeaders = [
		GroupsTableHeader.ID,
		GroupsTableHeader.NAME,
		GroupsTableHeader.PERMISSIONS,
		GroupsTableHeader.BUTTONS,
	];

	const tableData = groups.map((group) => {
		return {
			buttons: (
				<div className={styles["column-buttons"]}>
					<Button
						className={styles["icon-button"]}
						hasVisuallyHiddenLabel
						iconName="edit"
						label={GroupsTableHeader.BUTTONS}
						onClick={handleOpenModal(group)}
					/>
					<Button
						className={styles["icon-button"]}
						hasVisuallyHiddenLabel
						iconName="delete"
						label={GroupsTableHeader.BUTTONS}
						onClick={handleDeleteGroup(group.id)}
					/>
				</div>
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
		<>
			<div className={styles["container"]}>
				<form className={styles["group-form"]} onSubmit={handleFormSubmit}>
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
				<div className={styles["table-container"]}>
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
										{
											data[
												groupsHeaderToColumnName[GroupsTableHeader.PERMISSIONS]
											]
										}
									</TableCell>
									<TableCell centered narrowed>
										{data[groupsHeaderToColumnName[GroupsTableHeader.BUTTONS]]}
									</TableCell>
								</TableRow>
							);
						})}
					</Table>
				</div>
			</div>
			{isModalOpen && (
				<EditModal
					onClose={handleCloseModal}
					title={`Edit "${currentGroup?.name}" group permissions`}
				>
					<ul className={styles["modal-list"]}>
						{permissions.map((permission) => {
							const isChecked =
								currentGroup?.permissions.some((permissionInGroup) => {
									return permissionInGroup.id === permission.id;
								}) ?? false;

							return (
								<li className={styles["modal-item"]} key={permission.id}>
									<EditCheckbox
										isChecked={isChecked}
										itemId={permission.id}
										key={permission.id}
										name={permission.name}
										onToggle={handleToggleCheckbox}
									/>
									{permission.name}
								</li>
							);
						})}
					</ul>
				</EditModal>
			)}
		</>
	);
};

export { GroupsTab };
