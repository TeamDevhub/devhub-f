import { useState } from 'react';
import { getBoards } from "@/api/boards/boards.api";
import { useSelect } from "@/hooks/_common/api.hook";
// import {useSelectBoards} from './boards.json.hook'
import type { BoardSearchRequest, SearchData } from "@/types/type.boards";

//완전
const initData : SearchData = {
    page : 1,
    categoryCd: '',
}
export default function useSelecttBoards(
    //훅 내부 상태의 초기값일때
    //SearchData optional / initialSearch optional
    initialSearch?:Partial<SearchData>,
    initialTitle?:string
) {
    //얘가 ui에서 optional(string|undefind)일수있어도, 훅 내부에선 타입이 일정해야함
    const baseSearch = {...initData, ...initialSearch}; 
    const baseTitle = initialTitle ?? ""

    const [title, setTitle] = useState<string>(baseTitle);
    const [request, setRequest] = useState<BoardSearchRequest>({...baseSearch, title:baseTitle});

    const options = {
        apiFn: getBoards,
        req : request,
        cacheKey: `boards-${JSON.stringify(request)}`
    }
    // const {res} = useSelectBoards(request;
    const {res} = useSelect(options);
    
    //페이지
    const setPage = (page:number) => {
        setRequest(prev => ({
            ...prev, 
            page:page
        }))
    }
    //버튼
    const handleSearchClick = () => {
        setRequest(prev => ({
            ...prev, 
            title:title,
            page:1
        }))
    }
    //tab
    const setTab = (newValue:string) => {
        setTitle(baseTitle);
        setRequest({
            ...baseSearch,
            categoryCd : newValue,
        })
    }

    return{
        res, 
        request, setRequest,
        setPage, 
        setTab, 
        title, setTitle,
        handleSearchClick,
    };
}