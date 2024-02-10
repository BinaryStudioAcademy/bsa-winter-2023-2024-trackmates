import { NavLink } from "react-router-dom";
import { Image } from "../image/image.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";

type Properties = {
	user: {
		image: {
			url: string;
		};
	} | null;
};

const Header: React.FC<Properties> = ({ user }) => {
	return (
		<header>
			<div>Search input</div>
			{user ? (
				<div>
					<Image
						src={user.image?.url}
						alt="user-avatar"
						width="48"
						height="48"
						isCircular
					/>
				</div>
			) : (
				<NavLink to={AppRoute.SIGN_IN}>Sign in</NavLink>
			)}
		</header>
	);
};

export { Header };
