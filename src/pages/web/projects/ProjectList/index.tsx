import React, { useState } from 'react'
import { FilterAlt } from '@mui/icons-material'
import { Button, Divider, FormControl, MenuItem, Pagination, Paper, Select, type ButtonProps, type SelectChangeEvent } from '@mui/material'
import { useSelectProjects } from '@/api/projects/projects.json.hook';
import CustomTextfield from '@/components/common/CustomTextfield';
import ProjectCard from './ProjectCard';
import FilterBox from './FilterBox';
import { COMMON_CODE } from '@/types/common.type';

export default function ProjectListPage(){
  // api (개발)
  const [filter, setFilter] = useState('');
  const [skillCode, setSkillCode] = useState<string[]>([]);
  const [positionCode, setPositionCode] = useState<string[]>([]);
  const [progressPeriod, setProgressPeriod] = useState<string[]>([]);
  const [positionLevelCode, setPositionLevelCode] = useState<string[]>([]);
  const [projectRecruitType, setProjectRecruitType] = useState<string[]>([]);
  const [projectRecruitStatus, setProjectRecruitStatus] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  const { res, loading, refetch } = useSelectProjects({});

  return (
    <main className='main-page flex-col h-fit'>

      <Paper className='search-box align-center' elevation={4}>
        <CustomTextfield size='small' type='search' placeholder='프로젝트 명을 입력해 주세요.' />
        <Button size='medium' variant='contained'>검색</Button>
      </Paper>

      <div className='page-summary w-100 align-center justify-between'>
        <strong className='page-count'>전체 <em>{res?.pagination?.totalElements}</em>개 프로젝트</strong>
        <FormControl variant='standard'>
          <Select 
            id='filter' value={filter} onChange={handleChange} size='small' displayEmpty
            renderValue={(selected) => selected === '' ? '기본순' : selected }
          >
            <MenuItem value=''>None</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className='project-list-box wh-100 flex flex-1'>
        <Paper className='left-filter-bar flex-col flex-grow' elevation={4}>
          <Button size='small' variant='text'>초기화</Button>
          <FilterBox
            title='필터'
            subText='원하는 조건으로 검색하세요'
            type='button'
            codeName={COMMON_CODE.PROJECT_RECRUIT_STATUS}
            values={projectRecruitStatus}
            setValues={setProjectRecruitStatus}
          />
          <Divider />
          <FilterBox
            title='모집구분'
            subText='모집구분'
            type='button'
            codeName={COMMON_CODE.PROJECT_RECRUIT_TYPE}
            values={projectRecruitType}
            setValues={setProjectRecruitType}
          />
          <Divider />
          <FilterBox
            title='모집분야'
            subText='모집분야'
            type='chip'
            codeName={COMMON_CODE.POSITION_CODE}
            values={positionCode}
            setValues={setPositionCode}
          />
          <Divider />
          <FilterBox
            title='요구 능력치'
            subText='요구 능력치'
            type='button'
            codeName={COMMON_CODE.POSITION_LEVEL_CODE}
            values={positionLevelCode}
            setValues={setPositionLevelCode}
          />
          <Divider />
          <FilterBox
            title='기술 스텍'
            subText='기술 스텍'
            type='addableChip'
            codeName={COMMON_CODE.SKILL_CODE}
            values={skillCode}
            setValues={setSkillCode}
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
            values={progressPeriod}
            setValues={setProgressPeriod}
          />
          <div className='filter-button-box w-100 align-center'>
              <Button className='flex-1' size='small' variant='outlined' startIcon={<FilterAlt />}>상세 필터</Button>
              <Button className='flex-1' size='small' variant='contained'>필터 적용</Button>
          </div>
        </Paper>

        <div className='project-list flex-col align-center'>
          {res?.dataList?.map((item)=>{
            return <ProjectCard {...item}></ProjectCard>
          })}
          <div className='list-bottom-box w-100 align-center mt-a'>
            <Pagination count={10} showFirstButton showLastButton color='primary' className='w-100 flex-center' />
            <Button size='medium' variant='contained' sx={{ height: '3.6rem !important' }}>글쓰기</Button>
          </div>
        </div>
      </div>
    </main>
  )
}