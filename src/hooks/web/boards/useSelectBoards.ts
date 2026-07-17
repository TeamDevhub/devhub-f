import { useState, useMemo } from 'react';
import { getBoards, likeBoard } from "@/api/web/api.boards";
import { useSelect, useMutation } from "@/hooks/_common/api.hook";
import { useModal } from "@/hooks/_common/useModal";
import { useRequireAuth } from "@/hooks/_common/useRequireAuth";
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

    const options = useMemo(() => ({
        apiFn: getBoards,
        req: {
            categoryCd: request.categoryCd,
            page: request.page - 1,
            title: request.title
        }
    }), [request.categoryCd, request.page, request.title]);

    const {res} = useSelect(options);

    const { alert } = useModal();
    const { requireAuth } = useRequireAuth();
    const { mutate: likeBoardMu } = useMutation(likeBoard, undefined, () => alert('좋아요 처리에 실패했습니다.'));
    const toggleLike = (boardGuid: string) => requireAuth(() => likeBoardMu(boardGuid));

    const navigate = useNavigate();
    const handleDetail = (boardGuid:string) => {
        if(!boardGuid) return;
        navigate(`/boards/detail/${boardGuid}`);
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
        handleDetail,
        toggleLike
    };
}