import { createPortal } from "react-dom";

type Properties = {
	children: React.ReactNode;
};

const Portal: React.FC<Properties> = ({ children }: Properties) => {
	return createPortal(children, document.body);
};

export { Portal };
