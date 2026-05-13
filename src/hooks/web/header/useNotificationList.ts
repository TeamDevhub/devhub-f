import {getNotificationList} from "@/api/web/api.notification.ts";
import useSelect from "@/hooks/_common/api.hook.ts";
import { useAuth } from "@/hooks/_common/useAuth";
import { useMemo } from "react";

export default function useNotificationList(){
    const { user } = useAuth();
    const userGuid = user?.userGuid;

    const options = useMemo(() => ({
        apiFn: getNotificationList,
        req: undefined,
        cacheKey: userGuid ? `notification-${userGuid}` : undefined,
        enabled: !!userGuid,
    }), [userGuid]);
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