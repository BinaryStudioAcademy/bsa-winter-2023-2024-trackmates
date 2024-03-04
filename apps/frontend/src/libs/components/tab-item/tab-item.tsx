import {
	type FieldValues,
	type Path,
	type UseFormRegister,
} from "react-hook-form";

import styles from "./styles.module.css";

type TabContents = {
	[key: string]: JSX.Element;
};

type Properties<T extends FieldValues> = {
	label: string;
	name: Path<T>;
	register: UseFormRegister<T>;
	selectedTab: string;
	tab: string;
	tabContents: TabContents;
};

const TabItem = <T extends FieldValues>({
	label,
	name,
	register,
	selectedTab,
	tab,
	tabContents,
}: Properties<T>): JSX.Element => {
	return (
		<>
			<input
				{...register(name)}
				className={styles["tabs-radio"]}
				id={tab}
				name={name}
				type="radio"
				value={tab}
			/>
			<label className={styles["label"]} htmlFor={tab}>
				{label}
			</label>
			{selectedTab === tab && tabContents[tab]}
		</>
	);
};

export { TabItem };
