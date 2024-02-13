import { useAppSelector } from "~/libs/hooks/hooks.js";

import { Header } from "../header/header.js";

type Properties = {
	children: React.ReactNode;
};

const AuthWrapper: React.FC<Properties> = ({ children }: Properties) => {
	const { user } = useAppSelector((state) => state.auth);

	return (
		<>
			<Header user={user} />
			{children}
		</>
	);
};

export { AuthWrapper };
