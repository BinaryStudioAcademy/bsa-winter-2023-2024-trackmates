import { zodResolver } from "@hookform/resolvers/zod";
import {
	UseFormProps,
	type Control,
	type DefaultValues,
	type FieldErrors,
	type FieldValues,
	type UseFormHandleSubmit,
	type ValidationMode,
} from "react-hook-form";
import { useForm } from "react-hook-form";

import { type ValidationSchema } from "~/libs/types/types.ts";

type Parameters<T extends FieldValues = FieldValues> = {
	defaultValues: DefaultValues<T>;
	validationSchema?: ValidationSchema;
	mode?: keyof ValidationMode;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	handleSubmit: UseFormHandleSubmit<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
	validationSchema,
	defaultValues,
	mode = "onSubmit",
}: Parameters<T>): ReturnValue<T> => {
	let parameters: UseFormProps<T> = {
		mode,
		defaultValues,
	};

	if (validationSchema) {
		parameters = {
			...parameters,
			resolver: zodResolver(validationSchema),
		};
	}

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<T>(parameters);

	return {
		control,
		errors,
		handleSubmit,
	};
};

export { useAppForm };
