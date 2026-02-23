import fetcher from "@/utils/util.api.ts";
import type {NotificationResponse} from "@/types/type.notification.ts";

export const getNotificationList = () =>
    fetcher<NotificationResponse>(`/notification/list`, undefined, { method: 'get' });

export const checkedNotification = () =>
    fetcher<void>(`/notification/checked`, undefined, { method: 'put' });
