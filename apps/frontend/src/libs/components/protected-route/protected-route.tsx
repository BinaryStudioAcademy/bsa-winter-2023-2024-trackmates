import { Navigate } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";

type Properties = {
	component: React.ReactNode;
	redirectTo?: ValueOf<typeof AppRoute>;
};

const ProtectedRoute: React.FC<Properties> = ({
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
