import { createPortal } from "react-dom";

import { useEffect, useMemo } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
};

const Portal: React.FC<Properties> = ({ children }: Properties) => {
	const portalContainer = useMemo(() => {
		const element = document.createElement("div");
		element.classList.add(styles["portal"] as string);

		return element;
	}, []);

	useEffect(() => {
		document.body.append(portalContainer);

		return () => {
			portalContainer.remove();
		};
	}, [portalContainer]);

	return createPortal(children, portalContainer);
};

export { Portal };
