import clsx from "clsx";

import styles from "./styles.module.css";

type Properties = {
	alt: string;
	height?: string;
	shape?: "circle" | "default";
	src: string;
	width?: string;
};

const Image: React.FC<Properties> = ({
	alt,
	height,
	shape = "default",
	src,
	width,
}: Properties) => {
	return (
		<img
			alt={alt}
			className={clsx(styles["image"], styles[shape])}
			height={height}
			src={src}
			width={width}
		/>
	);
};

export { Image };
