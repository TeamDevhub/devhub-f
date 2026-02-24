import {getNotificationList} from "@/api/notification/notification.api.ts";
import useSelect from "@/hooks/_common/api.hook.ts";

export default function useNotificationList(){

    const options = {
        apiFn: getNotificationList,
        req: undefined,
        cacheKey: `notification-${sessionStorage.getItem('accessToken')}`
    }
    const { res, setRes } = useSelect(options);

    const removeNotification = (guid: string) => {
        const newDataList = res?.dataList?.filter(item => item.notificationGuid !== guid);
        setRes((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                dataList: newDataList
            };
        });
    }

    const hasList = !!res?.dataList && res?.dataList.length > 0;

    return {
        res,
        removeNotification,
        hasList
    }
}