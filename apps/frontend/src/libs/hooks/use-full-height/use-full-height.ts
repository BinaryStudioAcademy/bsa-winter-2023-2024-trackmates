import { useEffect, useState } from "react";

function useFullHeight(): void {
	const [documentHeight, setDocumentHeight] = useState(window.innerHeight);

	const handleResize = (): void => {
		setDocumentHeight(window.innerHeight);
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		document.body.style.setProperty("--doc-height", `${documentHeight}px`);
	}, [documentHeight]);
}

export { useFullHeight };
