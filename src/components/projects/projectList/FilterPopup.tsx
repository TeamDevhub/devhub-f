import RegionPopup from "@/components/_common/popup/RegionPopup";
import SkillPopup from "@/components/_common/popup/SkillPopup";
import WebPopup from "@/components/_common/popup/WebPopup";
import { useFormState } from "@/hooks/_common/common.hook";
import { useDisclosure } from "@/hooks/_common/useDisclosure";
import { COMMON_CODE } from "@/types/const";
import type { FilterData } from "@/types/type.projects";
import { Divider } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect } from "react";
import FilterBox, { FilterWarpper } from "./FilterBox";
import FilterList from "./FilterList";

export default function FilterPopup({
  isOpen,
  onSubmit,
  onClose,
  initialValue,
}:{
  isOpen:boolean;
  onSubmit:(state:FilterData)=>void;
  initialValue:FilterData,
  onClose?:()=>void;
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

  const skillPopup = useDisclosure();
  const regionPopup = useDisclosure();

  const reset = () => setState({});
  
  const handleSubmit = () => {
    onSubmit(state);
  }
  const handleClose = () => {
    setState(initialValue);
    onClose && onClose();
  }

  return (
    <>
    <WebPopup
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={handleClose}
      title='상태 필터'
      submitText='적용'
    >
      <div className='left-filter-bar flex-col flex-grow' style={{width:'100%'}}>
        <FilterList
          filterData={state} 
          clickOpenSkillPopup={skillPopup.open} 
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
          onClickAddBtn={regionPopup.open}
        />
      </div>
    </WebPopup>
    <SkillPopup isOpen={skillPopup.isOpen} onClose={skillPopup.close} values={state.skillCodeList} setValues={createHandler('skillCodeList')}/>
    <RegionPopup isOpen={regionPopup.isOpen} onClose={regionPopup.close} values={state.regionCodeList} setValues={createHandler('regionCodeList')} multiple/>
    </>
  )
}