import styles from "./styles.module.css";

type Properties = {
	alt: string;
	height?: string;
	isCircular?: boolean;
	src: string;
	width?: string;
};

const Image: React.FC<Properties> = ({
	alt,
	height,
	isCircular,
	src,
	width,
}: Properties) => {
	return (
		<img
			alt={alt}
			className={`${styles["image"]} ${isCircular && styles["circular"]}`}
			height={height}
			src={src}
			width={width}
		/>
	);
};

export { Image };
