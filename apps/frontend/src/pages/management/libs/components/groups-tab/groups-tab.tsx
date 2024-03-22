import { Button } from "~/libs/components/components.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";
import {
	type GroupCreateRequestDto,
	type GroupResponseDto,
	actions as groupsActions,
} from "~/modules/groups/groups.js";
import { actions as permissionsActions } from "~/modules/permissions/permissions.js";

import { ManagementDialogueMessage } from "../../enums/enums.js";
import { AddGroupModal } from "../add-group-modal/add-group-modal.js";
import { Chip } from "../chip/chip.js";
import { ConfirmationModal } from "../confirmation-modal/confirmation-modal.js";
import { Table, TableCell, TableRow } from "../table/table.js";
import { EditGroupModal } from "./libs/components/components.js";
import { GROUPS_TABLE_HEADERS } from "./libs/constants/constants.js";
import { GroupsTableHeader } from "./libs/enums/enums.js";
import { groupsHeaderToPropertyName } from "./libs/maps/maps.js";
import styles from "./styles.module.css";

type Properties = {
	isAddGroupModalOpen: boolean;
	onAddGroupModalClose: () => void;
};

const GroupsTab: React.FC<Properties> = ({
	isAddGroupModalOpen,
	onAddGroupModalClose,
}: Properties) => {
	const dispatch = useAppDispatch();
	const { authUser, groups, permissions } = useAppSelector((state) => {
		return {
			authUser: state.auth.user as UserAuthResponseDto,
			groups: state.management.groups,
			permissions: state.management.permissions,
		};
	});

	const [currentGroup, setCurrentGroup] = useState<GroupResponseDto | null>(
		null,
	);
	const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
		useState<boolean>(false);

	useEffect(() => {
		void dispatch(groupsActions.getAllGroups());
		void dispatch(permissionsActions.getAllPermissions());
	}, [dispatch]);

	const handleCreateGroup = useCallback(
		(payload: GroupCreateRequestDto) => {
			void dispatch(groupsActions.createGroup(payload));
		},
		[dispatch],
	);

	const handleOpenEditModal = useCallback((group: GroupResponseDto) => {
		return () => {
			setCurrentGroup(group);
			setIsEditModalOpen(true);
		};
	}, []);

	const handleCloseEditModal = useCallback(() => {
		setIsEditModalOpen(false);
		setCurrentGroup(null);
	}, []);

	const handleOpenConfirmationModal = useCallback((group: GroupResponseDto) => {
		return () => {
			setCurrentGroup(group);
			setIsConfirmationModalOpen(true);
		};
	}, []);

	const handleCloseConfirmationModal = useCallback(() => {
		setIsConfirmationModalOpen(false);
		setCurrentGroup(null);
	}, []);

	const handleDeleteGroup = useCallback(
		(groupId: number) => {
			return () => {
				void dispatch(groupsActions.deleteGroup(groupId));
				handleCloseConfirmationModal();
			};
		},
		[dispatch, handleCloseConfirmationModal],
	);

	const tableData = groups.map((group) => {
		const hasGroup = authUser.groups.some((userGroup) => {
			return userGroup.id === group.id;
		});

		return {
			actions: (
				<div className={styles["column-buttons"]}>
					<Button
						className={styles["icon-button"]}
						hasVisuallyHiddenLabel
						iconName="edit"
						label={GroupsTableHeader.ACTIONS}
						onClick={handleOpenEditModal(group)}
					/>
					<Button
						className={styles["icon-button"]}
						hasVisuallyHiddenLabel
						iconName="delete"
						isDisabled={hasGroup}
						label={GroupsTableHeader.ACTIONS}
						onClick={handleOpenConfirmationModal(group)}
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
				<div className={styles["table-container"]}>
					<Table headers={GROUPS_TABLE_HEADERS}>
						{tableData.map((data) => {
							return (
								<TableRow key={data.id}>
									<TableCell isCentered width="narrow">
										{data[groupsHeaderToPropertyName[GroupsTableHeader.ID]]}
									</TableCell>
									<TableCell width="medium">
										{data[groupsHeaderToPropertyName[GroupsTableHeader.NAME]]}
									</TableCell>
									<TableCell>
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
												groupsHeaderToPropertyName[GroupsTableHeader.ACTIONS]
											]
										}
									</TableCell>
								</TableRow>
							);
						})}
					</Table>
				</div>
			</div>
			<AddGroupModal
				isOpen={isAddGroupModalOpen}
				onClose={onAddGroupModalClose}
				onCreate={handleCreateGroup}
				permissions={permissions}
			/>
			{currentGroup && (
				<EditGroupModal
					group={currentGroup}
					isOpen={isEditModalOpen}
					onClose={handleCloseEditModal}
					permissions={permissions}
					title={`Edit permissions of the "${currentGroup.name}" group:`}
					user={authUser}
				/>
			)}
			<ConfirmationModal
				isOpen={isConfirmationModalOpen}
				onCancel={handleCloseConfirmationModal}
				onClose={handleCloseConfirmationModal}
				onConfirm={handleDeleteGroup(currentGroup?.id as number)}
				title={`${ManagementDialogueMessage.DELETE_GROUP} "${currentGroup?.name}"?`}
			/>
		</>
	);
};

export { GroupsTab };
