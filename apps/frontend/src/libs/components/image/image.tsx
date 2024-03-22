import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	alt: string;
	className?: string | undefined;
	height?: string;
	onError?: () => void;
	shape?: "circle" | "default";
	src: string;
	width?: string;
};

const Image: React.FC<Properties> = ({
	alt,
	className,
	height,
	onError,
	shape = "default",
	src,
	width,
}: Properties) => {
	return (
		<img
			alt={alt}
			className={getValidClassNames(styles["image"], styles[shape], className)}
			height={height}
			onError={onError}
			src={src}
			width={width}
		/>
	);
};

export { Image };
