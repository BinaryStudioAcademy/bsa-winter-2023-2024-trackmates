import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "~/assets/css/styles.scss";
import {
  App,
  RouterProvider,
  StoreProvider,
} from "~/libs/components/components.tsx";
import { AppRoute } from "~/libs/enums/enums.ts";
import { store } from "~/libs/modules/store/store.ts";
import { Auth } from "~/pages/auth/auth.tsx";

createRoot(document.querySelector("#root") as HTMLElement).render(
  <StrictMode>
    <StoreProvider store={store.instance}>
      <RouterProvider
        routes={[
          {
            children: [
              {
                element: "Root",
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
        ]}
      />
    </StoreProvider>
  </StrictMode>,
);
