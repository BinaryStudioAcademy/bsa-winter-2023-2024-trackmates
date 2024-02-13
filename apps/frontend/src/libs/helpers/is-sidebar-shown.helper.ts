import { AuthApiPath } from "~/modules/auth/libs/enums/enums.js";

const isSidebarShown = (pathname: string): boolean => {
	const pagesWithoutSidebar = [
		AuthApiPath.SIGN_IN,
		AuthApiPath.SIGN_UP,
	] as string[];

	// TODO: Change later, now for development purposes
	!pagesWithoutSidebar.includes(pathname);
	return true;
	// return !pagesWithoutSidebar.includes(pathname);
};

export { isSidebarShown };
