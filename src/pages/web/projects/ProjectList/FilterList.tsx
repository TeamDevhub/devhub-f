import { COMMON_CODE } from "@/types/common.type";
import { Button, Divider } from "@mui/material";
import FilterBox from "./FilterBox";
import type { ProjectSearchRequest } from "@/api/projects/projects.type";

type SearchData = Pick<ProjectSearchRequest, 'page' | 'order' | 'keyword'>;
type FilterData = Omit<ProjectSearchRequest, keyof SearchData>;

export default function FilterList({
  filterData,
  handleResetFilter,
  createHandler,
  clickOpenSkillPopup
}:{
  filterData:FilterData;
  createHandler: (key: keyof FilterData) => (newCodes: string[]) => void
  handleResetFilter: () => void;
  clickOpenSkillPopup: () => void;
}){
  return (
    <>
      <Button className='reset-btn' size='small' variant='text' onClick={handleResetFilter}>초기화</Button>
      <FilterBox
        title='필터'
        subText='원하는 조건으로 검색하세요'
        type='button'
        codeName={COMMON_CODE.PROJECT_RECRUIT_STATUS}
        values={filterData.projectRecruitStatusList}
        setValues={createHandler('projectRecruitStatusList')}
      />
      <Divider />
      <FilterBox
        title='모집구분'
        subText='모집구분'
        type='button'
        codeName={COMMON_CODE.PROJECT_RECRUIT_TYPE}
        values={filterData.projectRecruitTypeList}
        setValues={createHandler('projectRecruitTypeList')}
      />
      <Divider />
      <FilterBox
        title='모집분야'
        subText='모집분야'
        type='chip'
        codeName={COMMON_CODE.POSITION_CODE}
        values={filterData.positionCodeList}
        setValues={createHandler('positionCodeList')}
      />
      <Divider />
      <FilterBox
        title='요구 능력치'
        subText='요구 능력치'
        type='button'
        codeName={COMMON_CODE.POSITION_LEVEL_CODE}
        values={filterData.positionLevelCodeList}
        setValues={createHandler('positionLevelCodeList')}
      />
      <Divider />
      <FilterBox
        title='기술 스텍'
        subText='기술 스텍'
        type='addableChip'
        codeName={COMMON_CODE.SKILL_CODE}
        values={filterData.skillCodeList}
        setValues={createHandler('skillCodeList')}
        onClickAddBtn={clickOpenSkillPopup}
      />
      <Divider />
      <FilterBox
        title='진행 기간'
        subText='진행 기간'
        type='button'
        options={[
          {code: '1', name: '1개월'},
          {code: '3', name: '3개월'},
          {code: '6', name: '6개월'},
        ]}
        values={filterData.progressPeriodList}
        setValues={createHandler('progressPeriodList')}
      />
    </>
  )
}