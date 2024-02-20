import { UploadButton } from "~/libs/components/components.js";
import { useCallback, useRef } from "~/libs/hooks/hooks.js";

type Properties = {
	onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const UploadAvatarButton: React.FC<Properties> = ({
	onFileChange,
}: Properties) => {
	const inputReference = useRef<HTMLInputElement>(null);

	const handleClick = useCallback((): void => {
		inputReference.current?.click();
	}, []);

	const handleFileChange = useCallback(
		(event_: React.ChangeEvent<HTMLInputElement>): void => {
			onFileChange(event_);
		},
		[onFileChange],
	);

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
