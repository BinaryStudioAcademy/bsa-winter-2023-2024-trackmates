import { useEffect, useState } from "~/libs/hooks/hooks.js";

const useWindowHasFocus = (): boolean => {
	const [focus, setFocus] = useState<boolean>(document.hasFocus());

	useEffect(() => {
		const onFocus = (): void => {
			setFocus(true);
		};

		const onBlur = (): void => {
			setFocus(false);
		};

		window.addEventListener("focus", onFocus);
		window.addEventListener("blur", onBlur);

		return (): void => {
			window.removeEventListener("focus", onFocus);
			window.removeEventListener("blur", onBlur);
		};
	}, []);

	return focus;
};

export { useWindowHasFocus };
