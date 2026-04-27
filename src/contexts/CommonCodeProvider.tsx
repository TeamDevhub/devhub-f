import {type ReactNode, useMemo} from "react";
import {getCommonCode} from "@/api/common.api.ts";
import {useSelect} from "@/hooks/_common/api.hook.ts";
import type {CommonCodeRequest, CommonCodeResponse} from "@/types/type.api.ts";
import { CommonCodeContext } from "./CommonCodeContext";
import type {CommonCode, CommonCodeItem, SelectComponentProps} from "@/types/type._common.ts";

export const CommonCodeProvider = ({ children } : { children: ReactNode}) => {

    const options = useMemo(() => ({
        apiFn: getCommonCode,
        req: {},
    }), []);
    const { res, loading, refetch } = useSelect<CommonCodeResponse, CommonCodeRequest>(options);
    const codes = res?.data;

    const getCodesByGroup = useMemo(() =>
            (groupCode: CommonCode): CommonCodeItem[] => {
                if (!codes) return [];
                return codes[groupCode]?.children || [];
            },
        [codes]);

    const getCodeName = useMemo(() =>
            (groupCode: CommonCode, targetCode: string): string => {
                const group = getCodesByGroup(groupCode);

                const findName = (list: CommonCodeItem[]): string | undefined => {
                    for (const item of list) {
                        if (item.code === targetCode) return item.name;
                        if (item.children) {
                            const childName = findName(item.children);
                            if (childName) return childName;
                        }
                    }
                };

                return findName(group) || targetCode;
            },
        [getCodesByGroup]);

    const getSelectOptions = useMemo(() =>
        (group: CommonCode)=> {
            const codeList = getCodesByGroup(group);
            return codeList.map((item):SelectComponentProps => ({
                value: item.code,
                label: item.name,
            }));}
        ,[getCodesByGroup]);

    const value = useMemo(() => ({
        codes,
        loading,
        getCodesByGroup,
        getCodeName,
        getSelectOptions,
        refetch,
    }), [codes, loading, getCodesByGroup, getCodeName, getSelectOptions, refetch]);

    return (
        <CommonCodeContext.Provider value={value}>
            {children}
        </CommonCodeContext.Provider>
    )
}