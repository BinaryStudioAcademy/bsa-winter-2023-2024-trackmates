import { Button, Modal } from "~/libs/components/components.js";
import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";
import {
	type GroupResponseDto,
	actions as groupsActions,
} from "~/modules/groups/groups.js";
import { EditCheckbox } from "~/pages/management/libs/components/edit-checkbox/edit-checkbox.jsx";

import styles from "./styles.module.css";

type Properties = {
	groups: GroupResponseDto[];
	isOpen: boolean;
	onClose: () => void;
	title?: string | undefined;
	user: UserAuthResponseDto | null;
};

const EditUserModal: React.FC<Properties> = ({
	groups,
	isOpen,
	onClose,
	title,
	user,
}: Properties) => {
	const dispatch = useAppDispatch();

	const handleChangeUserGroups = useCallback(
		(groupId: number, userId: number) => {
			void dispatch(groupsActions.updateUserGroups({ groupId, userId }));
		},
		[dispatch],
	);

	const handleToggleCheckbox = useCallback(
		(groupId: number) => {
			handleChangeUserGroups(groupId, user?.id as number);
		},
		[user, handleChangeUserGroups],
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
						{groups.map((group) => {
							const isChecked = Boolean(
								user?.groups.some((userGroup) => {
									return userGroup.id === group.id;
								}),
							);

							return (
								<li className={styles["checkbox-item"]} key={group.id}>
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

export { EditUserModal };
