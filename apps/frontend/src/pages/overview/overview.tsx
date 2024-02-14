import { DEFAULT_COURSES_DATA } from "~/libs/constants/constants.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { UserAuthResponseDto } from "~/modules/users/users.js";

import { Courses, WelcomeHeader } from "./libs/components/components.js";
import styles from "./styles.module.css";

const Overview: React.FC = () => {
	const { user } = useAppSelector((state) => state.auth);
	return (
		<div className={styles["container"]}>
			<WelcomeHeader user={user as UserAuthResponseDto} />;
			<Courses courses={DEFAULT_COURSES_DATA} />
		</div>
	);
};

export { Overview };
