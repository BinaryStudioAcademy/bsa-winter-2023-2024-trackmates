import { useAppSelector } from "~/libs/hooks/hooks.js";

import { WelcomeHeader } from "./components/welcome-section-header/welcom-section-header.js";

const Overview: React.FC = () => {
	const { user } = useAppSelector((state) => state.auth);

	return user ? (
		<WelcomeHeader firstName={user.firstName} lastName={user.lastName} />
	) : (
		<></>
	);
};

export { Overview };
