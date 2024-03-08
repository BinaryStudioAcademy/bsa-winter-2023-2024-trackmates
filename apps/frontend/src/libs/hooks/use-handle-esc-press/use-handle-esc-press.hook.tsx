import { useEffect } from "react";

type Properties = {
	onEscPress: () => void;
};

const useHandleEscPress = ({ onEscPress }: Properties): void => {
	useEffect(() => {
		const handleEscPress = (event: KeyboardEvent): void => {
			if (event.key === "Escape") {
				onEscPress();
			}
		};

		document.addEventListener("keyup", handleEscPress);

		return () => {
			document.removeEventListener("keyup", handleEscPress);
		};
	}, [onEscPress]);
};

export { useHandleEscPress };
