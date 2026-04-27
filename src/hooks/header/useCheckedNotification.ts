import {useMutation} from "@/hooks/_common/api.hook.ts";
import {checkedNotification} from "@/api/web/notification.api.ts";

export default function useCheckedNotification(){

    const { mutate } = useMutation(checkedNotification)

    return {
        checkedNotification : mutate
    }
}