import { useCallback, useState } from "~/libs/hooks/hooks.js";

const useAddCourseModal = (): {
	handleModalClose: () => void;
	handleModalOpen: () => void;
	isAddCourseModalOpen: boolean;
} => {
	const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);

	const handleModalOpen = useCallback(() => {
		setIsAddCourseModalOpen(true);
	}, [setIsAddCourseModalOpen]);
	const handleModalClose = useCallback(() => {
		setIsAddCourseModalOpen(false);
	}, [setIsAddCourseModalOpen]);

	return { handleModalClose, handleModalOpen, isAddCourseModalOpen };
};

export { useAddCourseModal };
