import { Image } from "../image/image.js";

type Properties = {
	user: {
		image: {
			url: string;
		};
	};
};

const Header: React.FC<Properties> = ({ user }) => {
	return (
		<header>
			<div>Search input</div>
			<div>
				<Image
					src={user.image?.url}
					alt="user-avatar"
					width="48"
					height="48"
					isCircular
				/>
			</div>
		</header>
	);
};

export { Header };
