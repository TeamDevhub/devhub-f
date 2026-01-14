import { AccessTime, AddCircle, Favorite, FilterAlt, Search } from '@mui/icons-material'
import { Button, Chip, Divider, FormControl, IconButton, InputAdornment, MenuItem, Pagination, Paper, Select, TextField, type SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'
import CustomAvatar from '@/components/CustomAvatar';
import type { ProjectCardProps } from '@/types/ProjectTypes';
import { ProgressRegionChip, RecruitmentChip } from './design/ProjectChips';

//개발용 json 파일
import jsonData from '@/assets/jsonData/projectsPage/projectListApi.json'

export default function ProjectListPage(){

  // project summary select
  const [filter, setFilter] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  // json data
  const { dataList } = jsonData;

  return (
    <main className='main-page flex-col h-fit'>
      {/* 1. search field */}
      <Paper className='search-box align-center' elevation={4}>
        <TextField 
          size='small' fullWidth 
          placeholder='프로젝트 명을 입력해 주세요.'
          slotProps={{ input: { startAdornment: (<InputAdornment position='start'><Search sx={{ fontSize: 24 }}></Search></InputAdornment>) } }}    
        />
          <Button size='medium' variant='contained'>검색</Button>
      </Paper>
      {/* 2. project summary */}
      <div className='page-summary w-100 align-center justify-between'>
        <strong className='page-count'>전체 <em>23</em>개 프로젝트</strong>
        <FormControl variant='standard'>
          <Select 
            id='filter' value={filter} onChange={handleChange} size='small' displayEmpty
            renderValue={(selected) => selected === '' ? '기본순' : selected }
          >
            <MenuItem value=''>None</MenuItem>
          </Select>
        </FormControl>
      </div>
      {/* 3. project list */}
      <div className='project-list-box wh-100 flex flex-1'>
        {/* 3. filter area */}
        <Paper className='left-filter-bar flex-col flex-grow' elevation={4}>
          <div className='filter-box flex-col'>
            <div className='filter-title align-start justify-between'>
              <div className='text-box flex-col'>
                <strong>필터</strong>
                <p>원하는 조건으로 검색하세요.</p>
              </div>
              <Button size='small' variant='text'>초기화</Button>
            </div>
            <div className='filter-options align-center flex-wrap'>
              <Button size='small' variant='contained'>전체</Button>
              <Button size='small' variant='outlined'>모집중</Button>
              <Button size='small' variant='outlined'>진행중</Button>
              <Button size='small' variant='outlined'>모집완료</Button>
              <Button size='small' variant='outlined'>추가모집</Button>
            </div>
          </div>
          <Divider />
          <div className='filter-box flex-col'>
              <div className='filter-title align-start justify-between'>
                  <div className='text-box flex-col'>
                      <strong>모집분야</strong>
                      <p>원하는 조건으로 검색하세요.</p>
                  </div>
              </div>
              <div className='filter-options align-center flex-wrap'>
                  <Chip size='small' variant='filled' label='Backend' clickable />
                  <Chip size='small' variant='filled' label='Frontend' color='primary' clickable />
                  <Chip size='small' variant='filled' label='Fullstack' clickable />
                  <Chip size='small' variant='filled' label='Mobile' clickable />
                  <Chip size='small' variant='filled' label='DevOps Engineer' color='primary' clickable />
                  <Chip size='small' variant='filled' label='Cloud Engineer' clickable />
                  <Chip size='small' variant='filled' label='SRE' color='primary' clickable />
                  <Chip size='small' variant='filled' label='UI/UX Designer' clickable />
                  <Chip size='small' variant='filled' label='PM(Project/Product Manager)' color='primary' clickable />
              </div>
          </div>
          <Divider />
          <div className='filter-box flex-col'>
              <div className='filter-title align-start justify-between'>
                  <div className='text-box flex-col'>
                      <strong>요구 능력치</strong>
                      <p>원하는 조건으로 검색하세요.</p>
                  </div>
              </div>
              <div className='filter-options align-center flex-wrap'>
                  <Button size='small' variant='contained'>상</Button>
                  <Button size='small' variant='outlined'>중</Button>
                  <Button size='small' variant='outlined'>하</Button>
              </div>
          </div>
          <Divider />
          <div className='filter-box flex-col'>
              <div className='filter-title align-start justify-between'>
                  <div className='text-box flex-col'>
                      <strong>기술스텍</strong>
                      <p>원하는 조건으로 검색하세요.</p>
                  </div>
              </div>
              <div className='filter-options align-center flex-wrap'>
                  <Chip size='small' variant='filled' label='JAVA' color='primary' onDelete={() => {}} />
                  <Chip size='small' variant='filled' label='React' color='primary' clickable onDelete={() => {}} />
                  <Chip size='small' variant='filled' label='GO' color='primary' clickable onDelete={() => {}} />
                  <Chip size='small' variant='filled' label='SQL' color='primary' clickable onDelete={() => {}} />
                  <Chip size='small' variant='filled' label='Docker' color='primary' clickable onDelete={() => {}} />
                  <Chip size='small' variant='filled' label='git' color='primary' clickable onDelete={() => {}} />
                  <IconButton size='small'><AddCircle sx={{ fontSize: 24, color: 'primary.main' }} /></IconButton>
              </div>
          </div>
          <Divider />
          <div className='filter-box flex-col'>
              <div className='filter-title align-start justify-between'>
                  <div className='text-box flex-col'>
                      <strong>진행기간</strong>
                      <p>원하는 조건으로 검색하세요.</p>
                  </div>
              </div>
              <div className='filter-options align-center flex-wrap'>
                  <Button size='small' variant='contained'>1개월</Button>
                  <Button size='small' variant='outlined'>3개월</Button>
                  <Button size='small' variant='outlined'>6개월</Button>
              </div>
          </div>
          <div className='filter-button-box w-100 align-center'>
              <Button className='flex-1' size='small' variant='outlined' startIcon={<FilterAlt />}>상세 필터</Button>
              <Button className='flex-1' size='small' variant='contained'>필터 적용</Button>
          </div>
        </Paper>
        {/* 4. project list */}
        <div className='project-list flex-col align-center'>
          {dataList.map((item)=>{
            return <ProjectCard projectData={item}></ProjectCard>
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

function ProjectCard({projectData} : ProjectCardProps){
  const {
    category, 
    title, 
    recruitmentStartDate, // 모집기간 시작일
    recruitmentEndDate, // 모집기간 마감일
    progressStartDate, // 진행기간 시작일
    progressEndDate, // 진행기간 마감일
    username, 
    regDt, // 작성일
    viewCount,
    likeCount,
    recruitmentType, // 모집유형
    prgressRegion
  } = projectData;

 return (
  <Paper className='project-box w-100 h-fit flex' elevation={4}>
    <div className='left-area flex-col flex-1'>
      <div className='chip-box align-center'>
        <Chip size='small' color='primary' label='모집중' />
        <ProgressRegionChip region={prgressRegion} />       
        <RecruitmentChip recruitmentType={recruitmentType} />
        <Chip 
          size='small' 
          color='warning' 
          label='D-13' 
          icon={
            <CustomAvatar 
              size={18}
              sx={{ backgroundColor: '#E65100' }}
              avatarIcon={<AccessTime sx={{ fontSize: 18, color: '#fff' }} />}
            />
          }
        />
      </div>
      <strong className='main-text text-ellipsis'>{category} {title}</strong>
      <div className='sub-text flex-col'>
          <div className='top align-center'>
              <div className='align-center'>
                  <div className='title flex'><AccessTime />모집기간</div>
                  <p className='flex'>{recruitmentStartDate} ~ {recruitmentEndDate}</p>
              </div>
              <div className='align-center'>
                  <div className='title flex'><AccessTime />진행기간</div>
                  <p>{progressStartDate} ~ {progressEndDate}</p>
              </div>
          </div>
          <div className='bottom align-center justify-between'>
            <p className='write-info'>{username} . {regDt}</p>
            <p className='view-count'>view {viewCount}</p>
          </div>
      </div>
    </div>
    <Divider orientation='vertical' />
    <div className='right-area flex-col justify-between'>
      <div className='heart-box flex-col align-end'>
        <IconButton size='small'><Favorite sx={{ fontSize: 24, color: '#D05B5B' }} /></IconButton>
        <p className='heart-count'>{likeCount}</p>
      </div>
      <div className='chip-box flex-col'>
        {/* 문제점: css만으로는 넘치는 chip을 깔끔하게 자를 수 없음 js 처리해야함 */}
        <div className='recruit-chip-box align-center'>
          <Chip variant='outlined' color='primary' size='small' label='서버개발자' />
          <Chip variant='outlined' color='primary' size='small' label='총괄기획' />
          <Chip variant='outlined' color='primary' size='small' label='웹퍼블리셔' />
          <Chip variant='outlined' color='primary' size='small' label='디자이너' />
        </div>
        <div className='tech-chip-box align-center flex-wrap'>
          <Chip variant='outlined' color='secondary' size='small' label='JAVA' />
          <Chip variant='outlined' color='secondary' size='small' label='ORACLE' />
          <Chip variant='outlined' color='secondary' size='small' label='JS' />
        </div>
      </div>
    </div>
  </Paper>
 )
}