import { Navigate } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { checkIfUserHasPermissions } from "~/libs/helpers/helpers.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type PagePermissions, type ValueOf } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";
import { NotFound } from "~/pages/not-found/not-found.jsx";

import { AuthWrapper } from "../auth-wrapper/auth-wrapper.js";

type Properties = {
	component: React.ReactNode;
	pagePermissions?: PagePermissions;
	redirectTo?: ValueOf<typeof AppRoute>;
};

const ProtectedRoute: React.FC<Properties> = ({
	component,
	pagePermissions,
	redirectTo = AppRoute.SIGN_IN,
}: Properties) => {
	const { user } = useAppSelector((state) => state.auth);

	const hasUser = Boolean(user);

	if (!hasUser) {
		return <Navigate replace to={redirectTo} />;
	}

	if (pagePermissions) {
		const { mode, permissions } = pagePermissions;
		const userToCheck = user as UserAuthResponseDto;

		const hasPermissions = checkIfUserHasPermissions(
			userToCheck,
			permissions,
			mode,
		);

		if (!hasPermissions) {
			return <NotFound />;
		}
	}

	return <AuthWrapper>{component}</AuthWrapper>;
};

export { ProtectedRoute };
