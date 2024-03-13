import { Modal } from "~/libs/components/components.js";

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
		<Modal centered className={styles["edit-modal"]} isOpen onClose={onClose}>
			<div className={styles["content"]}>
				<h3>{title}</h3>
				{children}
			</div>
		</Modal>
	);
};

export { EditModal };
