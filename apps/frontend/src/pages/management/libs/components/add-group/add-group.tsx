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
	const { control, errors, handleSubmit, reset } =
		useAppForm<GroupCreateRequestDto>({
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
		() => permissions.map(({ key, name }) => ({ label: name, value: key })),
		[permissions],
	);

	const handleCreate = useCallback(
		(data: GroupCreateRequestDto): void => {
			onCreate(data);
			setIsModalOpen(false);
			reset(DEFAULT_GROUP_CREATE_IN_PAYLOAD);
		},
		[onCreate, reset],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(handleCreate)(event_);
		},
		[handleSubmit, handleCreate],
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
