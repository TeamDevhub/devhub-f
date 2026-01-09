import CustomAvatar from '@/components/CustomAvatar'
import { AccessTime, LocationOn, Person, Visibility } from '@mui/icons-material'
import { Button, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, Paper, Radio, RadioGroup, Stack, TextField } from '@mui/material'
import React from 'react'

export default function ProjectApplyPage(){
  return (
    <div className='project-page'>
      <Paper className='project-box project-apply-box flex-col' elevation={4}>
        {/* 1. project title */}
        <strong className="project-title">프로젝트 지원</strong>
        {/* 2. project header */}
        <div className="project-header">
          <div className="top flex-col">
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
          </div>
          <div className="bottom align-end justify-between">
            <div className="user-info align-center">
              <div className="left-area">
                <CustomAvatar 
                  sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                  avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                />
              </div>
              <div className="right-area">
                <p className='user-nickname'>닉네임</p>
                <p className='user-email'>email@gmail.com</p>
              </div>
            </div>
            <div className="project-info align-center">
              <div className='view-count align-center'>
                <Visibility sx={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.3)' }} />
                <p>100+</p>
              </div>
              <p className="post-date">2025.03.01</p>
            </div>
          </div>
        </div>
        <Divider />
        {/* 3. project content */}
        <div className="project-form project-apply-form flex-col">
          {/* 3-1. 기본 정보 */}
          <div className="form-box w-100 flex-col">
            <div className="label-area">
              <p className='label-text'>기본 정보</p>
            </div>    
            <div className="field-area user-info-box flex">
              <div className="left-area flex-col">
                <div className="top align-center">
                  <CustomAvatar 
                    sx={{ background: 'linear-gradient(180deg, rgba(66, 165, 245, 0.8) 0%, rgba(186, 104, 200, 0.6) 100%);' }}
                    avatarIcon={<Person sx={{ fontSize: 24 }} />} 
                  />
                  <div className="flex-col">
                    <p className='user-nickname'>지원자</p>
                    <p className='user-email'>email@gmail.com</p>
                  </div>
                </div>
                <div className="bottom flex-col">
                  <div className="manner-text justify-between">
                    <p className='text'>매너온도</p>
                    <p className='manner-temperature'>36.5°C</p>
                  </div>
                  <div className="manner-figure">
                    <span className='current-figure h-100'></span>
                  </div>
                </div>
              </div>
              <Divider orientation='vertical' flexItem />
              <div className="right-area flex-col">
                <div className="skill-box align-start">
                  <p className="title">보유 스킬</p>
                  <div className="content align-center">
                    <Chip size='small' variant='outlined' color='secondary' label='JAVA' />
                    <Chip size='small' variant='outlined' color='secondary' label='ORACLE' />
                    <Chip size='small' variant='outlined' color='secondary' label='Docker' />
                    <Chip size='small' variant='outlined' color='secondary' label='GO' />
                  </div>
                </div>
                <div className="introduce-box align-start">
                  <p className="title">자기 소개</p>
                  <div className="content">
                    안녕하세요 저는 광명에 거주하고 있는 김수빈이라고 합니다.<br/>
                    저는 멋쟁이 토마토입니다. 나는야 주스 될거야 나는야 케찹 될거야 나는야 춤을 출거야
                  </div>
                </div>
              </div>
            </div>
          </div>     
          {/* 3-2. 지원 포지션 */}
          <div className="form-box w-100 align-start">
            <div className="label-area">
              <p className='label-text'>지원 포지션</p>
            </div>
            <div className="field-area flex-col" style={{ padding: '1.2rem', gap: '0.8rem' }}>
              <FormControl>
                <RadioGroup aria-labelledby='recruitment-status-radio-group-label' defaultValue='001'>
                  <FormControlLabel 
                    value='001' 
                    control={<Radio />} 
                    label={
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Chip size='medium' variant='outlined' color='primary' label="기획자" />
                        <Chip size='medium' variant='filled' color='default' label="하급" />
                      </Stack>
                    }
                  />
                  <FormControlLabel 
                    value='002' 
                    control={<Radio />} 
                    label={
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Chip size='medium' variant='outlined' color='primary' label="디자이너" />
                        <Chip size='medium' variant='filled' color='default' label="하급" />
                      </Stack>
                    }
                  />
                  <FormControlLabel 
                    value='003' 
                    control={<Radio />} 
                    label={
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Chip size='medium' variant='outlined' color='primary' label="퍼블리셔" />
                        <Chip size='medium' variant='filled' color='default' label="하급" />
                      </Stack>
                    }
                  />
                  <FormControlLabel 
                    value='004' 
                    control={<Radio />} 
                    label={
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Chip size='medium' variant='outlined' color='primary' label="프론트엔드개발자" />
                        <Chip size='medium' variant='filled' color='default' label="하급" />
                      </Stack>
                    }
                  />
                  <FormControlLabel 
                    value='005' 
                    control={<Radio />} 
                    label={
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Chip size='medium' variant='outlined' color='primary' label="백엔드개발자" />
                        <Chip size='medium' variant='filled' color='default' label="하급" />
                      </Stack>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          {/* 3-3. 입력 정보 */}
          <div className="form-box w-100 flex-col" style={{ gap: '1.2rem' }}>
            <div className="label-area">
              <p className='label-text'>입력 정보</p>
            </div>
            <div className="field-area inform-field-box flex-col flex-1">
              <div className="form-box w-100 align-start">
                 <div className="label-area">
                  <p className='label-text'>이름</p>
                </div>
                <div className="field-area flex-1">
                  <TextField size='medium' fullWidth placeholder='이름을 입력해 주세요.' />                </div>
              </div>
              <div className="form-box w-100 align-start">
                 <div className="label-area">
                  <p className='label-text'>나이</p>
                </div>
                <div className="field-area flex-1">
                  <TextField size='medium' fullWidth placeholder='나이를 입력해 주세요.' />                </div>
              </div>
              <div className="form-box w-100 align-start">
                 <div className="label-area">
                  <p className='label-text'>지원동기</p>
                </div>
                <div className="field-area flex-1">
                  <TextField size='medium' fullWidth placeholder='지원동기를 입력해 주세요.' />                </div>
              </div>
              <div className="form-box w-100 align-start">
                 <div className="label-area">
                  <p className='label-text'>경력</p>
                </div>
                <div className="field-area flex-1">
                  <TextField size='medium' fullWidth placeholder='경력을 입력해 주세요.' />                </div>
              </div>
              <div className="form-box w-100 align-start">
                 <div className="label-area">
                  <div className="flex-col" style={{ gap: '0.4rem' }}>
                  <p className='label-text'>첨부파일</p>
                  <div className="help-text">
                    <span></span>
                    지원자가 작성해야 하는 항목을 선택하세요.<br/>
                    기본 양식을 선택하거나, 원하면 새로운 양식을 만들 수 있어요.(최대 3개)
                  </div>
                </div>
                </div>
                <div className="field-area flex-1">
                  <TextField multiline placeholder='Link or drag and drop' />
                </div>
              </div>
              <div className="form-box w-100 align-start">
                 <div className="label-area">
                  <p className='label-text'>참여가능 요일</p>
                </div>
                <div className="field-area flex-1">
                  <FormGroup row>
                    <FormControlLabel control={<Checkbox />} label='월요일' />
                    <FormControlLabel control={<Checkbox />} label='화요일' />
                    <FormControlLabel control={<Checkbox />} label='수요일' />
                    <FormControlLabel control={<Checkbox />} label='목요일' />
                    <FormControlLabel control={<Checkbox />} label='금요일' />
                    <FormControlLabel control={<Checkbox />} label='토요일' />
                    <FormControlLabel control={<Checkbox />} label='일요일' />
                  </FormGroup>                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        {/* 4. action buttons */}
        <div className="action-button-box align-center justify-end">
          <Button size='large' variant='outlined'>취소</Button>
          <Button size='large' variant='contained'>등록</Button>
        </div>
      </Paper>
    </div>
  )
}
