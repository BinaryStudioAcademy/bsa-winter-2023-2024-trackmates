import { type TypedUseSelectorHook, useSelector } from "react-redux";

import { type store } from "~/libs/modules/store/store.ts";

const useAppSelector =
	useSelector.withTypes<ReturnType<typeof store.instance.getState>>();

export { useAppSelector };
