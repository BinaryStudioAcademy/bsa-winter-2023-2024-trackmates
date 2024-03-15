import { Button, Modal } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	isOpen: boolean;
	onCancel: () => void;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
};

const ConfirmationModal: React.FC<Properties> = ({
	isOpen,
	onCancel,
	onClose,
	onConfirm,
	title,
}: Properties) => {
	return (
		<Modal isCentered isOpen={isOpen} onClose={onClose}>
			<div className={styles["confirm-modal"]}>
				<span className={styles["title"]}>{title}</span>
				<div className={styles["modal-footer"]}>
					<Button
						label="Cancel"
						onClick={onCancel}
						size="small"
						style="secondary"
					/>
					<Button
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
