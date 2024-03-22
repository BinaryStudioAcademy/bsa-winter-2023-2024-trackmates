import {
	Button,
	Input,
	Loader,
	Pagination,
} from "~/libs/components/components.js";
import { PAGINATION_PAGES_CUT_COUNT } from "~/libs/constants/constants.js";
import { DataStatus, PaginationValue } from "~/libs/enums/enums.js";
import { findItemById } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
	useCallback,
	useEffect,
	usePagination,
	useState,
} from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";
import {
	type GroupResponseDto,
	groupNameFieldValidationSchema,
	actions as groupsActions,
} from "~/modules/groups/groups.js";
import { actions as permissionsActions } from "~/modules/permissions/permissions.js";

import { ManagementDialogueMessage } from "../../enums/enums.js";
import { ConfirmationModal } from "../confirmation-modal/confirmation-modal.js";
import { EditGroupModal, GroupsTable } from "./libs/components/components.js";
import { INPUT_DEFAULT_VALUE } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const GroupsTab: React.FC = () => {
	const dispatch = useAppDispatch();
	const {
		authUser,
		groupToDataStatus,
		groups,
		isGroupsLoading,
		permissions,
		total,
	} = useAppSelector((state) => {
		return {
			authUser: state.auth.user as UserAuthResponseDto,
			groupToDataStatus: state.management.groupToDataStatus,
			groups: state.management.groups,
			isGroupsLoading: state.management.groupsDataStatus === DataStatus.PENDING,
			permissions: state.management.permissions,
			total: state.management.totalGroupsCount,
		};
	});

	const { page, pages, pagesCount } = usePagination({
		pageSize: PaginationValue.DEFAULT_COUNT,
		pagesCutCount: PAGINATION_PAGES_CUT_COUNT,
		totalCount: total,
	});

	const { control, errors, handleSubmit, reset } = useAppForm<{ name: string }>(
		{
			defaultValues: INPUT_DEFAULT_VALUE,
			validationSchema: groupNameFieldValidationSchema,
		},
	);

	const [currentGroup, setCurrentGroup] = useState<GroupResponseDto | null>(
		null,
	);
	const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
		useState<boolean>(false);

	useEffect(() => {
		void dispatch(
			groupsActions.getAllGroups({
				count: PaginationValue.DEFAULT_COUNT,
				page,
			}),
		);
		void dispatch(permissionsActions.getAllPermissions());
	}, [dispatch, page]);

	const handleCreateGroup = useCallback(
		({ name }: { name: string }) => {
			const key = name.trim().replace(" ", "-").toLowerCase();
			void dispatch(
				groupsActions.createGroup({ createPayload: { key, name }, page }),
			);
			reset();
		},
		[dispatch, reset, page],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(handleCreateGroup)(event_);
		},
		[handleSubmit, handleCreateGroup],
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
				void dispatch(groupsActions.deleteGroup({ groupId, page }));
				handleCloseConfirmationModal();
			};
		},
		[dispatch, handleCloseConfirmationModal, page],
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
			<Pagination currentPage={page} pages={pages} pagesCount={pagesCount} />
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
