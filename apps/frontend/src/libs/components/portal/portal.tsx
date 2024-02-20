import { createPortal } from "react-dom";

import { useEffect, useMemo } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
};

const noOverflowClass = styles["no-overflow"] as string;

const Portal: React.FC<Properties> = ({ children }: Properties) => {
	const portalContainer = useMemo(() => {
		const element = document.createElement("div");
		element.classList.add(styles["portal"] as string);

		return element;
	}, []);

	useEffect(() => {
		const wasOverflowHidden = document.body.classList.contains(noOverflowClass);
		document.body.append(portalContainer);
		document.body.classList.add(noOverflowClass);

		return () => {
			portalContainer.remove();

			if (!wasOverflowHidden) {
				document.body.classList.remove(noOverflowClass);
			}
		};
	}, [portalContainer]);

	return createPortal(children, portalContainer);
};

export { Portal };
