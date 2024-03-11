import { getValidClassNames } from "~/libs/helpers/helpers.js";
import {
	useHandleClickOutside,
	useHandleEscPress,
	useRef,
} from "~/libs/hooks/hooks.js";

import { Button } from "../button/button.js";
import { Portal } from "../portal/portal.js";
import styles from "./styles.module.css";

type Properties = {
	centered?: boolean;
	children: React.ReactNode;
	className?: string | undefined;
	isOpen: boolean;
	onClose: () => void;
};

const Modal: React.FC<Properties> = ({
	centered = false,
	children,
	className,
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

	return (
		<Portal>
			<dialog
				aria-modal
				className={getValidClassNames(
					styles["modal"],
					centered && styles["centered"],
				)}
				open={isOpen}
			>
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
