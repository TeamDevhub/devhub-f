import { useSelect } from '../_common/api.hook';
import { useState } from 'react';
import type { SearchUserData, MyProjectList } from "@/types/type.projects";
import type { ApiResponse } from '@/types/type.api';
import { getUserProjects, getUserLikeProjects, getUserApplyProjects } from '@/api/projects/projects.api';


type TabType = 0 | 1 | 2;
type ProjectCardVariant = 'register' | 'apply' | 'favorite' | 'participate';
const apiMap: Record<TabType, (req: SearchUserData) => Promise<ApiResponse<MyProjectList>> 
>= {
  0: getUserProjects,
  1: getUserApplyProjects,
  2: getUserLikeProjects
};
const tapMap: Record<TabType, ProjectCardVariant> 
= {
  0: "register",
  1: "apply",
  2: "favorite"
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
  const { res, loading, error } = useSelect<MyProjectList, SearchUserData>(options);
  
  const setPage = (page: number) => {
    setRequest((prev) => ({ ...prev, page: page }));
  }

  const handleTabChange = (_: React.SyntheticEvent, newValue: TabType) => {
      setTabValue(newValue);
    };
    
  return { res, loading, error, setPage, tabValue, handleTabChange, tabVariant:tapMap[tabValue] };
}
