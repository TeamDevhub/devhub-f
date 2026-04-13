import {useCodes} from "@/contexts/CommonCodeContext.ts";
import { useCallback, useMemo, useState} from "react";
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
    const [used, setUsed] = useState('');

    const mainCodeList = useMemo(() => {
        return selectedSuper ? getCodesByGroup(selectedSuper.code as CommonCode) : [];
    }, [selectedSuper, getCodesByGroup]);

    const subCodeList = useMemo(() => {
        const target = mainCodeList.find(item => item.code === selectedMainCode?.code);
        return target?.children ?? [];
    }, [selectedMainCode, mainCodeList]);

    const checkFilter = useCallback((item: CommonCodeItem, keyword: string) => {
        const lowerKeyword = keyword.toLowerCase();
        const matchesKeyword = item.code.toLowerCase().includes(lowerKeyword) || item.name.toLowerCase().includes(lowerKeyword);
        const matchesUsed = used == '' ? true : used == 'Y' ? item.used : !item.used;
        return matchesKeyword && matchesUsed;
    },[used]);

    const filteredMainCodes = useMemo(() => {
        return mainCodeList
            .filter(item => checkFilter(item, mainKeywords))
            .sort((a, b) => Number((a.order ?? 999)) - Number((b.order ?? 999)));
    }, [mainCodeList, mainKeywords, checkFilter]);

    const filteredSubCodes = useMemo(() => {
        return subCodeList
            .filter(item => checkFilter(item, subKeywords))
            .sort((a, b) => Number((a.order ?? 999)) - Number((b.order ?? 999)));
    }, [subCodeList, subKeywords, checkFilter]);

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
        used,
        setUsed
    };
}