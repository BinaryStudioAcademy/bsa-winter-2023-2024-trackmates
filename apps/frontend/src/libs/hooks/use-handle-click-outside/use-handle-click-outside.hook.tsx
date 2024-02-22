import { type RefObject, useEffect } from "react";

type Properties = {
	onClick: () => void;
	ref: RefObject<HTMLElement>;
};

const useHandleClickOutside = ({ onClick, ref }: Properties): void => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | React.MouseEvent): void => {
			const hasTargetNode = (event.target as Node).contains(ref.current);
			const isTargetNode = event.target === ref.current;

			if (hasTargetNode && !isTargetNode) {
				onClick();
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [onClick, ref]);
};

export { useHandleClickOutside };
