import { type FormEvent } from "react";

import { Input } from "~/libs/components/components.js";
import { initDebounce } from "~/libs/helpers/helpers.js";
import { useAppDispatch, useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type ChatSearchResponseDto,
	DEFAULT_SEARCH_CHAT_PAYLOAD,
	SEARCH_CHAT_DELAY_MS,
	actions as chatsActions,
} from "~/modules/chats/chats.js";

import styles from "./styles.module.css";

const ChatSearchBar: React.FC = () => {
	const dispatch = useAppDispatch();

	const { control, errors, handleSubmit } = useAppForm({
		defaultValues: DEFAULT_SEARCH_CHAT_PAYLOAD,
		mode: "onChange",
	});

	const handleSearchChats = (filterFormData: ChatSearchResponseDto): void => {
		void dispatch(chatsActions.getAllChats({ search: filterFormData.search }));
	};

	const handleFormChange = (event_: React.BaseSyntheticEvent): void => {
		void handleSubmit(handleSearchChats)(event_);
	};

	const handleDebouncedSearchChats = initDebounce(
		handleFormChange,
		SEARCH_CHAT_DELAY_MS,
	);

	const handleFormSubmit = useCallback(
		(event_: FormEvent<HTMLFormElement>): void => {
			event_.preventDefault();
		},
		[],
	);

	return (
		<form
			className={styles["form"]}
			onChange={handleDebouncedSearchChats}
			onSubmit={handleFormSubmit}
		>
			<Input
				className={styles["search"]}
				color="light"
				control={control}
				errors={errors}
				hasVisuallyHiddenLabel
				iconName="search"
				label="Search"
				name="search"
				placeholder="Search or type"
			/>
		</form>
	);
};

export { ChatSearchBar };
