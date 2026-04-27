import fetcher from "@/utils/util.api.ts";
import type {NotificationResponse} from "@/types/type.notification.ts";

export const getNotificationList = () =>
    fetcher<NotificationResponse>(`/notification/list`, undefined, { method: 'get' });

export const checkedNotification = (notificationGuid: string) =>
    fetcher<void>(`/notification/checked/${notificationGuid}`, undefined, { method: 'put' });
