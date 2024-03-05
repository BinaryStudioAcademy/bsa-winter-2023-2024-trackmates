import { type FormEvent } from "react";

import { Input } from "~/libs/components/components.js";
import { initDebounce } from "~/libs/helpers/helpers.js";
import { useAppDispatch, useAppForm } from "~/libs/hooks/hooks.js";
import {
	type ChatSearchDto,
	DEFAULT_SEARCH_CHAT_PAYLOAD,
	SEARCH_CHAT_DELAY_MS,
	actions as chatsActions,
} from "~/modules/chats/chats.js";

import styles from "./styles.module.css";

const handleFormSubmit = (event_: FormEvent<HTMLFormElement>): void => {
	event_.preventDefault();
};

const ChatSearchBar: React.FC = () => {
	const dispatch = useAppDispatch();

	const { control, errors, handleSubmit } = useAppForm({
		defaultValues: DEFAULT_SEARCH_CHAT_PAYLOAD,
		mode: "onChange",
	});

	const handleSearchCourses = (filterFormData: ChatSearchDto): void => {
		void dispatch(chatsActions.getAllChats({ search: filterFormData.search }));
	};

	const handleFormChange = (event_: React.BaseSyntheticEvent): void => {
		void handleSubmit(handleSearchCourses)(event_);
	};

	const handleDebouncedSearchCourses = initDebounce(
		handleFormChange,
		SEARCH_CHAT_DELAY_MS,
	);

	return (
		<form
			className={styles["form"]}
			onChange={handleDebouncedSearchCourses}
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
