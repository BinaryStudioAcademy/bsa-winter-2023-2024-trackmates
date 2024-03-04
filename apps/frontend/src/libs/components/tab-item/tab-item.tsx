import {
	type FieldValues,
	type Path,
	type UseFormRegister,
} from "react-hook-form";

import { getValidClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	isSelected: boolean;
	label: string;
	name: Path<T>;
	register: UseFormRegister<T>;
	tab: string;
};

const TabItem = <T extends FieldValues>({
	isSelected,
	label,
	name,
	register,
	tab,
}: Properties<T>): JSX.Element => {
	return (
		<>
			<input
				{...register(name)}
				className={getValidClassNames(
					styles["tabs-radio"],
					isSelected && styles["active"],
				)}
				id={tab}
				name={name}
				type="radio"
				value={tab}
			/>
			<label className={styles["label"]} htmlFor={tab}>
				{label}
			</label>
		</>
	);
};

export { TabItem };
