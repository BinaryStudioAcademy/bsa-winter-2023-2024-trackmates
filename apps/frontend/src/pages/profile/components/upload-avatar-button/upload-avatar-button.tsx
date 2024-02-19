import { UploadButton } from "~/libs/components/components.js";
import { useCallback, useRef } from "~/libs/hooks/hooks.js";

type Properties = {
	handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const UploadAvatarButton: React.FC<Properties> = ({
	handleFileChange,
}: Properties) => {
	const inputReference = useRef<HTMLInputElement>(null);

	const handleClick = useCallback((): void => {
		if (inputReference.current) {
			inputReference.current.click();
		}
	}, []);

	return (
		<UploadButton
			color="basic"
			inputRef={inputReference}
			label="Change photo"
			onChange={handleFileChange}
			onClick={handleClick}
		/>
	);
};

export { UploadAvatarButton };
