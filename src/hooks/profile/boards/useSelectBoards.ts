import { useState, useMemo } from 'react';
import { getUserBoards } from "@/api/web/profile.api";
import { useSelect } from "@/hooks/_common/api.hook";

export default function useSelectBoards(
    initialPage:number = 1
) {
    const [page, setPage] = useState(initialPage);
    const options = useMemo(() => ({
        apiFn: getUserBoards,
        req: { page: page - 1 }             
    }), [page]);

    const {res} = useSelect(options);

    return{
        res, 
        page, setPage
    };
}