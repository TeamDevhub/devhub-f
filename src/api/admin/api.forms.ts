import fetcher from "@/utils/util.api.ts";
import type { FormItem, RequestSelectForms, RequestSaveForm } from "@/types/type.forms.ts";

export const selectForms = (req: RequestSelectForms) =>
    fetcher<FormItem, RequestSelectForms>(`/admin/form`, req, { method: 'get' });

export const saveForm = (req: RequestSaveForm) =>
    fetcher<void, RequestSaveForm>(`/admin/form`, req, { method: 'put' });

export const deleteForm = (fieldName: string) =>
    fetcher<void, string>(`/admin/form/${fieldName}`, fieldName, { method: 'delete' });
