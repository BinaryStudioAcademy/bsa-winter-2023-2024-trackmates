import { Button, Input, Link } from "~/libs/components/components.js";

import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserSignInRequestDto,
	userSignInValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_IN_PAYLOAD } from "./libs/constants.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";

type Properties = {
	onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
		defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
		validationSchema: userSignInValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	return (
		<div>
			<h2>Log In</h2>
			<p>
				No account? Go to <Link to={AppRoute.SIGN_UP}>Create an account</Link>
			</p>
			<form onSubmit={handleFormSubmit}>
				<Input
					control={control}
					errors={errors}
					label="Email"
					name="email"
					type="text"
				/>
				<p>Forgot Password?</p>
				<Input
					control={control}
					errors={errors}
					label="Password"
					name="password"
					type="password"
				/>
				<Button label="Sign in" type="submit" />
			</form>
		</div>
	);
};

export { SignInForm };
