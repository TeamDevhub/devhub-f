import { useMutation } from "@/hooks/_common/api.hook";
import { useModal } from "@/hooks/_common/useModal";
import { likeBoard } from "@/api/web/api.boards";

export default function useMutationBoards(
) {
    const { alert } = useModal();

    const handleFail = () => {
        alert('좋아요 처리에 실패했습니다.');
    }

    const {mutate : likeBoardMu} = useMutation(likeBoard, undefined, handleFail);

    const handleLike = async (boardGuid:string|undefined) => {
        if(!boardGuid) return;
        await likeBoardMu(boardGuid);
    }

    return{
        handleLike
    };
}