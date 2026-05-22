import { useSelect } from "@/hooks/_common/api.hook";
import { useState } from 'react';
import type { SearchUserData, MyProject } from "@/types/type.projects";
import { getUserLikeProjects } from '@/api/web/api.projects';

const initData: SearchUserData = {
  page: 0,
  size: 10
}
export default function useSelectLikeProjects() {
  const [request, setRequest] = useState<SearchUserData>(initData);

  const options = {
    apiFn: getUserLikeProjects,
    req: request,
  }
  const { res } = useSelect<MyProject, SearchUserData>(options);

  const setPage = (page: number) => {
    setRequest((prev) => ({ ...prev, page: page }));
  }

  return { res, setPage };
}
