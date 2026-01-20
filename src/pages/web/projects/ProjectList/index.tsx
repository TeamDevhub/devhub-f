import React, { useState } from 'react'
import { FilterAlt } from '@mui/icons-material'
import { Button, Divider, FormControl, MenuItem, Pagination, Paper, Select, TextField, type SelectChangeEvent } from '@mui/material'
import { useSelectProjects } from '@/api/projects/projects.json.hook';
import CustomTextfield from '@/components/common/CustomTextfield';
import ProjectCard from './ProjectCard';
import FilterBox, { FilterWarpper } from './FilterBox';
import { COMMON_CODE } from '@/types/common.type';
import type { ProjectSearchRequest } from '@/api/projects/projects.type';
import SkillPopup from '@/components/popup/SkillPopup';
import WebPopup from '@/components/popup/WebPopup';
import { DatePicker } from '@mui/x-date-pickers';
import type { Dayjs } from "dayjs";

export default function ProjectListPage(){
  // api (개발)
  const initData:ProjectSearchRequest = {
    page:1,
    order:'',
    keyword:'',
    skillCodeList:[],
    regionCodeList:[],
    positionCodeList:[],
    progressPeriodList:[],
    positionLevelCodeList:[],
    projectRecruitTypeList:[],
    projectProgressTypeList:[],
    projectRecruitStatusList:[],
    recruitmentStartDate: null,
    recruitmentEndDate: null,
    progressStartDate: null,
  }
  const [searchData, setSearchData] = useState<ProjectSearchRequest>(initData);

  const [openSkillPopup, setOpenSkillPopup] = useState(false);
  const [openFilterPopup, setOpenFilterPopup] = useState(false);
  const [openRegionPopup, setOpenRegionPopup] = useState(false);

  const clickOpenSkillPopup = () => setOpenSkillPopup(true);
  const clickOpenFilterPopup = () => setOpenFilterPopup(true);
  const clickOpenRegionPopup = () => setOpenRegionPopup(true);


  const { res, loading, refetch } = useSelectProjects(searchData);
  
  const handleResetFilter = () => setSearchData(initData);
  
  const handleReturnStateChange = (key: keyof typeof searchData) => {
    return (newCodes: string[]) => {
      setSearchData(prev => ({
        ...prev,
        [key]: newCodes
      }));
    };
  }

  const handleStateChange = <K extends keyof typeof searchData>(key: K, newValue: (typeof searchData)[K]) => {
    setSearchData(prev => ({
      ...prev,
      [key]: newValue,
    }));
  };

  return (
    <main className='main-page flex-col h-fit'>

      <Paper className='search-box align-stretch' elevation={4}>
        <CustomTextfield size='small' type='search' placeholder='프로젝트 명을 입력해 주세요.' />
        <Button size='medium' variant='contained'>검색</Button>
      </Paper>

      <div className='page-summary w-100 align-center justify-between'>
        <strong className='page-count'>전체 <em>{res?.pagination?.totalElements}</em>개 프로젝트</strong>
        <FormControl variant='standard'>
          <Select id='filter' value={searchData.order} onChange={(e)=>{handleStateChange('order', e.target.value);}} size='small' displayEmpty>
            <MenuItem value=''>기본순</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className='project-list-box wh-100 flex flex-1'>
        <Paper className='left-filter-bar flex-col flex-grow' elevation={4}>
          <FilterList 
            searchData={searchData} 
            clickOpenSkillPopup={clickOpenSkillPopup} 
            handleResetFilter={handleResetFilter} 
            handleReturnStateChange={handleReturnStateChange}
          />
          <div className='filter-button-box w-100 align-center'>
              <Button className='flex-1' size='small' variant='outlined' startIcon={<FilterAlt />} onClick={clickOpenFilterPopup}>상세 필터</Button>
              <Button className='flex-1' size='small' variant='contained' onClick={refetch}>필터 적용</Button>
          </div>
        </Paper>

        <div className='project-list flex-col align-center'>
          {res?.dataList?.map((item, index)=>{
            return <ProjectCard key={index} {...item}></ProjectCard>
          })}
          <div className='list-bottom-box w-100 align-center mt-a'>
            <Pagination page={searchData.page} count={res?.pagination?.totalPages} color='primary' className='w-100 flex-center' showFirstButton showLastButton/>
            <Button size='medium' variant='contained' sx={{ height: '3.6rem !important' }}>글쓰기</Button>
          </div>
        </div>
      </div>
      <SkillPopup isOpen={openSkillPopup} setOpen={setOpenSkillPopup} values={searchData.skillCodeList} setValues={handleReturnStateChange('skillCodeList')}/>
      <WebPopup
        isOpen={openFilterPopup}
        setOpen={setOpenFilterPopup}
        onSubmit={refetch}
        title='상태 필터'
        submitText='적용'
      >
        <div className='left-filter-bar flex-col flex-grow' style={{width:'100%'}}>
          <FilterList 
            searchData={searchData} 
            clickOpenSkillPopup={clickOpenSkillPopup} 
            handleResetFilter={handleResetFilter} 
            handleReturnStateChange={handleReturnStateChange}
          />
          <Divider />
          <FilterWarpper title='모집기간' subText='모집기간'>
            <DatePicker 
              slotProps={{textField: {size: 'small'},}}
              value={searchData.recruitmentStartDate}
              onChange={(newValue) => handleStateChange('recruitmentStartDate', newValue)}
            />
            <p>~</p>
            <DatePicker 
              slotProps={{textField: {size: 'small'},}}
              value={searchData.recruitmentEndDate}
              onChange={(newValue) => handleStateChange('recruitmentEndDate', newValue)}
            />
          </FilterWarpper>
          <Divider />
          <FilterWarpper title='프로젝트 시작 일자' subText='프로젝트 시작 일자'>
            <DatePicker 
              slotProps={{textField: {size: 'small'},}}
              value={searchData.progressStartDate}
              onChange={(newValue) => handleStateChange('progressStartDate', newValue)}
            />
          </FilterWarpper>
          <Divider />
          <FilterBox
            title='진행방식'
            subText='진행방식'
            type='button'
            codeName={COMMON_CODE.PROJECT_PROGRESS_TYPE}
            values={searchData.projectProgressTypeList}
            setValues={handleReturnStateChange('projectProgressTypeList')}
          />
          <Divider />
          <FilterBox
            title='진행지역'
            subText='진행지역'
            type='addableChip'
            codeName={COMMON_CODE.REGION_CODE}
            values={searchData.regionCodeList}
            setValues={handleReturnStateChange('regionCodeList')}
            onClickAddBtn={clickOpenRegionPopup}
          />
        </div>
      </WebPopup>
    </main>
  )
}

