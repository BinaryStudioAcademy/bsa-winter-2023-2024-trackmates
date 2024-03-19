import { Button, Modal } from "~/libs/components/components.js";
import { PermissionKey } from "~/libs/enums/enums.js";
import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";
import {
	type GroupResponseDto,
	actions as groupsActions,
} from "~/modules/groups/groups.js";
import { type PermissionResponseDto } from "~/modules/permissions/permissions.js";
import { EditCheckbox } from "~/pages/management/libs/components/edit-checkbox/edit-checkbox.jsx";

import styles from "./styles.module.css";

type Properties = {
	group: GroupResponseDto | null;
	isOpen: boolean;
	onClose: () => void;
	permissions: PermissionResponseDto[];
	title?: string | undefined;
	user: UserAuthResponseDto;
};

const EditGroupModal: React.FC<Properties> = ({
	group,
	isOpen,
	onClose,
	permissions,
	title,
	user,
}: Properties) => {
	const dispatch = useAppDispatch();

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
			handleChangeGroupPermissions(group?.id as number, permissionId);
		},
		[group, handleChangeGroupPermissions],
	);

	return (
		<Modal
			className={styles["edit-modal"]}
			isCentered
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className={styles["content"]}>
				<span className={styles["title"]}>{title}</span>
				<div className={styles["list-container"]}>
					<ul className={styles["checkbox-list"]}>
						{permissions.map((permission) => {
							const isChecked = Boolean(
								group?.permissions.some((permissionInGroup) => {
									return permissionInGroup.id === permission.id;
								}),
							);

							const isDisabled =
								permission.key === PermissionKey.MANAGE_UAM &&
								user.groups.some((userGroup) => {
									return userGroup.id === group?.id;
								});

							return (
								<li
									className={styles["checkbox-item"]}
									key={`${group?.id}${permission.id}`}
								>
									<EditCheckbox
										isChecked={isChecked}
										isDisabled={isDisabled}
										itemId={permission.id}
										name={permission.name}
										onToggle={handleToggleCheckbox}
									/>
									{permission.name}
								</li>
							);
						})}
					</ul>
				</div>
				<div className={styles["modal-footer"]}>
					<Button
						className={styles["button"]}
						label="OK"
						onClick={onClose}
						size="small"
						style="primary"
					/>
				</div>
			</div>
		</Modal>
	);
};

export { EditGroupModal };
