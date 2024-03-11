import { Button, Modal } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	content: string;
	isOpen: boolean;
	onCancel: () => void;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
};

const ConfirmationModal: React.FC<Properties> = ({
	content,
	isOpen,
	onCancel,
	onClose,
	onConfirm,
	title,
}: Properties) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} size="small">
			<div className={styles["modal-content"]}>
				<div className={styles["modal-content-title"]}>{title}</div>
				<div className={styles["modal-content-content"]}>{content}</div>
				<div className={styles["modal-content-buttons"]}>
					<Button
						className={styles["modal-content-buttons-delete"]}
						label="Confirm"
						onClick={onConfirm}
						size="small"
						style="primary"
					/>
					<Button
						className={styles["modal-content-buttons-cancel"]}
						label="Cancel"
						onClick={onCancel}
						size="small"
						style="primary"
					/>
				</div>
			</div>
		</Modal>
	);
};

export { ConfirmationModal };
