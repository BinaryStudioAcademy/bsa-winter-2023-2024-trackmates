import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useEffect,
	useHandleClickOutside,
	useHandleEscPress,
	useRef,
} from "~/libs/hooks/hooks.js";

import { Button } from "../button/button.js";
import { Portal } from "../portal/portal.js";
import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	className?: string | undefined;
	isCentered?: boolean;
	isOpen: boolean;
	onClose: () => void;
};

const NO_OVERFLOW_CLASS = styles["no-overflow"] as string;

const Modal: React.FC<Properties> = ({
	children,
	className,
	isCentered = false,
	isOpen,
	onClose,
}: Properties) => {
	const contentReference = useRef<HTMLDivElement | null>(null);
	useHandleClickOutside({
		onClick: onClose,
		ref: contentReference,
	});

	useHandleEscPress({
		onEscPress: onClose,
	});

	const modalStyles = getValidClassNames(
		styles["modal"],
		isCentered && styles["centered"],
		isOpen && styles["active"],
	);

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add(NO_OVERFLOW_CLASS);
		} else {
			document.body.classList.remove(NO_OVERFLOW_CLASS);
		}
	}, [isOpen]);

	return (
		<Portal>
			<dialog aria-modal className={modalStyles} open={isOpen}>
				<div
					className={getValidClassNames(styles["content"], className)}
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
