import { useEffect } from "~/libs/hooks/hooks.js";

const useToggleScroll = (isOpen: boolean): void => {
	useEffect(() => {
		document.body.classList.toggle("no-overflow", isOpen);
	}, [isOpen]);
};

export { useToggleScroll };
