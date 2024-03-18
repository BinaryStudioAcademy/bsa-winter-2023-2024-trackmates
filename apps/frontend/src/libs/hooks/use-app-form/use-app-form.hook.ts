import { zodResolver } from "@hookform/resolvers/zod";
import {
	type Control,
	type DefaultValues,
	type FieldErrors,
	type FieldValues,
	type UseFormGetValues,
	type UseFormHandleSubmit,
	type UseFormProps,
	type UseFormRegister,
	type UseFormReset,
	type UseFormSetValue,
	type UseFormStateReturn,
	type UseFormWatch,
	type ValidationMode,
	useForm,
} from "react-hook-form";

import { type ValidationSchema } from "~/libs/types/types.js";

type Parameters<T extends FieldValues = FieldValues> = {
	defaultValues: DefaultValues<T>;
	mode?: keyof ValidationMode;
	validationSchema?: ValidationSchema;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	formState: UseFormStateReturn<T>;
	getValues: UseFormGetValues<T>;
	handleSubmit: UseFormHandleSubmit<T>;
	register: UseFormRegister<T>;
	reset: UseFormReset<T>;
	setValue: UseFormSetValue<T>;
	watch: UseFormWatch<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
	defaultValues,
	mode = "onSubmit",
	validationSchema,
}: Parameters<T>): ReturnValue<T> => {
	let parameters: UseFormProps<T> = {
		defaultValues,
		mode,
	};

	if (validationSchema) {
		parameters = {
			...parameters,
			resolver: zodResolver(validationSchema),
		};
	}

	const {
		control,
		formState: { errors },
		formState,
		getValues,
		handleSubmit,
		register,
		reset,
		setValue,
		watch,
	} = useForm<T>(parameters);

	return {
		control,
		errors,
		formState,
		getValues,
		handleSubmit,
		register,
		reset,
		setValue,
		watch,
	};
};

export { useAppForm };
