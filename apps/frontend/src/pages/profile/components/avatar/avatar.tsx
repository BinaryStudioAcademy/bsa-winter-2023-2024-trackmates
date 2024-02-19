import { Image, UploadButton } from "~/libs/components/components.js";
import { useCallback, useRef } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	selectedFile: File | null;
};

const Avatar: React.FC<Properties> = ({
	handleFileChange,
	selectedFile,
}: Properties) => {
	const inputReference = useRef<HTMLInputElement>(null);

	const handleClick = useCallback((): void => {
		if (inputReference.current) {
			inputReference.current.click();
		}
	}, []);

	return (
		<div className={styles["avatar"]}>
			{selectedFile ? (
				<Image
					alt="Selected file"
					className={styles["avatarImage"]}
					src={URL.createObjectURL(selectedFile)}
				/>
			) : (
				<UploadButton
					color="noImage"
					inputRef={inputReference}
					label="Upload image here"
					onChange={handleFileChange}
					onClick={handleClick}
				/>
			)}
		</div>
	);
};

export { Avatar };
