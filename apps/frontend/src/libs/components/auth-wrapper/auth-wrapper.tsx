import { Header } from "../header/header.js";

type Properties = {
	children: React.ReactNode;
};

const AuthWrapper: React.FC<Properties> = ({ children }: Properties) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export { AuthWrapper };
