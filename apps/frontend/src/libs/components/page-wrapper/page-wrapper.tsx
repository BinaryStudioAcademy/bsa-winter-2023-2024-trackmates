import { Header } from "../components.js";

type Properties = {
	children: React.ReactNode;
};

const PageWrapper: React.FC<Properties> = ({ children }: Properties) => {
	return (
		<>
			<Header user={null} />
			{children}
		</>
	);
};

export { PageWrapper };
