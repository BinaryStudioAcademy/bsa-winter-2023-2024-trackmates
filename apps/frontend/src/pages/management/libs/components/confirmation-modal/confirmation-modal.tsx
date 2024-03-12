import { Button, Modal } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	content: string;
	isOpen: boolean;
	onCancel: () => void;
	onClose: () => void;
	onConfirm: () => void;
};

const ConfirmationModal: React.FC<Properties> = ({
	content,
	isOpen,
	onCancel,
	onClose,
	onConfirm,
}: Properties) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} size="small">
			<div className={styles["confirm-modal"]}>
				<div className={styles["confirm-modal-content"]}>{content}</div>
				<div className={styles["confirm-modal-footer"]}>
					<Button
						className={styles["confirm-modal-buttons-cancel"]}
						label="Cancel"
						onClick={onCancel}
						size="small"
						style="secondary"
					/>
					<Button
						className={styles["confirm-modal-buttons-delete"]}
						label="Confirm"
						onClick={onConfirm}
						size="small"
						style="primary"
					/>
				</div>
			</div>
		</Modal>
	);
};

export { ConfirmationModal };
