import { useSelect } from "@/hooks/_common/api.hook";
import { useState } from 'react';
import type { SearchUserData, MyProject } from "@/types/type.projects";
import { getUserProjects } from '@/api/projects/projects.api';

const initData: SearchUserData = {
  page: 0,
  size: 10
}
export default function useSelectMyProjects() {
  const [request, setRequest] = useState<SearchUserData>(initData);

  const options = {
    apiFn: getUserProjects,
    req: request,
  }
  const { res, loading, error } = useSelect<MyProject, SearchUserData>(options);

  const setPage = (page: number) => {
    setRequest((prev) => ({ ...prev, page: page }));
  }

  return { res, setPage };
}
