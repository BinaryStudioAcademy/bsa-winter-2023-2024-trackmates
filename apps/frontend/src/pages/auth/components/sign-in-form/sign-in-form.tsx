import { Button } from "~/libs/components/components.js";
import { Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";

type Properties = {
	onSubmit: () => void;
};

const SignInForm: React.FC<Properties> = () => (
	<>
		<h1>Log In</h1>
		<p>
			No account? Go to <Link to={AppRoute.SIGN_UP}>Create an account</Link>
		</p>
		<form>
			<Button label="Sign in" />
		</form>
	</>
);

export { SignInForm };
