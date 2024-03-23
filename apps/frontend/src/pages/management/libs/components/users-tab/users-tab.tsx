import { Loader, Pagination } from "~/libs/components/components.js";
import { PAGINATION_PAGES_CUT_COUNT } from "~/libs/constants/constants.js";
import {
	DataStatus,
	PaginationValue,
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
	usePagination,
	useState,
} from "~/libs/hooks/hooks.js";
import { actions as groupsActions } from "~/modules/groups/groups.js";
import {
	type UserAuthResponseDto,
	actions as usersActions,
} from "~/modules/users/users.js";

import { ManagementDialogueMessage } from "../../enums/enums.js";
import { ConfirmationModal } from "../confirmation-modal/confirmation-modal.js";
import { EditUserModal, UsersTable } from "./libs/components/components.js";
import styles from "./styles.module.css";

const UsersTab: React.FC = () => {
	const dispatch = useAppDispatch();
	const { authUser, groups, isUsersLoading, total, userToDataStatus, users } =
		useAppSelector((state) => {
			return {
				authUser: state.auth.user as UserAuthResponseDto,
				groups: state.management.groups,
				isUsersLoading: state.management.usersDataStatus === DataStatus.PENDING,
				total: state.management.totalUsersCount,
				userToDataStatus: state.management.userToDataStatus,
				users: state.management.users,
			};
		});

	const { page, pages, pagesCount } = usePagination({
		pageSize: PaginationValue.DEFAULT_COUNT,
		pagesCutCount: PAGINATION_PAGES_CUT_COUNT,
		totalCount: total,
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
		void dispatch(
			usersActions.getAll({ count: PaginationValue.DEFAULT_COUNT, page }),
		);
		void dispatch(groupsActions.getAllGroups());
	}, [dispatch, page]);

	const handleCloseEditModal = useCallback(() => {
		setIsEditModalOpen(false);
		setCurrentUser(null);
	}, []);

	const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
		useState<boolean>(false);

	const handleCloseDeleteModal = useCallback(() => {
		setIsConfirmationModalOpen(false);
		setIsConfirmationModalOpen(false);
		setCurrentUser(null);
	}, []);

	const handleDeleteUser = useCallback(() => {
		void dispatch(
			usersActions.remove({ page, userId: currentUser?.id as number }),
		);
		handleCloseDeleteModal();
	}, [currentUser, dispatch, handleCloseDeleteModal, page]);

	const handleOpenEditModal = useCallback(
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

	const handleOpenConfirmationModal = useCallback(
		(userId: number) => {
			const userById = findItemById(users, userId);

			if (!userById) {
				return;
			}

			setCurrentUser(userById);
			setIsConfirmationModalOpen(true);
		},
		[users],
	);

	const handleCheckIfSameUser = useCallback(
		(userId: number) => {
			return authUser.id === userId;
		},
		[authUser],
	);

	return (
		<>
			<div className={styles["container"]}>
				{isUsersLoading ? (
					<Loader color="orange" size="large" />
				) : (
					<div className={styles["table-container"]}>
						<UsersTable
							checkIfSameUser={handleCheckIfSameUser}
							hasPermissionToDelete={hasPermissionToDelete}
							hasPermissionToEdit={hasPermissionToEdit}
							onDelete={handleOpenConfirmationModal}
							onEdit={handleOpenEditModal}
							userToDataStatus={userToDataStatus}
							users={users}
						/>
					</div>
				)}
			</div>
			<Pagination currentPage={page} pages={pages} pagesCount={pagesCount} />
			{currentUser && (
				<EditUserModal
					groups={groups}
					isOpen={isEditModalOpen}
					onClose={handleCloseEditModal}
					title={`Edit ${currentUser.firstName} ${currentUser.lastName}'s groups:`}
					user={currentUser}
				/>
			)}
			<ConfirmationModal
				isOpen={isConfirmationModalOpen}
				onCancel={handleCloseDeleteModal}
				onClose={handleCloseDeleteModal}
				onConfirm={handleDeleteUser}
				title={`${ManagementDialogueMessage.DELETE_USER} ${currentUser?.firstName} ${currentUser?.lastName}?`}
			/>
		</>
	);
};

export { UsersTab };
