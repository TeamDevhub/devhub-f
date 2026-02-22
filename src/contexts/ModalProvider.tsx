import {type ReactNode, useState} from 'react';
import {ModalContext, type ModalConfig} from "@/contexts/ModalContext.ts";
import WebPopup from "@/components/_common/popup/WebPopup.tsx";

export const ModalProvider = ({ children } : { children: ReactNode }) => {
    const [modal, setModal] = useState<ModalConfig>({
        isOpen: false,
        title: '',
        content: '',
        onSubmit: ()=>{},
    });

    const openModal = (config: ModalConfig) => {
        setModal({ ...config, isOpen: true });
    };

    const closeModal = () => {
        setModal((prev) => ({ ...prev, isOpen: false }));
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {/* 실제 MUI Dialog나 커스텀 모달 컴포넌트를 여기에 배치 */}
            <WebPopup {...modal}>
                {modal.content}
            </WebPopup>
        </ModalContext.Provider>
    );
};
