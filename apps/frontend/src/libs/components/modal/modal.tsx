import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useHandleClickOutside, useRef } from "~/libs/hooks/hooks.js";

import { Button } from "../button/button.js";
import { Portal } from "../portal/portal.js";
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
	const contentReference = useRef<HTMLDivElement | null>(null);
	useHandleClickOutside({
		onClick: onClose,
		ref: contentReference,
	});

	return (
		<Portal>
			<dialog
				aria-modal
				className={getValidClassNames(styles["modal"])}
				open={isOpen}
			>
				<div
					className={styles["content"]}
					ref={contentReference}
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
						style="plain"
					/>
				</div>
			</dialog>
		</Portal>
	);
};

export { Modal };
