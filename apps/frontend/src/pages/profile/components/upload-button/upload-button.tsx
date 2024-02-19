import { Button } from "~/libs/components/components.js";
import { useCallback, useRef } from "~/libs/hooks/hooks.js";

type Properties = {
	handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const UploadButton: React.FC<Properties> = ({
	handleFileChange,
}: Properties) => {
	const inputReference = useRef<HTMLInputElement>(null);

	const handleClick = useCallback((): void => {
		if (inputReference.current) {
			inputReference.current.click();
		}
	}, []);

	return (
		<Button
			color="secondary"
			label="Change the photo"
			onClick={handleClick}
			size="small"
			type="button"
		>
			<input
				accept={"image/*"}
				hidden
				onChange={handleFileChange}
				ref={inputReference}
				type="file"
			/>
		</Button>
	);
};

export { UploadButton };
