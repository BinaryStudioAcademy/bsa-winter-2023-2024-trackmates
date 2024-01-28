import { type TypedUseSelectorHook, useSelector } from "react-redux";

import { type store } from "~/libs/modules/store/store.ts";

const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.instance.getState>
> = useSelector;

export { useAppSelector };
