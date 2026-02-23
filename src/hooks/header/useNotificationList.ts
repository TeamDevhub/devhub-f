import {getNotificationList} from "@/api/notification/notification.api.ts";
import useSelect from "@/hooks/_common/api.hook.ts";

export default function useNotificationList(){

    const options = {
        apiFn: getNotificationList,
        req: undefined,
        cacheKey: `notification-${sessionStorage.getItem('accessToken')}`
    }
    const { res } = useSelect(options);

    return {
        res
    }
}