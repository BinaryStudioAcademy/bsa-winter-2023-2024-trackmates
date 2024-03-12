import { useCallback, useState } from "react";

import { Button, Loader } from "~/libs/components/components.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { ManagementDialogueMessages } from "../../enums/enums.js";
import { ConfirmationModal } from "../confirmation-modal/confirmation-modal.js";
import styles from "./styles.module.css";

type Properties = {
	isLoading: boolean;
	label: string;
	onClick: (userId: number) => void;
	user: UserAuthResponseDto;
};

const DeleteButton: React.FC<Properties> = ({
	isLoading,
	label,
	onClick,
	user,
}: Properties) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const handleClick = useCallback(() => {
		setIsModalOpen(true);
	}, [setIsModalOpen]);

	const handleDelete = useCallback(() => {
		onClick(user.id);
		setIsModalOpen(false);
	}, [onClick, setIsModalOpen, user.id]);

	const handleCancel = useCallback(() => {
		setIsModalOpen(false);
	}, [setIsModalOpen]);

	const handleModalClose = useCallback(() => {
		setIsModalOpen(false);
	}, [setIsModalOpen]);

	const modalContent = `${ManagementDialogueMessages.DO_YOU_WANT_DELETE_USER} ${user.firstName} ${user.lastName}?`;

	return (
		<>
			{isLoading ? (
				<Loader color="orange" size="small" />
			) : (
				<Button
					className={styles["icon-button"]}
					hasVisuallyHiddenLabel
					iconName="delete"
					label={label}
					onClick={handleClick}
				/>
			)}
			{isModalOpen && (
				<ConfirmationModal
					content={modalContent}
					isOpen={isModalOpen}
					onCancel={handleCancel}
					onClose={handleModalClose}
					onConfirm={handleDelete}
				/>
			)}
		</>
	);
};

export { DeleteButton };
