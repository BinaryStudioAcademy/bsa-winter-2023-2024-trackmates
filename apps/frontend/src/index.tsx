import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "~/assets/css/styles.css";
import {
	App,
	Notification,
	ProtectedRoute,
	RouterProvider,
	StoreProvider,
} from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { store } from "~/libs/modules/store/store.js";
import { Auth } from "~/pages/auth/auth.jsx";

import { Friends } from "./pages/friends/friends.js";
import { NotFound } from "./pages/not-found/not-found.js";
import { Overview } from "./pages/overview/overview.js";

createRoot(document.querySelector("#root") as HTMLElement).render(
	<StrictMode>
		<Notification />
		<StoreProvider store={store.instance}>
			<RouterProvider
				routes={[
					{
						children: [
							{
								element: <ProtectedRoute component={<Friends />} />,
								path: AppRoute.FRIENDS,
							},
							{
								element: <ProtectedRoute component={<Friends />} />,
								path: AppRoute.FOLLOWERS,
							},
							{
								element: <ProtectedRoute component={<Friends />} />,
								path: AppRoute.FOLLOWINGS,
							},
							{
								element: <ProtectedRoute component={<Overview />} />,
								path: AppRoute.ROOT,
							},
							{
								element: <Auth />,
								path: AppRoute.SIGN_IN,
							},
							{
								element: <Auth />,
								path: AppRoute.SIGN_UP,
							},
						],
						element: <App />,
						path: AppRoute.ROOT,
					},
					{ element: <NotFound />, path: AppRoute.ANY },
				]}
			/>
		</StoreProvider>
	</StrictMode>,
);
