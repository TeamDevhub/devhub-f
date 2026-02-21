import {createContext, useContext} from "react";

interface AuthContextType {
    openModal?: (config: ModalConfig) => void;
    closeModal?: () => void;
}

export interface ModalConfig {
    isOpen?: boolean,
    title: string,
    content?: string,
    onSubmit: () => void,
    onClose?: () => void,
}

export const useModal = () => useContext(ModalContext);
export const ModalContext = createContext<AuthContextType>({});