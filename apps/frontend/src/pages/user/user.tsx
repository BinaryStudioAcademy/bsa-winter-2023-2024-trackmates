import { useParams } from "~/libs/hooks/hooks.js";

const User: React.FC = () => {
	const { id } = useParams();

	return `Hello Friend with id ${id}`;
};

export { User };
