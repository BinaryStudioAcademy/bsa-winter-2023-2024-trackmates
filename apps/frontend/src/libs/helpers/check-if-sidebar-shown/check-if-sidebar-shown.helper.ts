import { AppRoute } from "~/libs/enums/enums.js";

const checkIfSidebarIsShown = (pathname: string): boolean => {
	const pagesWithoutSidebar = [AppRoute.SIGN_IN, AppRoute.SIGN_UP] as string[];

	return !pagesWithoutSidebar.includes(pathname);
};

export { checkIfSidebarIsShown };
