import { Loader } from "~/libs/components/components.js";
import {
	DataStatus,
	PermissionKey,
	PermissionMode,
} from "~/libs/enums/enums.js";
import {
	checkIfUserHasPermissions,
	findItemById,
} from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useEffect,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as groupsActions } from "~/modules/groups/groups.js";
import {
	type UserAuthResponseDto,
	actions as usersActions,
} from "~/modules/users/users.js";

import { ManagementDialogueMessage } from "../../enums/enums.js";
import { ConfirmationModal } from "../confirmation-modal/confirmation-modal.js";
import { EditCheckbox } from "../edit-checkbox/edit-checkbox.js";
import { EditModal } from "../edit-modal/edit-modal.js";
import { UsersTable } from "./libs/components/components.js";
import styles from "./styles.module.css";

const UsersTab: React.FC = () => {
	const dispatch = useAppDispatch();
	const { authUser, groups, isUsersLoading, userToDataStatus, users } =
		useAppSelector((state) => {
			return {
				authUser: state.auth.user as UserAuthResponseDto,
				groups: state.management.groups,
				isUsersLoading: state.management.usersDataStatus === DataStatus.PENDING,
				userToDataStatus: state.management.userToDataStatus,
				users: state.management.users,
			};
		});

	const [currentUser, setCurrentUser] = useState<UserAuthResponseDto | null>(
		null,
	);
	const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

	const hasPermissionToEdit = checkIfUserHasPermissions(
		authUser,
		[PermissionKey.MANAGE_UAM],
		PermissionMode.ALL_OF,
	);

	const hasPermissionToDelete = checkIfUserHasPermissions(
		authUser,
		[PermissionKey.MANAGE_USERS],
		PermissionMode.ALL_OF,
	);

	useEffect(() => {
		void dispatch(usersActions.getAll());
		void dispatch(groupsActions.getAllGroups());
	}, [dispatch]);

	const handleCloseEditModal = useCallback(() => {
		setIsEditModalOpen(false);
		setCurrentUser(null);
	}, []);

	const handleChangeUserGroups = useCallback(
		(groupId: number, userId: number) => {
			void dispatch(groupsActions.updateUserGroups({ groupId, userId }));
		},
		[dispatch],
	);

	const handleToggleCheckbox = useCallback(
		(groupId: number) => {
			handleChangeUserGroups(groupId, currentUser?.id as number);
		},
		[currentUser, handleChangeUserGroups],
	);

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

	const handleCloseDeleteModal = useCallback(() => {
		setIsDeleteModalOpen(false);
		setCurrentUser(null);
	}, []);

	const handleDeleteUser = useCallback(() => {
		void dispatch(usersActions.remove(currentUser?.id as number));
		handleCloseDeleteModal();
	}, [currentUser, dispatch, handleCloseDeleteModal]);

	const onEditUser = useCallback(
		(userId: number) => {
			const userById = findItemById(users, userId);

			if (!userById) {
				return;
			}

			setCurrentUser(userById);
			setIsEditModalOpen(true);
		},
		[users],
	);

	const onDeleteUser = useCallback(
		(userId: number) => {
			const userById = findItemById(users, userId);

			if (!userById) {
				return;
			}

			setCurrentUser(userById);
			setIsDeleteModalOpen(true);
		},
		[users],
	);

	const checkIfSameUser = useCallback(
		(userId: number) => {
			return authUser.id === userId;
		},
		[authUser],
	);

	return (
		<>
			{isUsersLoading ? (
				<Loader color="orange" size="large" />
			) : (
				<div className={styles["table-container"]}>
					<UsersTable
						checkIfSameUser={checkIfSameUser}
						hasPermissionToDelete={hasPermissionToDelete}
						hasPermissionToEdit={hasPermissionToEdit}
						onDelete={onDeleteUser}
						onEdit={onEditUser}
						userToDataStatus={userToDataStatus}
						users={users}
					/>
				</div>
			)}
			<EditModal
				isOpen={isEditModalOpen}
				onClose={handleCloseEditModal}
				title={`Edit ${currentUser?.firstName} ${currentUser?.lastName}'s groups:`}
			>
				<ul className={styles["modal-list"]}>
					{groups.map((group) => {
						const isChecked = Boolean(
							currentUser?.groups.some((userGroup) => {
								return userGroup.id === group.id;
							}),
						);

						return (
							<li className={styles["modal-item"]} key={group.id}>
								<EditCheckbox
									isChecked={isChecked}
									itemId={group.id}
									key={group.id}
									name={group.name}
									onToggle={handleToggleCheckbox}
								/>
								{group.name}
							</li>
						);
					})}
				</ul>
			</EditModal>
			<ConfirmationModal
				isOpen={isDeleteModalOpen}
				onCancel={handleCloseDeleteModal}
				onClose={handleCloseDeleteModal}
				onConfirm={handleDeleteUser}
				title={`${ManagementDialogueMessage.DELETE_USER} ${currentUser?.firstName} ${currentUser?.lastName}?`}
			/>
		</>
	);
};

export { UsersTab };
