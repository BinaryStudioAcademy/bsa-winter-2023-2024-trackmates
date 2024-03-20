import {
	Button,
	CheckboxesGroup,
	Input,
	Modal,
} from "~/libs/components/components.js";
import {
	useAppForm,
	useCallback,
	useMemo,
	useState,
} from "~/libs/hooks/hooks.js";
import {
	type GroupCreateRequestDto,
	groupCreateRequestValidationSchema,
} from "~/modules/groups/groups.js";
import { type PermissionResponseDto } from "~/modules/permissions/permissions.js";

import { DEFAULT_GROUP_CREATE_IN_PAYLOAD } from "../groups-tab/libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onCreate: (data: GroupCreateRequestDto) => void;
	permissions: PermissionResponseDto[];
};

const AddGroup: React.FC<Properties> = ({
	onCreate,
	permissions,
}: Properties) => {
	const title = "Add new group";
	const { control, errors, handleSubmit } = useAppForm<GroupCreateRequestDto>({
		defaultValues: DEFAULT_GROUP_CREATE_IN_PAYLOAD,
		validationSchema: groupCreateRequestValidationSchema,
	});

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const handleModalClose = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	const handleModalOpen = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	const items = useMemo(
		() => permissions.map(({ key, name }) => ({ key, label: name })),
		[permissions],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onCreate)(event_);
		},
		[handleSubmit, onCreate],
	);

	return (
		<>
			<Button
				label="+ New group"
				onClick={handleModalOpen}
				size="small"
				style="primary"
			/>

			<Modal
				className={styles["modal"]}
				isCentered
				isOpen={isModalOpen}
				onClose={handleModalClose}
			>
				<span className={styles["modal-title"]}>{title}</span>
				<form className={styles["form"]} onSubmit={handleFormSubmit}>
					<div className={styles["form-content"]}>
						<Input
							color="light"
							control={control}
							errors={errors}
							label="Key"
							name="key"
							placeholder="Group key"
							type="text"
						/>
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
							onClick={handleModalClose}
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
		</>
	);
};

export { AddGroup };
