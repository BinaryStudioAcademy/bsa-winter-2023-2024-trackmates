type Properties = {
	alt: string;
	isCircular?: boolean;
	height?: string;
	src: string;
	width?: string;
};

const Image: React.FC<Properties> = ({
	alt,
	isCircular,
	height,
	src,
	width,
}) => {
	return <img src={src} alt={alt} width={width} height={height} />;
};

export { Image };
