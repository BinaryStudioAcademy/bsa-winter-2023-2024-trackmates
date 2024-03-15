import { Button } from "~/libs/components/components.js";
import { EMPTY_LENGTH } from "~/libs/constants/constants.js";
import { PermissionKey, PermissionMode } from "~/libs/enums/enums.js";
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

import { Chip } from "../chip/chip.js";
import { EditCheckbox } from "../edit-checkbox/edit-checkbox.js";
import { EditModal } from "../edit-modal/edit-modal.js";
import { Table, TableCell, TableRow } from "../table/table.js";
import { USERS_TABLE_HEADERS } from "./libs/constants/constants.js";
import { UsersTableHeader } from "./libs/enums/enums.js";
import { usersHeaderToPropertyName } from "./libs/maps/maps.js";
import styles from "./styles.module.css";

const UsersTab: React.FC = () => {
	const dispatch = useAppDispatch();
	const { authUser, groups, users } = useAppSelector((state) => {
		return {
			authUser: state.auth.user as UserAuthResponseDto,
			groups: state.management.groups,
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

	const handleOpenEditModal = useCallback((user: UserAuthResponseDto) => {
		return () => {
			setCurrentUser(user);
			setIsEditModalOpen(true);
		};
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

	const tableData = users.map((user) => {
		const isAdmin = user.groups.some((group) => {
			return group.permissions.length > EMPTY_LENGTH;
		});

		return {
			buttons: (
				<div className={styles["column-buttons"]}>
					<Button
						className={styles["icon-button"]}
						hasVisuallyHiddenLabel
						iconName="edit"
						isDisabled={!hasPermissionToEdit || isAdmin}
						label={UsersTableHeader.BUTTONS}
						onClick={handleOpenEditModal(user)}
						style="icon"
					/>
					<Button
						className={styles["icon-button"]}
						hasVisuallyHiddenLabel
						iconName="delete"
						isDisabled={!hasPermissionToDelete || isAdmin}
						label={UsersTableHeader.BUTTONS}
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
				<Table headers={USERS_TABLE_HEADERS}>
					{tableData.map((data) => {
						return (
							<TableRow key={data.id}>
								<TableCell isCentered>
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
			)}
		</>
	);
};

export { UsersTab };
