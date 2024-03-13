import { Button, Loader } from "~/libs/components/components.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useState } from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { ManagementDialogueMessage } from "../../enums/enums.js";
import { ConfirmationModal } from "../confirmation-modal/confirmation-modal.js";
import styles from "./styles.module.css";

type Properties = {
	isDisabled?: boolean;
	isLoading: boolean;
	label: string;
	onClick: (userId: number) => void;
	user: UserAuthResponseDto;
};

const DeleteButton: React.FC<Properties> = ({
	isDisabled = false,
	isLoading,
	label,
	onClick,
	user,
}: Properties) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const handleDelete = useCallback(() => {
		onClick(user.id);
		setIsModalOpen(false);
	}, [onClick, setIsModalOpen, user.id]);

	const handleOpenModal = useCallback(() => {
		setIsModalOpen(true);
	}, [setIsModalOpen]);

	const handleCloseModal = useCallback(() => {
		setIsModalOpen(false);
	}, [setIsModalOpen]);

	const modalTitle = `${ManagementDialogueMessage.DELETE_USER} ${user.firstName} ${user.lastName}?`;

	const buttonStyles = getValidClassNames(
		styles["icon-button"],
		isDisabled && styles["disabled"],
	);

	return (
		<>
			{isLoading ? (
				<Loader color="orange" size="small" />
			) : (
				<Button
					className={buttonStyles}
					hasVisuallyHiddenLabel
					iconName="delete"
					isDisabled={isDisabled}
					label={label}
					onClick={handleOpenModal}
				/>
			)}
			{isModalOpen && (
				<ConfirmationModal
					// isOpen={isModalOpen}
					onCancel={handleCloseModal}
					onClose={handleCloseModal}
					onConfirm={handleDelete}
					title={modalTitle}
				/>
			)}
		</>
	);
};

export { DeleteButton };
