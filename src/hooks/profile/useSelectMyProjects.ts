import { useSelect } from '../_common/api.hook';
import { useState } from 'react';
import type { SearchUserData, MyProject, MyProjectListCardVariant } from "@/types/type.projects";
import type { ApiResponse } from '@/types/type.api';
import { getUserProjects, getUserLikeProjects, getUserApplyProjects } from '@/api/projects/projects.api';

type TabType = 0 | 1 | 2 | 3;
const apiMap: Record<TabType, (req: SearchUserData) => Promise<ApiResponse<MyProject>> 
>= {
  0: getUserProjects,
  1: getUserApplyProjects,
  2: getUserLikeProjects,
  3: getUserLikeProjects
};
const tapMap: Record<TabType, MyProjectListCardVariant> 
= {
  0: "register",
  1: "apply",
  2: "favorite",
  3: "participate"
};
const initData:SearchUserData = {
  page: 0,
  size: 10
}
export default function useSelectMyProjects() {
  const [ request, setRequest ] = useState<SearchUserData>(initData);
  const [ tabValue, setTabValue ] = useState<TabType>(2);

  const options = {
      apiFn: apiMap[tabValue],
      req: request,
    }
  const { res, loading, error } = useSelect<MyProject, SearchUserData>(options);
  
  const setPage = (page: number) => {
    setRequest((prev) => ({ ...prev, page: page }));
  }

  const handleTabChange = (_: React.SyntheticEvent, newValue: TabType) => {
      setTabValue(newValue);
    };
    
  return { res, loading, error, setPage, tabValue, handleTabChange, tabVariant:tapMap[tabValue] };
}
