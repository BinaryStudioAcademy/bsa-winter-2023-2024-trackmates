import { Button, Input } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";
import {
	type GroupRequestDto,
	type GroupResponseDto,
	groupNameFieldValidationSchema,
	actions as groupsActions,
} from "~/modules/groups/groups.js";
import { actions as permissionsActions } from "~/modules/permissions/permissions.js";

import { ManagementDialogueMessage } from "../../enums/enums.js";
import { Chip } from "../chip/chip.js";
import { ConfirmationModal } from "../confirmation-modal/confirmation-modal.js";
import { EditCheckbox } from "../edit-checkbox/edit-checkbox.js";
import { EditModal } from "../edit-modal/edit-modal.js";
import { Table, TableCell, TableRow } from "../table/table.js";
import { GroupsTableHeader } from "./libs/enums/enums.js";
import { groupsHeaderToPropertyName } from "./libs/maps/maps.js";
import styles from "./styles.module.css";

const GroupsTab: React.FC = () => {
	const dispatch = useAppDispatch();
	const { authUser, groups, permissions } = useAppSelector((state) => {
		return {
			authUser: state.auth.user as UserAuthResponseDto,
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

	const [currentGroup, setCurrentGroup] = useState<GroupResponseDto | null>(
		null,
	);
	const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
	const [isConfirmationModalOpen, setConfirmationModalOpen] =
		useState<boolean>(false);

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

	const handleOpenEditModal = useCallback((group: GroupResponseDto) => {
		return () => {
			setCurrentGroup(group);
			setEditModalOpen(true);
		};
	}, []);

	const handleCloseEditModal = useCallback(() => {
		setEditModalOpen(false);
		setCurrentGroup(null);
	}, []);

	const handleOpenConfirmationModal = useCallback((group: GroupResponseDto) => {
		return () => {
			setCurrentGroup(group);
			setConfirmationModalOpen(true);
		};
	}, []);

	const handleCloseConfirmationModal = useCallback(() => {
		setConfirmationModalOpen(false);
		setCurrentGroup(null);
	}, []);

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

	const handleDeleteGroup = useCallback(
		(groupId: number) => {
			return () => {
				void dispatch(groupsActions.deleteGroup(groupId));
				handleCloseConfirmationModal();
			};
		},
		[dispatch, handleCloseConfirmationModal],
	);

	const tableHeaders = [
		GroupsTableHeader.ID,
		GroupsTableHeader.NAME,
		GroupsTableHeader.PERMISSIONS,
		GroupsTableHeader.BUTTONS,
	];

	const tableData = groups.map((group) => {
		const hasGroup = authUser.groups.some((userGroup) => {
			return userGroup.id === group.id;
		});

		return {
			buttons: (
				<div className={styles["column-buttons"]}>
					<Button
						hasVisuallyHiddenLabel
						iconName="edit"
						isDisabled={hasGroup}
						label={GroupsTableHeader.BUTTONS}
						onClick={handleOpenEditModal(group)}
						style="icon"
					/>
					<Button
						hasVisuallyHiddenLabel
						iconName="delete"
						isDisabled={hasGroup}
						label={GroupsTableHeader.BUTTONS}
						onClick={handleOpenConfirmationModal(group)}
						style="icon"
					/>
				</div>
			),
			id: group.id,
			name: group.name,
			permissions: group.permissions.map((permission) => {
				return <Chip key={permission.id} label={permission.name} />;
			}),
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
						style="primary"
						type="submit"
					/>
				</form>
				<div className={styles["table-container"]}>
					<Table headers={tableHeaders}>
						{tableData.map((data) => {
							return (
								<TableRow key={data.id}>
									<TableCell isCentered>
										{data[groupsHeaderToPropertyName[GroupsTableHeader.ID]]}
									</TableCell>
									<TableCell>
										{data[groupsHeaderToPropertyName[GroupsTableHeader.NAME]]}
									</TableCell>
									<TableCell width="medium">
										{
											data[
												groupsHeaderToPropertyName[
													GroupsTableHeader.PERMISSIONS
												]
											]
										}
									</TableCell>
									<TableCell isCentered width="narrow">
										{
											data[
												groupsHeaderToPropertyName[GroupsTableHeader.BUTTONS]
											]
										}
									</TableCell>
								</TableRow>
							);
						})}
					</Table>
				</div>
			</div>
			{isEditModalOpen && (
				<EditModal
					onClose={handleCloseEditModal}
					title={`Edit permissions of the "${currentGroup?.name}" group:`}
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
			{isConfirmationModalOpen && (
				<ConfirmationModal
					onCancel={handleCloseConfirmationModal}
					onClose={handleCloseConfirmationModal}
					onConfirm={handleDeleteGroup(currentGroup?.id as number)}
					title={`${ManagementDialogueMessage.DELETE_GROUP} "${currentGroup?.name}"?`}
				/>
			)}
		</>
	);
};

export { GroupsTab };