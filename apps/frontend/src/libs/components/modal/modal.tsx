/* eslint-disable jsx-a11y/click-events-have-key-events */
import { getValidClassNames } from "~/libs/helpers/helpers.js";

import { Button } from "../button/button.js";
import { Portal } from "../portal/portal.js";
import { useModal } from "./hooks/hooks.js";
import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
};

const Modal: React.FC<Properties> = ({
	children,
	isOpen,
	onClose,
}: Properties) => {
	const { handleDisableContentContainerClick, handleOutsideClick } = useModal({
		onClose,
	});

	if (!isOpen) {
		return null;
	}

	return (
		<Portal>
			<div
				className={getValidClassNames(styles["modal"])}
				onClick={handleOutsideClick}
				role="button"
				tabIndex={0}
			>
				<div
					className={styles["content"]}
					onClick={handleDisableContentContainerClick}
					role="button"
					tabIndex={0}
				>
					{children}
					<Button
						className={styles["close-btn"]}
						hasVisuallyHiddenLabel
						iconName="cross"
						label="Close modal"
						onClick={onClose}
						style="clear"
					/>
				</div>
			</div>
		</Portal>
	);
};

export { Modal };
