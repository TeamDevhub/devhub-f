import {useCallback, useEffect, useRef, useState} from 'react';
import type {ApiResponse, UploadResponse} from "@/types/type.api.ts";
import {ERROR_MESSAGES} from "@/types/errorMessages.const.ts";

interface FileState {
    file: File | null;
    previewUrl: string | null;
}

interface RegisterOptions {
    accept?: string; //(예: 'image/*', '.pdf')
    maxSize?: number;
}

const DEFAULT_MAX_SIZE_MB = 5;
const DEFAULT_ACCEPT = "*";

const useFileUpload = () => {
    const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [fileStates, setFileStates] = useState<Record<string, FileState>>({});

    useEffect(() => {
        return () => {
            Object.values(fileStates).forEach((state) => {
                if (state.previewUrl) {
                    URL.revokeObjectURL(state.previewUrl);
                }
            });
        };// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const register = (name: string, options?: RegisterOptions) => (el: HTMLInputElement | null) => {
        if (!el) return;
        inputRefs.current[name] = el;

        const finalAccept = options?.accept ?? DEFAULT_ACCEPT;
        const finalMaxSize = options?.maxSize ?? DEFAULT_MAX_SIZE_MB;
        el.accept = finalAccept;

        el.onchange = () => {
            const file = el.files?.[0] || null;
            let errorMessage: string | null = null;
            if (file) {
                if (file.size > finalMaxSize * 1024 * 1024) {
                    errorMessage = ERROR_MESSAGES.FILE_SIZE_EXCEEDED(finalMaxSize);
                }
                if (!errorMessage && finalAccept !== "*" && !checkFileType(file, finalAccept)) {
                    errorMessage = ERROR_MESSAGES.FILE_INVALID_TYPE;
                }
            }
            if (errorMessage) {
                el.value = "";
                setErrors(prev => ({
                    ...prev,
                    [name]: errorMessage
                }));
                handleFileUpdate(name, null);
                return;
            }

            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
            handleFileUpdate(name, file);
        };
    };

    const checkFileType = (file: File, accept: string) => {
        if (accept === "*") return true;
        const mimeType = file.type.toLowerCase();
        const fileName = file.name.toLowerCase();

        return accept.split(",").some((type) => {
            const trimmedType = type.trim();
            if (trimmedType.startsWith(".")) {
                return fileName.endsWith(trimmedType);
            }
            if (trimmedType.endsWith("/*")) {
                return mimeType.startsWith(trimmedType.replace("/*", ""));
            }
            return mimeType === trimmedType;
        });
    };

    const handleFileUpdate = (name: string, file: File | null)=> {
        if (fileStates[name]?.previewUrl) URL.revokeObjectURL(fileStates[name].previewUrl);
        const previewUrl = file ? URL.createObjectURL(file) : null;
        setFileStates((prev) => ({
            ...prev,
            [name]: { file, previewUrl }
        }));
    };

    const clear = (name: string) => {
        if (inputRefs.current[name]) {
            inputRefs.current[name]!.value = "";
        }
        handleFileUpdate(name, null);
    };

    const clearAll = useCallback(() => {
        Object.values(inputRefs.current).forEach((input) => {
            if (input) input.value = "";
        });

        setFileStates((prev) => {
            Object.values(prev).forEach((state) => {
                if (state.previewUrl) {
                    URL.revokeObjectURL(state.previewUrl);
                }
            });
            return {};
        });
    }, []);

    const upload = async (specificName?: string) => {
        const formData = new FormData();

        if (specificName) {
            const target = fileStates[specificName]?.file;
            if (target) formData.append(specificName, target);
        } else {
            Object.entries(fileStates).forEach(([name, state]) => {
                if (state.file) formData.append(name, state.file);
            });
        }

        const uploadUrl = '';
        console.log(uploadUrl, formData);
        return {
            success:true,
            code: '',
            data:{ 'image' : 'IMAGE_GUID_TEST', 'attachment' : 'ATTACH_GUID_TEST'},
        } as ApiResponse<UploadResponse>
        // return await fetcher<UploadResponse>(uploadUrl, formData);
    };

    return {
        register,
        fileStates,
        upload,
        errors,
        clear,
        clearAll,
    };
};

export default useFileUpload;