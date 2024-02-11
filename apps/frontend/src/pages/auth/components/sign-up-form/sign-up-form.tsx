import logo from "~/assets/img/logo.png";
import { Button, Input, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserSignUpRequestDto,
	userSignUpValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_UP_PAYLOAD } from "./libs/constants.js";
import "./styles.css";

type Properties = {
	onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
		defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
		validationSchema: userSignUpValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	return (
		<>
			<main className="sign-up-page">
				<div className="sign-up-page__container">
					<div className="sign-up-page__logo">
						<img alt="logo" src={logo} />
						<span className="sign-up-page__logo-text">TrackMates</span>
					</div>
					<form className="sign-up-form" onSubmit={handleFormSubmit}>
						<div>
							<h2 className="sign-up-form__title">Create an account</h2>
							<span className="sign-up-form__subtitle">
								Already have an account? Go to
								<span className="sign-up-form__link">
									{" "}
									<Link to={AppRoute.SIGN_IN}> Log In</Link>
								</span>
							</span>
						</div>
						<Input
							control={control}
							errors={errors}
							isPrimary
							label="First name"
							name="firstName"
							type="text"
						/>
						<Input
							control={control}
							errors={errors}
							isPrimary
							label="Last name"
							name="lastName"
							type="text"
						/>
						<Input
							control={control}
							errors={errors}
							isPrimary
							label="Email"
							name="email"
							type="text"
						/>
						<Input
							control={control}
							errors={errors}
							isPrimary
							label="Password"
							name="password"
							type="password"
						/>
						<Input
							control={control}
							errors={errors}
							isPrimary
							label="Confirm password"
							name="confirmPassword"
							type="password"
						/>
						<Button isPrimary label="Create an account" type="submit" />
					</form>
				</div>
			</main>
		</>
	);
};

export { SignUpForm };
