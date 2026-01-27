import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import SkillPopup from '@/components/_common/popup/SkillPopup';
import FilterList from '@/components/projects/projectList/FilterList';
import FilterPopup from '@/components/projects/projectList/FilterPopup';
import ProjectCard from '@/components/projects/projectList/ProjectCard';
import { useFormState } from '@/hooks/_common/common.hook';
import { useSelectProjects } from '@/hooks/projects/projects.json.hook';
import type { ProjectSearchRequest } from '@/types/type.projects';
import { FilterAlt } from '@mui/icons-material';
import { Button, FormControl, MenuItem, Pagination, Paper, Select } from '@mui/material';
import { useState } from 'react';

type SearchData = Pick<ProjectSearchRequest, 'page' | 'order' | 'keyword'>;
type FilterData = Omit<ProjectSearchRequest, keyof SearchData>;

export default function ProjectList(){
  // api (개발)
  const initData:SearchData = {
    page:1,
    order:'',
    keyword:'',
  }

  const initFilterData:FilterData = {
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

  const { 
      state:filterData, 
      setState:setFilterData, 
      createHandler, 
      reset
    } = useFormState<FilterData>(initFilterData);

  const { 
      state:searchData,
      handleChange:handleRequestChange, 
    } = useFormState<SearchData>(initData);

  const [searchRequest, setSearchRequest] = useState<ProjectSearchRequest>(initData);

  const [openSkillPopup, setOpenSkillPopup] = useState(false);
  const [openFilterPopup, setOpenFilterPopup] = useState(false);

  const clickOpenSkillPopup = () => setOpenSkillPopup(true);
  const clickOpenFilterPopup = () => setOpenFilterPopup(true);

  const { res, loading } = useSelectProjects(searchRequest);

  const handleSubmit = () => {
    setSearchRequest({...searchData, ...filterData});
  }

  const handleFilterPopupSubmit = (state:FilterData) => {
    setFilterData({...state});
    setSearchRequest({...searchData, ...state});
  }

  return (
    <main className='main-page flex-col h-fit'>

      <Paper className='search-box align-stretch' elevation={4}>
        <CustomTextfield size='small' type='search' placeholder='프로젝트 명을 입력해 주세요.' value={searchData.keyword} onChange={(e)=>{handleRequestChange('keyword', e.target.value)}}/>
        <Button size='medium' variant='contained'>검색</Button>
      </Paper>

      <div className='page-summary w-100 align-center justify-between'>
        <strong className='page-count'>전체 <em>{res?.pagination?.totalElements}</em>개 프로젝트</strong>
        <FormControl variant='standard'>
          <Select id='filter' value={searchData.order} onChange={(e)=>{handleRequestChange('order', e.target.value)}} size='small' displayEmpty>
            <MenuItem value=''>기본순</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className='project-list-box wh-100 flex flex-1'>
        <Paper className='left-filter-bar flex-col flex-grow' elevation={4}>
          <FilterList
            filterData={filterData} 
            clickOpenSkillPopup={clickOpenSkillPopup} 
            handleResetFilter={reset} 
            createHandler={createHandler}
          />
          <div className='filter-button-box w-100 align-center'>
              <Button className='flex-1' size='small' variant='outlined' startIcon={<FilterAlt />} onClick={clickOpenFilterPopup}>상세 필터</Button>
              <Button className='flex-1' size='small' variant='contained' onClick={handleSubmit}>필터 적용</Button>
          </div>
        </Paper>

        <div className='project-list flex-col align-center'>
          {res?.dataList?.map((item, index)=>{
            return <ProjectCard key={index} {...item}></ProjectCard>
          })}
          <div className='list-bottom-box w-100 align-center mt-a'>
            <Pagination page={searchData.page} count={res?.pagination?.totalPages} onChange={(_, v)=>{handleRequestChange('page', v)}} color='primary' className='w-100 flex-center' showFirstButton showLastButton/>
            <Button size='medium' variant='contained' sx={{ height: '3.6rem !important' }}>글쓰기</Button>
          </div>
        </div>
      </div>
      <SkillPopup isOpen={openSkillPopup} setOpen={setOpenSkillPopup} values={filterData.skillCodeList} setValues={createHandler('skillCodeList')}/>
      <FilterPopup isOpen={openFilterPopup} setOpen={setOpenFilterPopup} initialValue={filterData} onSubmit={handleFilterPopupSubmit}/>
    </main>
  )
}