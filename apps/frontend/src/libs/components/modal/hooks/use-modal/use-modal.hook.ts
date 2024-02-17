import { useCallback, useEffect } from "~/libs/hooks/hooks.js";

type Properties = {
	onClose: () => void;
};

const useModal = ({
	onClose,
}: Properties): {
	handleDisableContentContainerClick: (event: React.SyntheticEvent) => void;
	handleOutsideClick: () => void;
} => {
	const handleOutsideClick = useCallback(() => {
		onClose();
	}, [onClose]);

	const handleDisableContentContainerClick = useCallback(
		(event: React.SyntheticEvent) => {
			event.stopPropagation();
		},
		[],
	);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose]);

	return {
		handleDisableContentContainerClick,
		handleOutsideClick,
	};
};

export { useModal };