function FilterList({
  searchData,
  handleResetFilter,
  handleReturnStateChange,
  clickOpenSkillPopup
}:{
  searchData:ProjectSearchRequest;
  handleReturnStateChange: (key: keyof ProjectSearchRequest) => (newCodes: string[]) => void
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
        values={searchData.projectRecruitStatusList}
        setValues={handleReturnStateChange('projectRecruitStatusList')}
      />
      <Divider />
      <FilterBox
        title='모집구분'
        subText='모집구분'
        type='button'
        codeName={COMMON_CODE.PROJECT_RECRUIT_TYPE}
        values={searchData.projectRecruitTypeList}
        setValues={handleReturnStateChange('projectRecruitTypeList')}
      />
      <Divider />
      <FilterBox
        title='모집분야'
        subText='모집분야'
        type='chip'
        codeName={COMMON_CODE.POSITION_CODE}
        values={searchData.positionCodeList}
        setValues={handleReturnStateChange('positionCodeList')}
      />
      <Divider />
      <FilterBox
        title='요구 능력치'
        subText='요구 능력치'
        type='button'
        codeName={COMMON_CODE.POSITION_LEVEL_CODE}
        values={searchData.positionLevelCodeList}
        setValues={handleReturnStateChange('positionLevelCodeList')}
      />
      <Divider />
      <FilterBox
        title='기술 스텍'
        subText='기술 스텍'
        type='addableChip'
        codeName={COMMON_CODE.SKILL_CODE}
        values={searchData.skillCodeList}
        setValues={handleReturnStateChange('skillCodeList')}
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
        values={searchData.progressPeriodList}
        setValues={handleReturnStateChange('progressPeriodList')}
      />
    </>
  )
}