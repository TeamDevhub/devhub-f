import {ModalContext} from "@/contexts/ModalContext.ts";
import {useCallback, useContext} from "react";

export const useModal = () => {
    const { openModal, closeModal } = useContext(ModalContext);

    const alert = useCallback((message: string) => {
        openModal?.({
            title: '알림',
            content: message,
            onSubmit: () => closeModal?.(),
        });
    }, [openModal, closeModal]);

    const confirm = useCallback((message: string) => {
        return new Promise((resolve) => {
            openModal?.({
                title: '확인',
                content: message,
                onSubmit: () => resolve(true),
                onClose: () => resolve(false),
            });
        });
    }, [openModal]);

    return { alert, confirm };
};