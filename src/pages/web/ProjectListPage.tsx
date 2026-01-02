import { AccessTime, AddCircle, Favorite, FilterAlt, LocationOn, Notifications, Person, Search } from '@mui/icons-material'
import { Avatar, Badge, Button, Chip, Divider, FormControl, IconButton, InputAdornment, MenuItem, Pagination, Paper, Select, TextField, type SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'

export default function ProjectListPage() {
    const [filter, setFilter] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setFilter(event.target.value);
    };

  return (
        <div id='devHub'>
            {/* header */}
            <header>
                <Paper className='header' elevation={1}>
                    <div className="header-left-box">
                        <h1 className="logo-box">
                            <a href="/">
                                <img
                                    src="/images/devHub-logo.png"
                                    alt="devHub logo icon"
                                    className="logo-icon"
                                />
                                <span className="logo-text">DevHub</span>
                            </a>
                        </h1>
                        <nav className='menu-box'>
                            <Button size='large' variant='text'>PROJECT</Button>
                            <Button size='large' variant='text'>BOARD</Button>
                            <Button size='large' variant='text'>SKILL TRENDS</Button>
                        </nav>
                    </div>
                    <div className="header-right-box">
                        <Badge variant="dot" color="error" sx={{ '& .MuiBadge-dot': { width: 8, height: 8 }}} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} >
                            <Avatar sx={{ width: 40, height: 40, bgcolor: 'transparent' }}>
                                <Notifications sx={{ fontSize: 35, color: '#2196F3' }} />
                            </Avatar>
                        </Badge>
                        <Avatar sx={{ width: 40, height: 40 }}>
                            <Person sx={{ fontSize: 24 }}></Person>
                        </Avatar>
                    </div> 
                </Paper>
            </header>

            {/* main */}
            <main className='main-content'>
                <Paper className='search-box' elevation={4}>
                    <TextField 
                        size='small' fullWidth 
                        sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 }}} 
                        placeholder='프로젝트 명을 입력해 주세요.'
                        slotProps={{ input: { startAdornment: (<InputAdornment position='start'><Search sx={{ fontSize: 24 }}></Search></InputAdornment>) } }}    
                    />
                    <Button size='medium' variant='contained' sx={{ width: 75 }}>검색</Button>
                </Paper>
                <div className='project-summary'>
                    <strong className='project-count'>전체 <em>23</em>개 프로젝트</strong>
                    <FormControl variant='standard'>
                        <Select 
                            id='filter' value={filter} onChange={handleChange} size='small' displayEmpty
                            renderValue={(selected) => selected === '' ? '기본순' : selected }
                        >
                            <MenuItem value="">None</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className='project-list-box'>
                    <Paper className="left-filter-bar" elevation={4}>
                        <div className='filter-box'>
                            <div className="filter-title">
                                <div className="text-box">
                                    <strong>필터</strong>
                                    <p>원하는 조건으로 검색하세요.</p>
                                </div>
                                <Button size='small' variant='text' sx={{ width: 51 }}>초기화</Button>
                            </div>
                            <div className="filter-options">
                                <Button size='small' variant='contained'>전체</Button>
                                <Button size='small' variant='outlined'>모집중</Button>
                                <Button size='small' variant='outlined'>진행중</Button>
                                <Button size='small' variant='outlined'>모집완료</Button>
                                <Button size='small' variant='outlined'>추가모집</Button>
                            </div>
                        </div>
                        <Divider />
                        <div className="filter-box">
                            <div className="filter-title">
                                <div className="text-box">
                                    <strong>모집분야</strong>
                                    <p>원하는 조건으로 검색하세요.</p>
                                </div>
                            </div>
                            <div className='filter-options'>
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
                        <div className='filter-box'>
                            <div className="filter-title">
                                <div className="text-box">
                                    <strong>요구 능력치</strong>
                                    <p>원하는 조건으로 검색하세요.</p>
                                </div>
                            </div>
                            <div className="filter-options">
                                <Button size='small' variant='contained'>상</Button>
                                <Button size='small' variant='outlined'>중</Button>
                                <Button size='small' variant='outlined'>하</Button>
                            </div>
                        </div>
                        <Divider />
                        <div className="filter-box">
                            <div className="filter-title">
                                <div className="text-box">
                                    <strong>기술스텍</strong>
                                    <p>원하는 조건으로 검색하세요.</p>
                                </div>
                            </div>
                            <div className='filter-options'>
                                <Chip size='small' variant='filled' label='JAVA' color='primary' onDelete={() => {}} />
                                <Chip size='small' variant='filled' label='React' color='primary' clickable onDelete={() => {}} />
                                <Chip size='small' variant='filled' label='GO' color='primary' clickable onDelete={() => {}} />
                                <Chip size='small' variant='filled' label='SQL' color='primary' clickable onDelete={() => {}} />
                                <Chip size='small' variant='filled' label='Docker' color='primary' clickable onDelete={() => {}} />
                                <Chip size='small' variant='filled' label='git' color='primary' clickable onDelete={() => {}} />
                                <Avatar sx={{ width: 24, height: 24, bgcolor: 'transparent', cursor: 'pointer' }}>
                                    <AddCircle sx={{ fontSize: 26, color: '#1E88E5' }} />
                                </Avatar>
                            </div>
                        </div>
                        <Divider />
                        <div className='filter-box'>
                            <div className="filter-title">
                                <div className="text-box">
                                    <strong>진행기간</strong>
                                    <p>원하는 조건으로 검색하세요.</p>
                                </div>
                            </div>
                            <div className="filter-options">
                                <Button size='small' variant='contained'>1개월</Button>
                                <Button size='small' variant='outlined'>3개월</Button>
                                <Button size='small' variant='outlined'>6개월</Button>
                            </div>
                        </div>
                        <div className="filter-button-box">
                            <Button size='small' variant='outlined' startIcon={<FilterAlt />}>상세 필터</Button>
                            <Button size='small' variant='contained'>필터 적용</Button>
                        </div>
                    </Paper>
                    <div className='project-list'>
                        <Paper className='project' elevation={2}>
                            <div className="left-area">
                                <div className="chip-box">
                                    <Chip size='small' color='primary' label='모집중' />
                                    <Chip size='small' avatar={<Avatar sx={{ backgroundColor: '#AEAEAE' }}><LocationOn sx={{ fontSize: 18, color: '#fff' }}></LocationOn></Avatar>} label='서울' />
                                    <Chip size='small' color='error' label='추가모집' />
                                    <Chip size='small' color='warning' avatar={<Avatar sx={{ backgroundColor: '#E65100' }}><AccessTime sx={{ fontSize: 18, color: '#fff' }}></AccessTime></Avatar>} label='D-13' />
                                </div>
                                <strong className='main-text'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집하는 글입니다 많은 참여 부탁드립니다</strong>
                                <div className="sub-text">
                                    <div className="top">
                                        <div>
                                            <div className='title'><AccessTime />모집기간</div>
                                            <p>2025.12.03 ~ 2026.02.03</p>
                                        </div>
                                        <div>
                                            <div className='title'><AccessTime />진행기간</div>
                                            <p>2025.12.03 ~ 2026.02.03</p>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <p className='write-info'>홍길동 . 2025.12.03</p>
                                        <p className='view-count'>view 1017</p>
                                    </div>
                                </div>
                            </div>
                            <Divider orientation='vertical' />
                            <div className="right-area">
                                <div className="heart-box">
                                    <IconButton size='small'><Favorite sx={{ fontSize: 24, color: '#D05B5B' }} /></IconButton>
                                    <p className='heart-count'>206</p>
                                </div>
                                <div className="chip-box">
                                    <div className="recruit-chip-box">
                                        <Chip variant='outlined' color='primary' size='small' label='서버개발자' />
                                        <Chip variant='outlined' color='primary' size='small' label='총괄기획' />
                                    </div>
                                    <div className='tech-chip-box'>
                                        <Chip variant='outlined' color='secondary' size='small' label='JAVA' />
                                        <Chip variant='outlined' color='secondary' size='small' label='ORACLE' />
                                        <Chip variant='outlined' color='secondary' size='small' label='JS' />
                                    </div>
                                </div>
                            </div>
                        </Paper>
                        <Paper className='project' elevation={2}>
                            <div className="left-area">
                                <div className="chip-box">
                                    <Chip size='small' color='primary' label='모집중' />
                                    <Chip size='small' avatar={<Avatar sx={{ backgroundColor: '#AEAEAE' }}><LocationOn sx={{ fontSize: 18, color: '#fff' }}></LocationOn></Avatar>} label='서울' />
                                    <Chip size='small' color='error' label='추가모집' />
                                    <Chip size='small' color='warning' avatar={<Avatar sx={{ backgroundColor: '#E65100' }}><AccessTime sx={{ fontSize: 18, color: '#fff' }}></AccessTime></Avatar>} label='D-13' />
                                </div>
                                <strong className='main-text'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집하는 글입니다 많은 참여 부탁드립니다</strong>
                                <div className="sub-text">
                                    <div className="top">
                                        <div>
                                            <div className='title'><AccessTime />모집기간</div>
                                            <p>2025.12.03 ~ 2026.02.03</p>
                                        </div>
                                        <div>
                                            <div className='title'><AccessTime />진행기간</div>
                                            <p>2025.12.03 ~ 2026.02.03</p>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <p className='write-info'>홍길동 . 2025.12.03</p>
                                        <p className='view-count'>view 1017</p>
                                    </div>
                                </div>
                            </div>
                            <Divider orientation='vertical' />
                            <div className="right-area">
                                <div className="heart-box">
                                    <IconButton size='small'><Favorite sx={{ fontSize: 24, color: '#D05B5B' }} /></IconButton>
                                    <p className='heart-count'>206</p>
                                </div>
                                <div className="chip-box">
                                    <div className="recruit-chip-box">
                                        <Chip variant='outlined' color='primary' size='small' label='서버개발자' />
                                        <Chip variant='outlined' color='primary' size='small' label='총괄기획' />
                                    </div>
                                    <div className='tech-chip-box'>
                                        <Chip variant='outlined' color='secondary' size='small' label='JAVA' />
                                        <Chip variant='outlined' color='secondary' size='small' label='ORACLE' />
                                        <Chip variant='outlined' color='secondary' size='small' label='JS' />
                                    </div>
                                </div>
                            </div>
                        </Paper>
                        <Paper className='project' elevation={2}>
                            <div className="left-area">
                                <div className="chip-box">
                                    <Chip size='small' color='primary' label='모집중' />
                                    <Chip size='small' avatar={<Avatar sx={{ backgroundColor: '#AEAEAE' }}><LocationOn sx={{ fontSize: 18, color: '#fff' }}></LocationOn></Avatar>} label='서울' />
                                    <Chip size='small' color='error' label='추가모집' />
                                    <Chip size='small' color='warning' avatar={<Avatar sx={{ backgroundColor: '#E65100' }}><AccessTime sx={{ fontSize: 18, color: '#fff' }}></AccessTime></Avatar>} label='D-13' />
                                </div>
                                <strong className='main-text'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집하는 글입니다 많은 참여 부탁드립니다</strong>
                                <div className="sub-text">
                                    <div className="top">
                                        <div>
                                            <div className='title'><AccessTime />모집기간</div>
                                            <p>2025.12.03 ~ 2026.02.03</p>
                                        </div>
                                        <div>
                                            <div className='title'><AccessTime />진행기간</div>
                                            <p>2025.12.03 ~ 2026.02.03</p>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <p className='write-info'>홍길동 . 2025.12.03</p>
                                        <p className='view-count'>view 1017</p>
                                    </div>
                                </div>
                            </div>
                            <Divider orientation='vertical' />
                            <div className="right-area">
                                <div className="heart-box">
                                    <IconButton size='small'><Favorite sx={{ fontSize: 24, color: '#D05B5B' }} /></IconButton>
                                    <p className='heart-count'>206</p>
                                </div>
                                <div className="chip-box">
                                    <div className="recruit-chip-box">
                                        <Chip variant='outlined' color='primary' size='small' label='서버개발자' />
                                        <Chip variant='outlined' color='primary' size='small' label='총괄기획' />
                                    </div>
                                    <div className='tech-chip-box'>
                                        <Chip variant='outlined' color='secondary' size='small' label='JAVA' />
                                        <Chip variant='outlined' color='secondary' size='small' label='ORACLE' />
                                        <Chip variant='outlined' color='secondary' size='small' label='JS' />
                                    </div>
                                </div>
                            </div>
                        </Paper>
                        <Paper className='project' elevation={2}>
                            <div className="left-area">
                                <div className="chip-box">
                                    <Chip size='small' color='primary' label='모집중' />
                                    <Chip size='small' avatar={<Avatar sx={{ backgroundColor: '#AEAEAE' }}><LocationOn sx={{ fontSize: 18, color: '#fff' }}></LocationOn></Avatar>} label='서울' />
                                    <Chip size='small' color='error' label='추가모집' />
                                    <Chip size='small' color='warning' avatar={<Avatar sx={{ backgroundColor: '#E65100' }}><AccessTime sx={{ fontSize: 18, color: '#fff' }}></AccessTime></Avatar>} label='D-13' />
                                </div>
                                <strong className='main-text'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집하는 글입니다 많은 참여 부탁드립니다</strong>
                                <div className="sub-text">
                                    <div className="top">
                                        <div>
                                            <div className='title'><AccessTime />모집기간</div>
                                            <p>2025.12.03 ~ 2026.02.03</p>
                                        </div>
                                        <div>
                                            <div className='title'><AccessTime />진행기간</div>
                                            <p>2025.12.03 ~ 2026.02.03</p>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <p className='write-info'>홍길동 . 2025.12.03</p>
                                        <p className='view-count'>view 1017</p>
                                    </div>
                                </div>
                            </div>
                            <Divider orientation='vertical' />
                            <div className="right-area">
                                <div className="heart-box">
                                    <IconButton size='small'><Favorite sx={{ fontSize: 24, color: '#D05B5B' }} /></IconButton>
                                    <p className='heart-count'>206</p>
                                </div>
                                <div className="chip-box">
                                    <div className="recruit-chip-box">
                                        <Chip variant='outlined' color='primary' size='small' label='서버개발자' />
                                        <Chip variant='outlined' color='primary' size='small' label='총괄기획' />
                                    </div>
                                    <div className='tech-chip-box'>
                                        <Chip variant='outlined' color='secondary' size='small' label='JAVA' />
                                        <Chip variant='outlined' color='secondary' size='small' label='ORACLE' />
                                        <Chip variant='outlined' color='secondary' size='small' label='JS' />
                                    </div>
                                </div>
                            </div>
                        </Paper>
                        <Paper className='project' elevation={2}>
                            <div className="left-area">
                                <div className="chip-box">
                                    <Chip size='small' color='primary' label='모집중' />
                                    <Chip size='small' avatar={<Avatar sx={{ backgroundColor: '#AEAEAE' }}><LocationOn sx={{ fontSize: 18, color: '#fff' }}></LocationOn></Avatar>} label='서울' />
                                    <Chip size='small' color='error' label='추가모집' />
                                    <Chip size='small' color='warning' avatar={<Avatar sx={{ backgroundColor: '#E65100' }}><AccessTime sx={{ fontSize: 18, color: '#fff' }}></AccessTime></Avatar>} label='D-13' />
                                </div>
                                <strong className='main-text'>[데이터 분석] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집하는 글입니다 많은 참여 부탁드립니다</strong>
                                <div className="sub-text">
                                    <div className="top">
                                        <div>
                                            <div className='title'><AccessTime />모집기간</div>
                                            <p>2025.12.03 ~ 2026.02.03</p>
                                        </div>
                                        <div>
                                            <div className='title'><AccessTime />진행기간</div>
                                            <p>2025.12.03 ~ 2026.02.03</p>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <p className='write-info'>홍길동 . 2025.12.03</p>
                                        <p className='view-count'>view 1017</p>
                                    </div>
                                </div>
                            </div>
                            <Divider orientation='vertical' />
                            <div className="right-area">
                                <div className="heart-box">
                                    <IconButton size='small'><Favorite sx={{ fontSize: 24, color: '#D05B5B' }} /></IconButton>
                                    <p className='heart-count'>206</p>
                                </div>
                                <div className="chip-box">
                                    <div className="recruit-chip-box">
                                        <Chip variant='outlined' color='primary' size='small' label='서버개발자' />
                                        <Chip variant='outlined' color='primary' size='small' label='총괄기획' />
                                    </div>
                                    <div className='tech-chip-box'>
                                        <Chip variant='outlined' color='secondary' size='small' label='JAVA' />
                                        <Chip variant='outlined' color='secondary' size='small' label='ORACLE' />
                                        <Chip variant='outlined' color='secondary' size='small' label='JS' />
                                    </div>
                                </div>
                            </div>
                        </Paper>
                        <div className="list-bottom-box">
                            <Pagination count={10} showFirstButton showLastButton color='primary' />
                            <Button size='medium' variant='contained' sx={{ height: "3.6rem !important", minWidth: 72 }}>글쓰기</Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
