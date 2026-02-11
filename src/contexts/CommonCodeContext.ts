import {createContext, useContext} from "react";
import type {CommonCodeResponse} from "@/types/type.api.ts";
import type {CommonCode, CommonCodeItem, SelectComponentProps} from "@/types/type._common.ts";

interface CodeContextType {
    codes: CommonCodeResponse | undefined;
    loading: boolean;
    getCodesByGroup: (groupCode: CommonCode) => CommonCodeItem[];
    getCodeName: (groupCode: CommonCode, targetCode: string) => string;
    getSelectOptions: (groupCode: CommonCode) => SelectComponentProps[];
}

export const CommonCodeContext = createContext<CodeContextType | undefined>(undefined);

export const useCodes = () => {
    const context = useContext(CommonCodeContext);
    if (!context) {
        throw new Error('useCodes must be used within a CodeProvider');
    }
    return context;
};