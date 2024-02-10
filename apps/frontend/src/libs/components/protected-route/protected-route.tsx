import type { FC, ReactNode } from "react";

import { Navigate } from "react-router-dom";

import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";

type Properties = {
	component: ReactNode;
	redirectTo?: ValueOf<typeof AppRoute>;
};

const ProtectedRoute: FC<Properties> = ({
	component,
	redirectTo = AppRoute.SIGN_IN,
}) => {
	const { user } = useAppSelector((state) => state.auth);

	const hasUser = Boolean(user);

	if (!hasUser) {
		return <Navigate replace to={redirectTo} />;
	}

	return <>{component}</>;
};

export { ProtectedRoute };
