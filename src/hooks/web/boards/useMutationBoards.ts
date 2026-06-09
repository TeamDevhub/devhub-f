import { useMutation } from "@/hooks/_common/api.hook";
import { likeBoard } from "@/api/web/api.boards";

export default function useMutationBoards(
) {

    const handleSuccess = () => {
        location.reload();
    }

    const handleFail = () => {
        alert('생성이 실패되었습니다.');
    }

    const {mutate : likeBoardMu} = useMutation(likeBoard, handleSuccess, handleFail);

    const handleLike = async (boardGuid:string|undefined) => {
        if(!boardGuid) return;
        await likeBoardMu(boardGuid);
    }

    return{
        handleLike
    };
}