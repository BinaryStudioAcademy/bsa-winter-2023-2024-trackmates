import { createPortal } from "react-dom";

import { useEffect, useMemo } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	position?: "absolute" | "fixed";
};

const Portal: React.FC<Properties> = ({
	children,
	position = "fixed",
}: Properties) => {
	const portalContainer = useMemo(() => {
		const element = document.createElement("div");
		element.classList.add(
			styles["portal"] as string,
			styles[position] as string,
		);

		return element;
	}, [position]);

	useEffect(() => {
		document.body.append(portalContainer);

		return () => {
			portalContainer.remove();
		};
	}, [portalContainer]);

	return createPortal(children, portalContainer);
};

export { Portal };
