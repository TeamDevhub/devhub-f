import { useMutation } from "@/hooks/_common/api.hook";
import { likeBoard } from "@/api/boards/boards.api";
// import type { BoardSummary, BoardSearchRequest, SearchData } from "@/types/type.boards";

export default function useMutationBoards(
) {
    const handleSuccess= (res) => ("회원가입 성공");
    const handleFail = (res) => {
        //리다이렉트 코드
    }
    
    const {mutate : likeBoardMu} = useMutation(
        likeBoard,
	    handleSuccess,
		handleFail,
    );

    const handleLike = async (boardGuid:string) => {
        await likeBoardMu(boardGuid);
    }

    return{
        handleLike
    };
}