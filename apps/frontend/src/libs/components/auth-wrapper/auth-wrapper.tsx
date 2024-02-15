import { MENU_ITEMS } from "~/libs/constants/constants.js";

import { Header } from "../header/header.js";
import { Sidebar } from "../sidebar/sidebar.js";
import styles from "./styles.module.css";

type Properties = {
	children: React.ReactNode;
};

const AuthWrapper: React.FC<Properties> = ({ children }: Properties) => {
	return (
		<div className={styles["page-layout"]}>
			<Sidebar menuItems={MENU_ITEMS} />
			<div className={styles["page"]}>
				<Header />
				{children}
			</div>
		</div>
	);
};

export { AuthWrapper };
