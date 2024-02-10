import { Button } from "~/libs/components/components.js";

type Properties = {
	onSubmit: () => void;
};

const SignInForm: React.FC<Properties> = () => (
	<>
		<h1>Log In</h1>
		<form>
			<Button label="Sign in" />
		</form>
	</>
);

export { SignInForm };
