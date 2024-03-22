import { Loader } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { findItemById } from "~/libs/helpers/helpers.js";
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
import { ConfirmationModal } from "../confirmation-modal/confirmation-modal.js";
import { EditGroupModal, GroupsTable } from "./libs/components/components.js";
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
	const { authUser, groupToDataStatus, groups, isGroupsLoading, permissions } =
		useAppSelector((state) => {
			return {
				authUser: state.auth.user as UserAuthResponseDto,
				groupToDataStatus: state.management.groupToDataStatus,
				groups: state.management.groups,
				isGroupsLoading:
					state.management.groupsDataStatus === DataStatus.PENDING,
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

	const handleCloseEditModal = useCallback(() => {
		setIsEditModalOpen(false);
		setCurrentGroup(null);
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

	const handleEditModalOpen = useCallback(
		(groupId: number) => {
			const groupById = findItemById(groups, groupId);

			if (!groupById) {
				return;
			}

			setCurrentGroup(groupById);
			setIsEditModalOpen(true);
		},
		[groups],
	);

	const handleConfirmationModalOpen = useCallback(
		(groupId: number) => {
			const groupById = findItemById(groups, groupId);

			if (!groupById) {
				return;
			}

			setCurrentGroup(groupById);
			setIsConfirmationModalOpen(true);
		},
		[groups],
	);

	const checkIfCurrentUserHasGroup = useCallback(
		(groupId: number) => {
			return authUser.groups.some((userGroup) => {
				return userGroup.id === groupId;
			});
		},
		[authUser],
	);

	return (
		<>
			<div className={styles["container"]}>
				{isGroupsLoading ? (
					<Loader color="orange" size="large" />
				) : (
					<div className={styles["table-container"]}>
						<GroupsTable
							checkIfCurrentUserHasGroup={checkIfCurrentUserHasGroup}
							groupToDataStatus={groupToDataStatus}
							groups={groups}
							onDelete={handleConfirmationModalOpen}
							onEdit={handleEditModalOpen}
						/>
					</div>
				)}
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
