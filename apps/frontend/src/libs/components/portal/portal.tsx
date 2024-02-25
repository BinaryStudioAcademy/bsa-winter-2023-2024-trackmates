import { createPortal } from "react-dom";

import { useEffect, useMemo } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
};

const NO_OVERFLOW_CLASS = styles["no-overflow"] as string;

const Portal: React.FC<Properties> = ({ children }: Properties) => {
	const portalContainer = useMemo(() => {
		const element = document.createElement("div");
		element.classList.add(styles["portal"] as string);

		return element;
	}, []);

	useEffect(() => {
		const wasOverflowHidden =
			document.body.classList.contains(NO_OVERFLOW_CLASS);
		document.body.append(portalContainer);
		document.body.classList.add(NO_OVERFLOW_CLASS);

		return () => {
			portalContainer.remove();

			if (!wasOverflowHidden) {
				document.body.classList.remove(NO_OVERFLOW_CLASS);
			}
		};
	}, [portalContainer]);

	return createPortal(children, portalContainer);
};

export { Portal };
