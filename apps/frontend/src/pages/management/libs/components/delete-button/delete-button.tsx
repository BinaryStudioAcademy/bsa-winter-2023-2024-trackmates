import { useCallback, useState } from "react";

import { Button, Loader, Modal } from "~/libs/components/components.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

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
		onClick(user.id); // TODO
	}, [onClick, user.id]);

	const handleModalClose = useCallback(() => {
		setIsModalOpen(false);
	}, [setIsModalOpen]);

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
				<Modal isOpen={isModalOpen} onClose={handleModalClose} size="small">
					<div className={styles["modal-content"]}>
						<div className={styles["modal-content-question"]}>
							User
							<span className={styles["modal-content-question-user"]}>
								{" "}
								{user.firstName} {user.lastName} ({user.email}){" "}
							</span>
							will be deleted. Are you shure, that you want to delete user?
						</div>
						<div className={styles["modal-content-buttons"]}>
							<Button
								className={styles["modal-content-buttons-delete"]}
								label="Delete"
								style="primary"
							/>
							<Button
								className={styles["modal-content-buttons-cancel"]}
								label="Cancel"
								style="primary"
							/>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};

export { DeleteButton };
