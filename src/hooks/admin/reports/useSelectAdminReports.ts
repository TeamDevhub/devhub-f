import { useState } from 'react';
import { getAdminReports } from '@/api/admin/api.reports';
import { useSelect } from '@/hooks/_common/api.hook';
import useFormState from '@/hooks/_common/useFormState';
import type { AdminReportSearchRequest } from '@/types/type.user';
import type { DateType } from '@/types/type.api';

export type ProcessedFilter = '' | 'true' | 'false';

interface AdminReportsFormState {
  reportedUser: string;
  categoryCd: string;
  processedFilter: ProcessedFilter;
  registeredStartDate: DateType;
  registeredEndDate: DateType;
}

type AdminReportsRequest = AdminReportSearchRequest & { page: number; size: number };

const PAGE_SIZE = 10;

const initFormState: AdminReportsFormState = {
  reportedUser: '',
  categoryCd: '',
  processedFilter: '',
  registeredStartDate: null,
  registeredEndDate: null,
};

const initRequest: AdminReportsRequest = { page: 0, size: PAGE_SIZE };

const parseProcessedFilter = (filter: ProcessedFilter): boolean | undefined => {
  if (filter === 'true') return true;
  if (filter === 'false') return false;
  return undefined;
};

export default function useSelectAdminReports() {
  const { state, handleChange, reset } = useFormState<AdminReportsFormState>({ ...initFormState });
  const [request, setRequest] = useState<AdminReportsRequest>({ ...initRequest });

  const { res, loading, refetch } = useSelect({ apiFn: getAdminReports, req: request });

  const reportSearch = () => {
    setRequest({
      page: 0,
      size: PAGE_SIZE,
      reportedUser: state.reportedUser || undefined,
      categoryCd: state.categoryCd || undefined,
      processed: parseProcessedFilter(state.processedFilter),
      registeredStartDate: state.registeredStartDate,
      registeredEndDate: state.registeredEndDate,
    });
  };

  const setPage = (page: number) => {
    setRequest((prev) => ({ ...prev, page: page - 1 }));
  };

  return {
    res,
    loading,
    state,
    request,
    setPage,
    reportSearch,
    handleReset: reset,
    onHandleEvent: handleChange,
    refetch,
  };
}
