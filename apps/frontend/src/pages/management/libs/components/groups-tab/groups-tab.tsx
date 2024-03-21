import { Button, Input, Loader } from "~/libs/components/components.js";
import { DataStatus, PermissionKey } from "~/libs/enums/enums.js";
import { findItemById } from "~/libs/helpers/helpers.js";
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
	type GroupResponseDto,
	groupNameFieldValidationSchema,
	actions as groupsActions,
} from "~/modules/groups/groups.js";
import { actions as permissionsActions } from "~/modules/permissions/permissions.js";

import { ManagementDialogueMessage } from "../../enums/enums.js";
import { ConfirmationModal } from "../confirmation-modal/confirmation-modal.js";
import { EditCheckbox } from "../edit-checkbox/edit-checkbox.js";
import { EditModal } from "../edit-modal/edit-modal.js";
import { GroupsTable } from "./libs/components/components.js";
import { INPUT_DEFAULT_VALUE } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const GroupsTab: React.FC = () => {
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
		void dispatch(groupsActions.getAllGroups());
		void dispatch(permissionsActions.getAllPermissions());
	}, [dispatch]);

	const handleCreateGroup = useCallback(
		({ name }: { name: string }) => {
			const key = name.trim().replace(" ", "-").toLowerCase();
			void dispatch(groupsActions.createGroup({ key, name }));
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

	const handleCloseEditModal = useCallback(() => {
		setIsEditModalOpen(false);
		setCurrentGroup(null);
	}, []);

	const handleCloseConfirmationModal = useCallback(() => {
		setIsConfirmationModalOpen(false);
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
			<EditModal
				isOpen={isEditModalOpen}
				onClose={handleCloseEditModal}
				title={`Edit permissions of the "${currentGroup?.name}" group:`}
			>
				<ul className={styles["modal-list"]}>
					{permissions.map((permission) => {
						const isChecked = Boolean(
							currentGroup?.permissions.some((permissionInGroup) => {
								return permissionInGroup.id === permission.id;
							}),
						);

						const isDisabled =
							permission.key === PermissionKey.MANAGE_UAM &&
							authUser.groups.some((group) => {
								return group.id === currentGroup?.id;
							});

						return (
							<li className={styles["modal-item"]} key={permission.id}>
								<EditCheckbox
									isChecked={isChecked}
									isDisabled={isDisabled}
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
