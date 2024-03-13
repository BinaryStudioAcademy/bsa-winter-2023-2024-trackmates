import { Button } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
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
import { DeleteButton } from "../delete-button/delete-button.js";
import { EditCheckbox } from "../edit-checkbox/edit-checkbox.js";
import { EditModal } from "../edit-modal/edit-modal.js";
import { TableCell, TableRow } from "../table/libs/components/components.js";
import { Table } from "../table/table.js";
import { UsersTableHeader } from "./libs/enums/enums.js";
import { usersHeaderToColumnName } from "./libs/maps/maps.js";
import styles from "./styles.module.css";

const UsersTab: React.FC = () => {
	const dispatch = useAppDispatch();
	const { groups, userToDataStatus, users } = useAppSelector((state) => {
		return {
			groups: state.management.groups,
			userToDataStatus: state.management.userToDataStatus,
			users: state.management.users,
		};
	});

	const [currentUser, setCurrentUser] = useState<UserAuthResponseDto | null>(
		null,
	);
	const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);

	const handleDeleteUser = useCallback(
		(userId: number) => {
			void dispatch(usersActions.remove(userId));
		},
		[dispatch],
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

	const tableHeaders = [
		UsersTableHeader.ID,
		UsersTableHeader.EMAIL,
		UsersTableHeader.FIRST_NAME,
		UsersTableHeader.LAST_NAME,
		UsersTableHeader.GROUPS,
		UsersTableHeader.BUTTONS,
	];

	const tableData = users.map((user) => {
		return {
			buttons: (
				<div className={styles["column-buttons"]}>
					<Button
						className={styles["icon-button"]}
						hasVisuallyHiddenLabel
						iconName="edit"
						label={UsersTableHeader.BUTTONS}
						onClick={handleOpenEditModal(user)}
					/>
					<DeleteButton
						isLoading={userToDataStatus[user.id] === DataStatus.PENDING}
						label="delete"
						onClick={handleDeleteUser}
						user={user}
					/>
					{/* <Button
						className={styles["icon-button"]}
						hasVisuallyHiddenLabel
						iconName="delete"
						label={UsersTableHeader.BUTTONS}
						onClick={handleDeleteUser(user.id)}
					/> */}
				</div>
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
			<div className={styles["table-container"]}>
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
									{data[usersHeaderToColumnName[UsersTableHeader.BUTTONS]]}
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
		</div>
	);
};

export { UsersTab };
