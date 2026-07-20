import { useSelect } from "@/hooks/_common/api.hook";
import { useState } from 'react';
import type { SearchUserData, MyProject } from "@/types/type.projects";
import { getUserApplyProjects } from '@/api/web/api.projects';

const initData: SearchUserData = {
  page: 0,
  size: 10
}
export default function useSelectApplyProjects() {
  const [request, setRequest] = useState<SearchUserData>(initData);

  const options = {
    apiFn: getUserApplyProjects,
    req: request,
  }
  const { res, refetch } = useSelect<MyProject, SearchUserData>(options);

  // MUI Pagination은 1부터 시작하지만 백엔드는 0부터 시작하므로 여기서 변환한다.
  const setPage = (page: number) => {
    setRequest((prev) => ({ ...prev, page: page - 1 }));
  }

  return { res, request, setPage, refetch };
}
