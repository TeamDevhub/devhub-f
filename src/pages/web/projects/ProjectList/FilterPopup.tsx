import type { ProjectSearchRequest } from "@/api/projects/projects.type";
import RegionPopup from "@/components/popup/RegionPopup";
import SkillPopup from "@/components/popup/SkillPopup";
import WebPopup from "@/components/popup/WebPopup";
import { useFormState } from "@/hooks/common.hook";
import { COMMON_CODE } from "@/types/common.type";
import { Divider } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import FilterBox, { FilterWarpper } from "./FilterBox";
import FilterList from "./FilterList";

type SearchData = Pick<ProjectSearchRequest, 'page' | 'order' | 'keyword'>;
type FilterData = Omit<ProjectSearchRequest, keyof SearchData>;

export default function FilterPopup({
  isOpen,
  setOpen,
  onSubmit,
  initialValue,
}:{
  isOpen:boolean;
  setOpen:(open:boolean)=>void;
  onSubmit:(state:FilterData)=>void;
  initialValue:FilterData,
}){

  const { 
    state,
    setState,
    handleChange, 
    createHandler, 
  } = useFormState<FilterData>(initialValue);

  useEffect(() => {
    setState(initialValue);
  }, [initialValue]);

  const [openSkillPopup, setOpenSkillPopup] = useState(false);
  const [openRegionPopup, setOpenRegionPopup] = useState(false);

  const clickOpenSkillPopup = () => setOpenSkillPopup(true);
  const clickOpenRegionPopup = () => setOpenRegionPopup(true);

  const reset = () => setState({});
  const handleSubmit = () => onSubmit(state);
  const handleClose = () => setState(initialValue);

  return (
    <>
    <WebPopup
      isOpen={isOpen}
      setOpen={setOpen}
      onSubmit={handleSubmit}
      onClose={handleClose}
      title='상태 필터'
      submitText='적용'
    >
      <div className='left-filter-bar flex-col flex-grow' style={{width:'100%'}}>
        <FilterList
          filterData={state} 
          clickOpenSkillPopup={clickOpenSkillPopup} 
          handleResetFilter={reset} 
          createHandler={createHandler}
        />
        <Divider />
        <FilterWarpper title='모집기간' subText='모집기간'>
          <div className='align-center gap-4 w-100'>
            <DatePicker 
              slotProps={{textField: {size: 'small'},}}
              value={state.recruitmentStartDate}
              onChange={(newValue) => handleChange('recruitmentStartDate', newValue)}
            />
            <p>~</p>
            <DatePicker
              slotProps={{textField: {size: 'small'},}}
              value={state.recruitmentEndDate}
              onChange={(newValue) => handleChange('recruitmentEndDate', newValue)}
            />
          </div>
        </FilterWarpper>
        <Divider />
        <FilterWarpper title='프로젝트 시작 일자' subText='프로젝트 시작 일자'>
          <DatePicker 
            slotProps={{textField: {size: 'small'},}}
            value={state.progressStartDate}
            onChange={(newValue) => handleChange('progressStartDate', newValue)}
          />
        </FilterWarpper>
        <Divider />
        <FilterBox
          title='진행방식'
          subText='진행방식'
          type='button'
          codeName={COMMON_CODE.PROJECT_PROGRESS_TYPE}
          values={state.projectProgressTypeList}
          setValues={createHandler('projectProgressTypeList')}
        />
        <Divider />
        <FilterBox
          title='진행지역'
          subText='진행지역'
          type='addableChip'
          codeName={COMMON_CODE.REGION_CODE}
          values={state.regionCodeList}
          setValues={createHandler('regionCodeList')}
          onClickAddBtn={clickOpenRegionPopup}
        />
      </div>
    </WebPopup>
    <SkillPopup isOpen={openSkillPopup} setOpen={setOpenSkillPopup} values={state.skillCodeList} setValues={createHandler('skillCodeList')}/>
    <RegionPopup isOpen={openRegionPopup} setOpen={setOpenRegionPopup} values={state.regionCodeList} setValues={createHandler('regionCodeList')} multiple/>
    </>
  )
}