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
				<img
					alt="Selected file"
					className={styles["avatarImage"]}
					src={URL.createObjectURL(selectedFile)}
				/>
			) : (
				<button
					className={styles["noImage"]}
					onClick={handleClick}
					type="button"
				>
					Upload image here
					<input
						accept={"image/*"}
						hidden
						onChange={handleFileChange}
						ref={inputReference}
						type="file"
					/>
				</button>
			)}
		</div>
	);
};

export { Avatar };
