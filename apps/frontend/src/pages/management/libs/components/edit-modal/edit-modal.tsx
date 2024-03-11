import { Button, Modal } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	onClose: () => void;
};

const EditModal: React.FC<Properties> = ({ children, onClose }: Properties) => {
	return (
		<Modal centered className={styles["edit-modal"]} isOpen onClose={onClose}>
			<div className={styles["content"]}>
				<form>{children}</form>
				<Button className={styles["button"]} label="Save" size="small" />
			</div>
		</Modal>
	);
};

export { EditModal };
