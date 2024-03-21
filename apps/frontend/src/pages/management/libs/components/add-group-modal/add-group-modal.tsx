import {
	Button,
	CheckboxesGroup,
	Input,
	Modal,
} from "~/libs/components/components.js";
import { useAppForm, useCallback, useMemo } from "~/libs/hooks/hooks.js";
import {
	type GroupCreateRequestDto,
	groupCreateRequestValidationSchema,
} from "~/modules/groups/groups.js";
import { type PermissionResponseDto } from "~/modules/permissions/permissions.js";

import { DEFAULT_GROUP_CREATE_IN_PAYLOAD } from "../groups-tab/libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	isOpen: boolean;
	onClose: () => void;
	onCreate: (data: GroupCreateRequestDto) => void;
	permissions: PermissionResponseDto[];
};

const AddGroupModal: React.FC<Properties> = ({
	isOpen,
	onClose,
	onCreate,
	permissions,
}: Properties) => {
	const { control, errors, handleSubmit, reset } =
		useAppForm<GroupCreateRequestDto>({
			defaultValues: DEFAULT_GROUP_CREATE_IN_PAYLOAD,
			validationSchema: groupCreateRequestValidationSchema,
		});

	const items = useMemo(
		() => permissions.map(({ key, name }) => ({ label: name, value: key })),
		[permissions],
	);

	const handleCreate = useCallback(
		(data: GroupCreateRequestDto): void => {
			onCreate(data);
			onClose();
			reset(DEFAULT_GROUP_CREATE_IN_PAYLOAD);
		},
		[onClose, onCreate, reset],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(handleCreate)(event_);
		},
		[handleSubmit, handleCreate],
	);

	return (
		<Modal
			className={styles["modal"]}
			isCentered
			isOpen={isOpen}
			onClose={onClose}
		>
			<span className={styles["modal-title"]}>Add new group</span>
			<form className={styles["form"]} onSubmit={handleFormSubmit}>
				<div className={styles["form-content"]}>
					<Input
						color="light"
						control={control}
						errors={errors}
						label="Name"
						name="name"
						placeholder="Group name"
						type="text"
					/>
					<CheckboxesGroup
						control={control}
						errors={errors}
						items={items}
						label="Permissions"
						name="permissions"
					/>
				</div>
				<div className={styles["form-footer"]}>
					<Button
						className={styles["button"]}
						label="Cancel"
						onClick={onClose}
						size="small"
						style="secondary"
					/>
					<Button
						className={styles["button"]}
						label="Save"
						size="small"
						style="primary"
						type="submit"
					/>
				</div>
			</form>
		</Modal>
	);
};

export { AddGroupModal };
