import { AccessTime, AddCircle, Favorite, FilterAlt, LocationOn, Search } from '@mui/icons-material'
import { Button, Chip, Divider, FormControl, IconButton, InputAdornment, MenuItem, Pagination, Paper, Select, TextField, type SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'
import CustomAvatar from '@/components/CustomAvatar';

export default function ProjectListPage(){
  const [filter, setFilter] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  return (
    <main className='project-page flex-col h-fit'>
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
      <div className='project-summary w-100 align-center justify-between'>
        <strong className='project-count'>전체 <em>23</em>개 프로젝트</strong>
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
          <Paper className='project-box w-100 h-fit flex' elevation={4}>
            <div className='left-area flex-col flex-1'>
              <div className='chip-box align-center'>
                <Chip size='small' color='primary' label='모집중' />
                <Chip 
                  size='small' 
                  label='서울' 
                  icon={
                    <CustomAvatar
                      size={18}
                      sx={{ backgroundColor: '#AEAEAE' }}
                      avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />               
                <Chip size='small' color='error' label='추가모집' />
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
              <strong className='main-text'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집하는 글입니다 많은 참여 부탁드립니다</strong>
              <div className='sub-text flex-col'>
                  <div className='top align-center'>
                      <div className='align-center'>
                          <div className='title flex'><AccessTime />모집기간</div>
                          <p className='flex'>2025.12.03 ~ 2026.02.03</p>
                      </div>
                      <div className='align-center'>
                          <div className='title flex'><AccessTime />진행기간</div>
                          <p>2025.12.03 ~ 2026.02.03</p>
                      </div>
                  </div>
                  <div className='bottom align-center justify-between'>
                      <p className='write-info'>홍길동 . 2025.12.03</p>
                      <p className='view-count'>view 1017</p>
                  </div>
              </div>
            </div>
            <Divider orientation='vertical' />
            <div className='right-area flex-col justify-between'>
              <div className='heart-box flex-col align-end'>
                <IconButton size='small'><Favorite sx={{ fontSize: 24, color: '#D05B5B' }} /></IconButton>
                <p className='heart-count'>206</p>
              </div>
              <div className='chip-box flex-col'>
                <div className='recruit-chip-box align-center flex-wrap'>
                  <Chip variant='outlined' color='primary' size='small' label='서버개발자' />
                  <Chip variant='outlined' color='primary' size='small' label='총괄기획' />
                </div>
                <div className='tech-chip-box align-center flex-wrap'>
                  <Chip variant='outlined' color='secondary' size='small' label='JAVA' />
                  <Chip variant='outlined' color='secondary' size='small' label='ORACLE' />
                  <Chip variant='outlined' color='secondary' size='small' label='JS' />
                </div>
              </div>
            </div>
          </Paper>
          <Paper className='project-box w-100 h-fit flex' elevation={4}>
            <div className='left-area flex-col flex-1'>
              <div className='chip-box align-center'>
                <Chip size='small' color='primary' label='모집중' />
                <Chip 
                  size='small' 
                  label='서울' 
                  icon={
                    <CustomAvatar
                      size={18}
                      sx={{ backgroundColor: '#AEAEAE' }}
                      avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />               
                <Chip size='small' color='error' label='추가모집' />
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
              <strong className='main-text'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집하는 글입니다 많은 참여 부탁드립니다</strong>
              <div className='sub-text flex-col'>
                  <div className='top align-center'>
                      <div className='align-center'>
                          <div className='title flex'><AccessTime />모집기간</div>
                          <p className='flex'>2025.12.03 ~ 2026.02.03</p>
                      </div>
                      <div className='align-center'>
                          <div className='title flex'><AccessTime />진행기간</div>
                          <p>2025.12.03 ~ 2026.02.03</p>
                      </div>
                  </div>
                  <div className='bottom align-center justify-between'>
                      <p className='write-info'>홍길동 . 2025.12.03</p>
                      <p className='view-count'>view 1017</p>
                  </div>
              </div>
            </div>
            <Divider orientation='vertical' />
            <div className='right-area flex-col justify-between'>
              <div className='heart-box flex-col align-end'>
                <IconButton size='small'><Favorite sx={{ fontSize: 24, color: '#D05B5B' }} /></IconButton>
                <p className='heart-count'>206</p>
              </div>
              <div className='chip-box flex-col'>
                <div className='recruit-chip-box align-center flex-wrap'>
                  <Chip variant='outlined' color='primary' size='small' label='서버개발자' />
                  <Chip variant='outlined' color='primary' size='small' label='총괄기획' />
                </div>
                <div className='tech-chip-box align-center flex-wrap'>
                  <Chip variant='outlined' color='secondary' size='small' label='JAVA' />
                  <Chip variant='outlined' color='secondary' size='small' label='ORACLE' />
                  <Chip variant='outlined' color='secondary' size='small' label='JS' />
                </div>
              </div>
            </div>
          </Paper>
          <Paper className='project-box w-100 h-fit flex' elevation={4}>
            <div className='left-area flex-col flex-1'>
              <div className='chip-box align-center'>
                <Chip size='small' color='primary' label='모집중' />
                <Chip 
                  size='small' 
                  label='서울' 
                  icon={
                    <CustomAvatar
                      size={18}
                      sx={{ backgroundColor: '#AEAEAE' }}
                      avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />               
                <Chip size='small' color='error' label='추가모집' />
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
              <strong className='main-text'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집하는 글입니다 많은 참여 부탁드립니다</strong>
              <div className='sub-text flex-col'>
                  <div className='top align-center'>
                      <div className='align-center'>
                          <div className='title flex'><AccessTime />모집기간</div>
                          <p className='flex'>2025.12.03 ~ 2026.02.03</p>
                      </div>
                      <div className='align-center'>
                          <div className='title flex'><AccessTime />진행기간</div>
                          <p>2025.12.03 ~ 2026.02.03</p>
                      </div>
                  </div>
                  <div className='bottom align-center justify-between'>
                      <p className='write-info'>홍길동 . 2025.12.03</p>
                      <p className='view-count'>view 1017</p>
                  </div>
              </div>
            </div>
            <Divider orientation='vertical' />
            <div className='right-area flex-col justify-between'>
              <div className='heart-box flex-col align-end'>
                <IconButton size='small'><Favorite sx={{ fontSize: 24, color: '#D05B5B' }} /></IconButton>
                <p className='heart-count'>206</p>
              </div>
              <div className='chip-box flex-col'>
                <div className='recruit-chip-box align-center flex-wrap'>
                  <Chip variant='outlined' color='primary' size='small' label='서버개발자' />
                  <Chip variant='outlined' color='primary' size='small' label='총괄기획' />
                </div>
                <div className='tech-chip-box align-center flex-wrap'>
                  <Chip variant='outlined' color='secondary' size='small' label='JAVA' />
                  <Chip variant='outlined' color='secondary' size='small' label='ORACLE' />
                  <Chip variant='outlined' color='secondary' size='small' label='JS' />
                </div>
              </div>
            </div>
          </Paper>
          <Paper className='project-box w-100 h-fit flex' elevation={4}>
            <div className='left-area flex-col flex-1'>
              <div className='chip-box align-center'>
                <Chip size='small' color='primary' label='모집중' />
                <Chip 
                  size='small' 
                  label='서울' 
                  icon={
                    <CustomAvatar
                      size={18}
                      sx={{ backgroundColor: '#AEAEAE' }}
                      avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />               
                <Chip size='small' color='error' label='추가모집' />
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
              <strong className='main-text'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집하는 글입니다 많은 참여 부탁드립니다</strong>
              <div className='sub-text flex-col'>
                  <div className='top align-center'>
                      <div className='align-center'>
                          <div className='title flex'><AccessTime />모집기간</div>
                          <p className='flex'>2025.12.03 ~ 2026.02.03</p>
                      </div>
                      <div className='align-center'>
                          <div className='title flex'><AccessTime />진행기간</div>
                          <p>2025.12.03 ~ 2026.02.03</p>
                      </div>
                  </div>
                  <div className='bottom align-center justify-between'>
                      <p className='write-info'>홍길동 . 2025.12.03</p>
                      <p className='view-count'>view 1017</p>
                  </div>
              </div>
            </div>
            <Divider orientation='vertical' />
            <div className='right-area flex-col justify-between'>
              <div className='heart-box flex-col align-end'>
                <IconButton size='small'><Favorite sx={{ fontSize: 24, color: '#D05B5B' }} /></IconButton>
                <p className='heart-count'>206</p>
              </div>
              <div className='chip-box flex-col'>
                <div className='recruit-chip-box align-center flex-wrap'>
                  <Chip variant='outlined' color='primary' size='small' label='서버개발자' />
                  <Chip variant='outlined' color='primary' size='small' label='총괄기획' />
                </div>
                <div className='tech-chip-box align-center flex-wrap'>
                  <Chip variant='outlined' color='secondary' size='small' label='JAVA' />
                  <Chip variant='outlined' color='secondary' size='small' label='ORACLE' />
                  <Chip variant='outlined' color='secondary' size='small' label='JS' />
                </div>
              </div>
            </div>
          </Paper>
          <Paper className='project-box w-100 h-fit flex' elevation={4}>
            <div className='left-area flex-col flex-1'>
              <div className='chip-box align-center'>
                <Chip size='small' color='primary' label='모집중' />
                <Chip 
                  size='small' 
                  label='서울' 
                  icon={
                    <CustomAvatar
                      size={18}
                      sx={{ backgroundColor: '#AEAEAE' }}
                      avatarIcon={<LocationOn sx={{ fontSize: 18, color: '#fff' }} />}
                    />
                  } 
                />               
                <Chip size='small' color='error' label='추가모집' />
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
              <strong className='main-text'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집하는 글입니다 많은 참여 부탁드립니다</strong>
              <div className='sub-text flex-col'>
                  <div className='top align-center'>
                      <div className='align-center'>
                          <div className='title flex'><AccessTime />모집기간</div>
                          <p className='flex'>2025.12.03 ~ 2026.02.03</p>
                      </div>
                      <div className='align-center'>
                          <div className='title flex'><AccessTime />진행기간</div>
                          <p>2025.12.03 ~ 2026.02.03</p>
                      </div>
                  </div>
                  <div className='bottom align-center justify-between'>
                      <p className='write-info'>홍길동 . 2025.12.03</p>
                      <p className='view-count'>view 1017</p>
                  </div>
              </div>
            </div>
            <Divider orientation='vertical' />
            <div className='right-area flex-col justify-between'>
              <div className='heart-box flex-col align-end'>
                <IconButton size='small'><Favorite sx={{ fontSize: 24, color: '#D05B5B' }} /></IconButton>
                <p className='heart-count'>206</p>
              </div>
              <div className='chip-box flex-col'>
                <div className='recruit-chip-box align-center flex-wrap'>
                  <Chip variant='outlined' color='primary' size='small' label='서버개발자' />
                  <Chip variant='outlined' color='primary' size='small' label='총괄기획' />
                </div>
                <div className='tech-chip-box align-center flex-wrap'>
                  <Chip variant='outlined' color='secondary' size='small' label='JAVA' />
                  <Chip variant='outlined' color='secondary' size='small' label='ORACLE' />
                  <Chip variant='outlined' color='secondary' size='small' label='JS' />
                </div>
              </div>
            </div>
          </Paper>
          <div className='list-bottom-box w-100 align-center'>
            <Pagination count={10} showFirstButton showLastButton color='primary' className='w-100 flex-center' />
            <Button size='medium' variant='contained' sx={{ height: '3.6rem !important' }}>글쓰기</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
