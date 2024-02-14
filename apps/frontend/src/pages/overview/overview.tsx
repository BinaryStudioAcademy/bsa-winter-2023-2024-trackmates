import { useAppSelector } from "~/libs/hooks/hooks.js";

import { WelcomeHeader } from "./libs/components/components.js";

const Overview: React.FC = () => {
	const { user } = useAppSelector((state) => state.auth);

	return user ? (
		<WelcomeHeader firstName={user.firstName} lastName={user.lastName} />
	) : null;
};

export { Overview };
