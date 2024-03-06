import { type RefObject, useEffect, useState } from "react";

type Properties = {
	onClick: () => void;
	ref: RefObject<HTMLElement>;
};

const useHandleClickOutside = ({ onClick, ref }: Properties): void => {
	const [isMouseDownInside, setIsMouseDownInside] = useState<boolean>(false);

	useEffect(() => {
		const handleMouseDown = (event: MouseEvent): void => {
			setIsMouseDownInside(
				Boolean(ref.current) &&
					(ref.current as Node).contains(event.target as Node),
			);
		};

		const handleClickOutside = (event: MouseEvent): void => {
			const hasTargetNode = (event.target as Node).contains(ref.current);
			const isTargetNode = event.target === ref.current;

			if (!isMouseDownInside && hasTargetNode && !isTargetNode) {
				onClick();
			}

			setIsMouseDownInside(false);
		};

		document.addEventListener("mousedown", handleMouseDown);
		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("click", handleClickOutside);
		};
	}, [onClick, ref, isMouseDownInside]);
};

export { useHandleClickOutside };
