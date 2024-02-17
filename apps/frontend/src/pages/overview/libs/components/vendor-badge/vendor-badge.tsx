import {
	type Control,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { Image } from "~/libs/components/components.js";
import { useFormController } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	logo: string;
	name: FieldPath<T>;
};

const VendorBadge = <T extends FieldValues>({
	control,
	logo,
	name,
}: Properties<T>): JSX.Element => {
	const { field } = useFormController({ control, name });

	return (
		<>
			<label className={styles["badge"]} htmlFor={`${name}-badge`}>
				<input
					{...field}
					checked={Boolean(field.value)}
					className="visually-hidden"
					id={`${name}-badge`}
					name={name}
					type="checkbox"
				/>
				<Image alt={`Vendor ${name}`} src={logo} />
			</label>
		</>
	);
};

export { VendorBadge };
