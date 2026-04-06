import {useCodes} from "@/contexts/CommonCodeContext.ts";
import { useMemo, useState} from "react";
import type {CommonCode, CommonCodeItem} from "@/types/type._common.ts";

export default function useSelectCodes(){

    const { codes, getCodesByGroup, refetch } = useCodes();

    const superCodes = useMemo(
        () => Object.keys(codes ?? []) as CommonCode[],
        [codes]
    );

    const [selectedSuperKey, setSelectedSuperKey] = useState<CommonCode | undefined>();
    const currentKey = selectedSuperKey ?? superCodes[0];
    const selectedSuper = codes?.[currentKey];

    const [selectedMainCode, setSelectedMainCode] = useState<CommonCodeItem | undefined>();
    const [selectedSubCode, setSelectedSubCode] = useState<CommonCodeItem | undefined>();
    const [mainKeywords, setMainKeywords] = useState('');
    const [subKeywords, setSubKeywords] = useState('');

    const mainCodeList = useMemo(() => {
        return selectedSuper ? getCodesByGroup(selectedSuper.code as CommonCode) : [];
    }, [selectedSuper, getCodesByGroup]);

    const subCodeList = useMemo(() => {
        const target = mainCodeList.find(item => item.code === selectedMainCode?.code);
        return target?.children ?? [];
    }, [selectedMainCode, mainCodeList]);

    const filteredMainCodes = useMemo(() => {
        const lowerKeyword = mainKeywords.toLowerCase();
        return mainCodeList.filter(item =>
            item.code.toLowerCase().includes(lowerKeyword) ||
            item.name.toLowerCase().includes(lowerKeyword)
        );
    }, [mainCodeList, mainKeywords]);

    const filteredSubCodes = useMemo(() => {
        const lowerKeyword = subKeywords.toLowerCase();
        return subCodeList.filter(item =>
            item.code.toLowerCase().includes(lowerKeyword) ||
            item.name.toLowerCase().includes(lowerKeyword)
        );
    }, [subCodeList, subKeywords]);

    const onChangeSuperCode = (code: CommonCode) => {
        setSelectedSuperKey(code);
        setSelectedMainCode(undefined); // 상위가 바뀌면 하위 선택 해제
        setMainKeywords('');
        setSubKeywords('');
    };

    const onClickMainRow = (codItem: CommonCodeItem) => {
        setSelectedMainCode(codItem);
        setSubKeywords('');
    };

    const onClickSubRow = (codItem: CommonCodeItem) => {
        setSelectedSubCode(codItem);
    };

    return {
        superCodes,
        currentKey,
        selectedSuper,
        selectedSuperKey,
        selectedMainCode,
        selectedSubCode,
        mainCodes: filteredMainCodes,
        subCodes: filteredSubCodes,
        mainKeywords,
        subKeywords,
        setMainKeywords,
        setSubKeywords,
        onChangeSuperCode,
        onClickMainRow,
        onClickSubRow,
        refetch,
    };
}