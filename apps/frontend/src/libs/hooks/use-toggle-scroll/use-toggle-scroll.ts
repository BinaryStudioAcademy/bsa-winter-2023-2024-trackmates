import { useEffect } from "~/libs/hooks/hooks.js";

const useToggleScroll = (isOpen: boolean): void => {
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("no-overflow");
		} else {
			document.body.classList.remove("no-overflow");
		}
	}, [isOpen]);
};

export { useToggleScroll };
