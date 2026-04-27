import { getProjects, createProjectLike } from "@/api/web/projects.api";
import useFormState from '@/hooks/_common/useFormState.ts';
import type { FilterData, ProjectExtra, ProjectSearchRequest, SearchData } from "@/types/type.projects";
import { useState } from "react";
import { useSelect, useMutation } from "../_common/api.hook";

const initData: SearchData = {
  page: 0,
  size: 10,
  order: '001',
}

const initFilterData: FilterData = {
  skillCodeList: [],
  regionCodeList: [],
  positionCodeList: [],
  progressPeriodList: [],
  positionLevelCodeList: [],
  projectRecruitTypeList: [],
  projectProgressTypeList: [],
  projectRecruitStatusList: [],
  recruitmentStartDate: null,
  recruitmentEndDate: null,
  progressStartDate: null,
}

export default function useSelectProjects(
  initialFilter?: Partial<FilterData>,
  initialSearch?: Partial<SearchData>,
  initialKeyword?: string,
) {

  const baseFilter = { ...initFilterData, ...initialFilter };
  const baseSearch = { ...initData, ...initialSearch };
  const baseKeyword = initialKeyword ?? "";

  const {
    state: filters,
    setState: setFilters,
    handleChange: setFilter,
    createToggle,
    createHandler: createFilterHandler,
    reset: resetFilters
  } = useFormState<FilterData>(baseFilter);
  const [keyword, setKeyword] = useState<string>(baseKeyword);
  const [request, setRequest] = useState<ProjectSearchRequest>({
    ...baseFilter,
    ...baseSearch,
    keyword: baseKeyword
  });

  const options = {
    apiFn: getProjects,
    req: request,
  }
  const { res, loading } = useSelect<ProjectExtra, ProjectSearchRequest>(options);
  const { mutate: projectLikeMutate } = useMutation<string, void>(createProjectLike);

  const setPage = (page: number) => {
    setRequest((prev) => ({ ...prev, page: page }));
  }

  const setOrder = (order: string) => {
    setRequest((prev) => ({ ...prev, order: order, page: 0 }));
  }

  const resetAll = () => {
    resetFilters();
    setKeyword(baseKeyword);
    setRequest({
      ...baseFilter,
      ...baseSearch,
      keyword: baseKeyword
    });
  };

  const applySearch = () => {
    resetFilters();
    setRequest({
      ...baseFilter,
      ...baseSearch,
      keyword: keyword,
      page: 0,
    });
  }

  const applyFilter = (filterData?: FilterData) => {
    setRequest((prev) => ({
      ...prev,
      ...filters,
      ...filterData,
      page: 0
    }));
    if (filterData) setFilters(filterData);
  }

  return {
    filters, setFilters, setFilter, createToggle, createFilterHandler, resetFilters,
    request, setRequest,
    keyword, setKeyword,
    setPage, setOrder,
    res, loading,
    applySearch, applyFilter, resetAll,
    toggleLike: projectLikeMutate
  };
}