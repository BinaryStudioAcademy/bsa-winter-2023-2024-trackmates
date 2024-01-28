import { AppRoute } from "~/libs/enums/enums.ts";
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useLocation,
} from "~/libs/hooks/hooks.ts";
import { type UserSignUpRequestDto } from "~/modules/users/users.ts";
import { actions as authActions } from "~/slices/auth/auth.ts";

import { SignInForm, SignUpForm } from "./components/components.tsx";

const Auth: React.FC = () => {
  const dispatch = useAppDispatch();
  const { dataStatus } = useAppSelector(({ auth }) => ({
    dataStatus: auth.dataStatus,
  }));
  const { pathname } = useLocation();

  const handleSignInSubmit = useCallback((): void => {
    // handle sign in
  }, []);

  const handleSignUpSubmit = useCallback(
    (payload: UserSignUpRequestDto): void => {
      void dispatch(authActions.signUp(payload));
    },
    [dispatch],
  );

  const getScreen = (screen: string): React.ReactNode => {
    switch (screen) {
      case AppRoute.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
      }
      case AppRoute.SIGN_UP: {
        return <SignUpForm onSubmit={handleSignUpSubmit} />;
      }
    }

    return null;
  };

  return (
    <>
      state: {dataStatus}
      {getScreen(pathname)}
    </>
  );
};

export { Auth };
