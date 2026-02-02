import { COMMON_CODE } from "@/types/const";
import type { FilterData } from "@/types/type.projects";
import { Button, Divider } from "@mui/material";
import SelectableGroup from '@/components/_common/SelectableGroup';
import { getCodesByGroup } from "@/utils/util._common";
import AddableChipGroup from '@/components/_common/AddableChipGroup';
import FilterWarpper from "./FilterWarpper";

export type ListFilterData = Omit<FilterData, 'recruitmentStartDate' | 'recruitmentEndDate' | 'progressStartDate'>;

export default function FilterList({
  filterData,
  createToggle,
  setFilter,
  handleResetFilter,
  clickOpenSkillPopup
}:{
  filterData:ListFilterData;
  setFilter: <K extends keyof ListFilterData>(key: K, value: ListFilterData[K]) => void;
  createToggle: (key: keyof ListFilterData) => (v:string) => void;
  handleResetFilter: () => void;
  clickOpenSkillPopup: () => void;
}){

  return (
    <>
      <Button className='reset-btn' size='small' variant='text' onClick={handleResetFilter}>초기화</Button>
      <FilterWarpper title='필터' subText='원하는 조건으로 검색하세요'>
        <SelectableGroup 
          items={getCodesByGroup(COMMON_CODE.PROJECT_RECRUIT_STATUS)} 
          onToggle={createToggle('projectRecruitStatusList')} 
          type="button" 
          values={filterData.projectRecruitStatusList}
        />
      </FilterWarpper>
      <Divider />
      <FilterWarpper title='모집구분' subText='모집구분'>
        <SelectableGroup 
          items={getCodesByGroup(COMMON_CODE.PROJECT_RECRUIT_TYPE)} 
          onToggle={createToggle('projectRecruitTypeList')} 
          type="button" 
          values={filterData.projectRecruitTypeList}
        />
      </FilterWarpper>
      <Divider />
      <FilterWarpper title='모집분야' subText='모집분야'>
        <SelectableGroup 
          items={getCodesByGroup(COMMON_CODE.POSITION_CODE)} 
          onToggle={createToggle('positionCodeList')} 
          type="chip" 
          values={filterData.positionCodeList}
        />
      </FilterWarpper>
      <Divider />
      <FilterWarpper title='요구 능력치' subText='요구 능력치'>
        <SelectableGroup 
          items={getCodesByGroup(COMMON_CODE.POSITION_LEVEL_CODE)} 
          onToggle={createToggle('positionLevelCodeList')} 
          type="button" 
          values={filterData.positionLevelCodeList}
        />
      </FilterWarpper>
      <Divider />
      <FilterWarpper title='기술 스텍' subText='기술 스텍'>
        <AddableChipGroup
          items={getCodesByGroup(COMMON_CODE.SKILL_CODE)} 
          onAdd={clickOpenSkillPopup} 
          onDelete={(value) => {
            setFilter('skillCodeList', filterData.skillCodeList?.filter((item) => item !== value));
          }}
          values={filterData.skillCodeList}
        />
      </FilterWarpper>
      <Divider />
      <FilterWarpper title='진행 기간' subText='진행 기간'>
        <SelectableGroup 
          items={[
            {code: '1', name: '1개월'},
            {code: '3', name: '3개월'},
            {code: '6', name: '6개월'},
          ]} 
          onToggle={createToggle('progressPeriodList')} 
          type="button" 
          values={filterData.progressPeriodList}
        />
      </FilterWarpper>
    </>
  )
}