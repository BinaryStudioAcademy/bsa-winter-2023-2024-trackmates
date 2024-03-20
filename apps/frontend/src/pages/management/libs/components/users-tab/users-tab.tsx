import {
	DataStatus,
	PermissionKey,
	PermissionMode,
} from "~/libs/enums/enums.js";
import { checkIfUserHasPermissions } from "~/libs/helpers/helpers.js";
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
import { ActionsCell } from "../actions-cell/actions-cell.js";
import { Chip } from "../chip/chip.js";
import { ConfirmationModal } from "../confirmation-modal/confirmation-modal.js";
import { EditCheckbox } from "../edit-checkbox/edit-checkbox.js";
import { EditModal } from "../edit-modal/edit-modal.js";
import { Table, TableCell, TableRow } from "../table/table.js";
import { USERS_TABLE_HEADERS } from "./libs/constants/constants.js";
import { UsersTableHeader } from "./libs/enums/enums.js";
import { usersHeaderToPropertyName } from "./libs/maps/maps.js";
import styles from "./styles.module.css";

const UsersTab: React.FC = () => {
	const dispatch = useAppDispatch();
	const { authUser, groups, userToDataStatus, users } = useAppSelector(
		(state) => {
			return {
				authUser: state.auth.user as UserAuthResponseDto,
				groups: state.management.groups,
				userToDataStatus: state.management.userToDataStatus,
				users: state.management.users,
			};
		},
	);

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

	const handleOpenEditModal = useCallback((user: UserAuthResponseDto) => {
		setCurrentUser(user);
		setIsEditModalOpen(true);
	}, []);

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
	const handleOpenDeleteModal = useCallback((user: UserAuthResponseDto) => {
		setCurrentUser(user);
		setIsDeleteModalOpen(true);
	}, []);
	const handleCloseDeleteModal = useCallback(() => {
		setIsDeleteModalOpen(false);
		setCurrentUser(null);
	}, []);
	const handleDeleteUser = useCallback(() => {
		void dispatch(usersActions.remove(currentUser?.id as number));
		handleCloseDeleteModal();
	}, [currentUser, dispatch, handleCloseDeleteModal]);

	const tableData = users.map((user) => {
		const isSameUser = user.id === authUser.id;

		return {
			actions: (
				<ActionsCell
					isDeleteDisabled={!hasPermissionToDelete || isSameUser}
					isEditDisabled={!hasPermissionToEdit || isSameUser}
					isLoading={userToDataStatus[user.id] === DataStatus.PENDING}
					item={user}
					onDelete={handleOpenDeleteModal}
					onEdit={handleOpenEditModal}
				/>
			),
			email: `${user.email} ${authUser.id === user.id ? "(you)" : ""}`,
			firstName: user.firstName,
			groups: user.groups.map((group) => {
				return <Chip key={group.id} label={group.name} />;
			}),
			id: user.id,
			lastName: user.lastName,
		};
	});

	return (
		<>
			<div className={styles["table-container"]}>
				<Table headers={USERS_TABLE_HEADERS}>
					{tableData.map((data) => {
						return (
							<TableRow key={data.id}>
								<TableCell isCentered width="narrow">
									{data[usersHeaderToPropertyName[UsersTableHeader.ID]]}
								</TableCell>
								<TableCell>
									{data[usersHeaderToPropertyName[UsersTableHeader.EMAIL]]}
								</TableCell>
								<TableCell>
									{data[usersHeaderToPropertyName[UsersTableHeader.FIRST_NAME]]}
								</TableCell>
								<TableCell>
									{data[usersHeaderToPropertyName[UsersTableHeader.LAST_NAME]]}
								</TableCell>
								<TableCell width="medium">
									{data[usersHeaderToPropertyName[UsersTableHeader.GROUPS]]}
								</TableCell>
								<TableCell isCentered width="narrow">
									{data[usersHeaderToPropertyName[UsersTableHeader.ACTIONS]]}
								</TableCell>
							</TableRow>
						);
					})}
				</Table>
			</div>
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
