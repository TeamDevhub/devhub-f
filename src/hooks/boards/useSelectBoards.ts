import { useState } from 'react';
import { getBoards } from "@/api/boards/boards.api";
import { useSelect } from "@/hooks/_common/api.hook";
import type { BoardSearchRequest, SearchData } from "@/types/type.boards";
import { useNavigate } from 'react-router-dom';

const initData : SearchData = {
    page : 1,
    categoryCd: '',
}
export default function useSelectBoards(
    initialSearch?:Partial<SearchData>,
    initialTitle?:string
) {
    const baseSearch = {...initData, ...initialSearch}; 
    const baseTitle = initialTitle ?? ""

    const [title, setTitle] = useState<string>(baseTitle);
    const [request, setRequest] = useState<BoardSearchRequest>({...baseSearch});

    const options = {
        apiFn: getBoards,
        req : request,
        cacheKey: `boards-${JSON.stringify(request)}`
    }
    const {res} = useSelect(options);

    const navigate = useNavigate();
    const handleDetail = (boardGuid:string) => {
        if(!boardGuid) return;
        navigate(`/boards/detail`, {state : {boardGuid}});
    }

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
        handleDetail
    };
}