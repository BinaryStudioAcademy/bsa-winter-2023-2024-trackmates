import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, useState } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	alt: string;
	className?: string | undefined;
	defaultSrc?: string;
	height?: string;
	shape?: "circle" | "default";
	src: string;
	width?: string;
};

const Image: React.FC<Properties> = ({
	alt,
	className,
	defaultSrc,
	height,
	shape = "default",
	src,
	width,
}: Properties) => {
	const [isImageLoaded, setIsImageLoaded] = useState<boolean>(true);

	const [imageSource, setImageSource] = useState<string>(src);

	const handleImageError = useCallback(() => {
		if (defaultSrc) {
			setIsImageLoaded(false);
			setImageSource(defaultSrc);
		}
	}, [defaultSrc]);

	return (
		<img
			alt={alt}
			className={getValidClassNames(styles["image"], styles[shape], className)}
			height={height}
			onError={handleImageError}
			src={isImageLoaded ? imageSource : defaultSrc}
			width={width}
		/>
	);
};

export { Image };
