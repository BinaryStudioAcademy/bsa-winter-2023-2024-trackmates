import { Button, Modal } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	onClose: () => void;
	title?: string | undefined;
};

const EditModal: React.FC<Properties> = ({
	children,
	onClose,
	title,
}: Properties) => {
	return (
		<Modal className={styles["edit-modal"]} isCentered isOpen onClose={onClose}>
			<div className={styles["content"]}>
				<span className={styles["title"]}>{title}</span>
				<div className={styles["checkbox-list"]}>{children}</div>
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

export { EditModal };
