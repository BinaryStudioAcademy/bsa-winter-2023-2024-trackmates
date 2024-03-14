import { Button } from "~/libs/components/components.js";
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
import { Chip } from "../chip/chip.js";
import { ConfirmationModal } from "../confirmation-modal/confirmation-modal.js";
import { EditCheckbox } from "../edit-checkbox/edit-checkbox.js";
import { EditModal } from "../edit-modal/edit-modal.js";
import { Table, TableCell, TableRow } from "../table/table.js";
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
	const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);

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
		return () => {
			setCurrentUser(user);
			setEditModalOpen(true);
		};
	}, []);

	const handleCloseEditModal = useCallback(() => {
		setEditModalOpen(false);
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
		return () => {
			setCurrentUser(user);
			setIsDeleteModalOpen(true);
		};
	}, []);
	const handleCloseDeleteModal = useCallback(() => {
		setIsDeleteModalOpen(false);
		setCurrentUser(null);
	}, []);
	const handleDeleteUser = useCallback(() => {
		void dispatch(usersActions.remove(currentUser?.id as number));
		handleCloseDeleteModal();
	}, [currentUser, dispatch, handleCloseDeleteModal]);

	const tableHeaders = [
		UsersTableHeader.ID,
		UsersTableHeader.EMAIL,
		UsersTableHeader.FIRST_NAME,
		UsersTableHeader.LAST_NAME,
		UsersTableHeader.GROUPS,
		UsersTableHeader.BUTTONS,
	];

	const tableData = users.map((user) => {
		const isDeleting = userToDataStatus[user.id] === DataStatus.PENDING;
		const isTheSameUser = authUser.id === user.id;

		return {
			buttons: (
				<div className={styles["column-buttons"]}>
					<Button
						className={styles["icon-button"]}
						hasVisuallyHiddenLabel
						iconName="edit"
						isDisabled={!hasPermissionToEdit || isTheSameUser}
						label={UsersTableHeader.BUTTONS}
						onClick={handleOpenEditModal(user)}
						style="icon"
					/>
					<Button
						className={styles["icon-button"]}
						hasVisuallyHiddenLabel
						iconName="delete"
						isDisabled={!hasPermissionToDelete || isTheSameUser}
						isLoading={isDeleting}
						label={UsersTableHeader.BUTTONS}
						loaderColor="orange"
						onClick={handleOpenDeleteModal(user)}
						style="icon"
					/>
				</div>
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
				<Table headers={tableHeaders}>
					{tableData.map((data) => {
						return (
							<TableRow key={data.id}>
								<TableCell centered>
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
								<TableCell centered width="narrow">
									{data[usersHeaderToPropertyName[UsersTableHeader.BUTTONS]]}
								</TableCell>
							</TableRow>
						);
					})}
				</Table>
			</div>
			{isEditModalOpen && (
				<EditModal
					onClose={handleCloseEditModal}
					title={`Edit ${currentUser?.firstName} ${currentUser?.lastName}'s groups:`}
				>
					<ul className={styles["modal-list"]}>
						{groups.map((group) => {
							const isChecked =
								currentUser?.groups.some((userGroup) => {
									return userGroup.id === group.id;
								}) ?? false;

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
			)}
			{isDeleteModalOpen && (
				<ConfirmationModal
					onCancel={handleCloseDeleteModal}
					onClose={handleCloseDeleteModal}
					onConfirm={handleDeleteUser}
					title={`${ManagementDialogueMessage.DELETE_USER} ${currentUser?.firstName} ${currentUser?.lastName}?`}
				/>
			)}
		</>
	);
};

export { UsersTab };
