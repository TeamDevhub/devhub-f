import { useState } from 'react';
import { getAdminBoards } from "@/api/boards/boards.api";
import { useSelect } from "@/hooks/_common/api.hook";
import type { AdminBoardSearchRequest } from "@/types/type.boards";
import { useNavigate } from 'react-router-dom';
import useFormState from "@/hooks/_common/useFormState.ts";
import useDeleteBoard from '@/hooks/boards/useDeleteBoard';

const initData : AdminBoardSearchRequest = {
    page : 0,
    title:'',
    categoryCd: '',
    userStatus: '',
    reported: '',
    registeredStartDate: null,
    registeredEndDate: null
};
export default function useSelectAdminBoards(
) {
    const {state, setState, handleChange, reset} = useFormState<AdminBoardSearchRequest>({...initData}); 
    const [request, setRequest] = useState<AdminBoardSearchRequest>({...initData});
    const [selectedGuids, setSelectedGuids] = useState<string[]>([]); 

    const options = {
        apiFn: getAdminBoards,
        req: request
    };

    const {res} = useSelect(options);

    const navigate = useNavigate();
    const handleDetail = (boardGuid:string) => {
        if(!boardGuid) return;
        navigate(`/boards/detail`, {state : {boardGuid}});
    }

    const boardSearch = () => {
        const searchParams = { ...state, page: 0 };
        setRequest(searchParams);
        setState(searchParams);
    }

    const setPage = (page: number) => {
        setRequest((prev) => ({ ...prev, page: page - 1 }));
    }

    const { handleDelete } = useDeleteBoard(() => {
        setSelectedGuids([]); 
        boardSearch();       
    });
    
    const handleSelectionChange = (guid: string, checked: boolean) => {
        if (checked) setSelectedGuids(prev => [...prev, guid]);
        else setSelectedGuids(prev => prev.filter(id => id !== guid));
    };

    return{
        res, 
        state,
        request, setRequest,
        setPage, 
        boardSearch,
        handleDetail,
        handleReset : reset,
        onHandleEvent : handleChange,
        selectedGuids, handleSelectionChange, 
        boardsDelete: () => handleDelete(selectedGuids)
    };
}