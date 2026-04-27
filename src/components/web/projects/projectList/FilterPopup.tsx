import AddableChipGroup from "@/components/_common/AddableChipGroup";
import RegionPopup from "@/components/_common/popup/RegionPopup";
import SkillPopup from "@/components/_common/popup/SkillPopup";
import WebPopup from "@/components/_common/popup/WebPopup";
import SelectableGroup from "@/components/_common/SelectableGroup";
import useFormState from "@/hooks/_common/useFormState.ts";
import useDisclosure from "@/hooks/_common/useDisclosure";
import {COMMON_CODE} from "@/types/const";
import type {FilterData} from "@/types/type.projects";
import {Divider} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import FilterWarpper from "./FilterWarpper";
import FilterList from "./FilterList";
import {useCodes} from "@/contexts/CommonCodeContext.ts";

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

  const {getCodesByGroup} = useCodes();

  const { 
    state,
    setState,
    handleChange,
    createHandler, 
    createToggle,
  } = useFormState<FilterData>(initialValue);

  const skillPopup = useDisclosure();
  const regionPopup = useDisclosure();

  const reset = () => setState({});
  
  const handleSubmit = () => {
    onSubmit(state);
  }
  const handleClose = () => {
    setState(initialValue);
    onClose?.();
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
          setFilter={handleChange}
          createToggle={createToggle}
        />
        <Divider />
        <FilterWarpper title='모집기간' subText='모집기간'>
          <div className='align-center gap-4 w-100'>
            <DatePicker 
              slotProps={{textField: {size: 'small'},}}
              value={state.recruitmentStartDate}
              onChange={(newValue) => handleChange('recruitmentStartDate', newValue)}
              sx={{
                '& legend': { display: 'none' },
                '& fieldset': { top: 0 },
              }}
            />
            <p>~</p>
            <DatePicker
              slotProps={{textField: {size: 'small'},}}
              value={state.recruitmentEndDate}
              onChange={(newValue) => handleChange('recruitmentEndDate', newValue)}
              sx={{
                '& legend': { display: 'none' },
                '& fieldset': { top: 0 },
              }}
            />
          </div>
        </FilterWarpper>
        <Divider />
        <FilterWarpper title='프로젝트 시작 일자' subText='프로젝트 시작 일자'>
          <DatePicker 
            slotProps={{textField: {size: 'small'},}}
            value={state.progressStartDate}
            onChange={(newValue) => handleChange('progressStartDate', newValue)}
            sx={{
              '& legend': { display: 'none' },
              '& fieldset': { top: 0 },
            }}
          />
        </FilterWarpper>
        <Divider />
        <FilterWarpper title='진행방식' subText='진행방식'>
          <SelectableGroup
            items={getCodesByGroup(COMMON_CODE.PROJECT_PROGRESS_TYPE)} 
            onToggle={createToggle('projectProgressTypeList')} 
            type="button" 
            values={state.projectProgressTypeList}
          />
        </FilterWarpper>
        <FilterWarpper title='진행지역' subText='진행지역'>
          <AddableChipGroup
            CodeName={COMMON_CODE.REGION_CODE}
            onAdd={regionPopup.open} 
            onDelete={(value) => {
              handleChange('regionCodeList', state.regionCodeList?.filter((item) => item !== value));
            }}
            values={state.regionCodeList}
          />
        </FilterWarpper>
      </div>
    </WebPopup>
    <SkillPopup isOpen={skillPopup.isOpen} onClose={skillPopup.close} values={state.skillCodeList} setValues={createHandler('skillCodeList')}/>
    <RegionPopup isOpen={regionPopup.isOpen} onClose={regionPopup.close} values={state.regionCodeList} setValues={createHandler('regionCodeList')} multiple/>
    </>
  )
}