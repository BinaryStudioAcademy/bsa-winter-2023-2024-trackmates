import { useAppSelector } from "~/libs/hooks/hooks.js";
import { UserAuthResponseDto } from "~/modules/users/users.js";

import { WelcomeHeader } from "./libs/components/components.js";

const Overview: React.FC = () => {
	const { user } = useAppSelector((state) => state.auth);

	return <WelcomeHeader user={user as UserAuthResponseDto} />;
};

export { Overview };
