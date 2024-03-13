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
		<Modal
			centered
			className={styles["edit-modal"]}
			isOpen
			onClose={onClose}
			size="small"
		>
			<span className={styles["title"]}>{title}</span>
			<div className={styles["content"]}>{children}</div>
			<div className={styles["modal-footer"]}>
				<Button
					className={styles["button"]}
					label="OK"
					onClick={onClose}
					size="small"
					style="primary"
				/>
			</div>
		</Modal>
	);
};

export { EditModal };
