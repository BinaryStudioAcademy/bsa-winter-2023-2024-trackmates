import { MENU_ITEMS } from "~/libs/constants/constants.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";

import { Header } from "../header/header.js";
import { Sidebar } from "../sidebar/sidebar.js";
import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
	user: UserAuthResponseDto;
};

const AuthWrapper: React.FC<Properties> = ({ children, user }: Properties) => {
	return (
		<div className={styles["page-layout"]}>
			<Sidebar menuItems={MENU_ITEMS} user={user} />
			<div className={styles["page"]}>
				<Header />
				{children}
			</div>
		</div>
	);
};

export { AuthWrapper };
