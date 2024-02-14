import { useAppSelector } from "~/libs/hooks/hooks.js";

import { WelcomeHeader } from "./libs/components/components.js";
import { UserAuthResponseDto } from "./libs/types/types.js";

const Overview: React.FC = () => {
	const { user } = useAppSelector((state) => state.auth);

	return <WelcomeHeader user={user as UserAuthResponseDto} />;
};

export { Overview };
