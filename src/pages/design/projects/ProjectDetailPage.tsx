import CustomAvatar from '@/components/_common/customMUI/CustomAvatar'
import TopButton from '@/components/_common/TopButton';
import { AccessTime, ContentPaste, Favorite, LocationOn, OpenInNew, People, Person, Settings, Visibility } from '@mui/icons-material'
import { Chip, Divider, Paper, Tooltip } from '@mui/material'
import React from 'react'

export default function ProjectDetailPage(){
  return (
    <div className='main-page align-stretch' style={{ minHeight: 'calc(100vh - 7rem)' }}>
      {/* 1. project detail */}
      <Paper className='project-box project-detail-box w-100 flex-col' elevation={4}>
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
            <div className="align-center">
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
        <div className="project-summary flex-col">
          <strong className="summary-title">프로젝트 개요</strong>
          <div className='summary-content flex-col'>
            <div className='summary-detail-box align-center'>
              <div className="detail-group align-center">
                <div className='group-label align-center'>
                  <AccessTime sx={{ fontSize: 24, color: 'var(--primary-main)' }} />
                  <strong>모집기간</strong>
                </div>
                <div className="group-value align-center">2025.12.03 ~ 2026.02.03</div>
              </div>
              <div className="detail-group align-center">
                <div className='group-label align-center'>
                  <AccessTime sx={{ fontSize: 24, color: 'var(--primary-main)' }} />
                  <strong>프로젝트 기간</strong>
                </div>
                <div className="group-value align-center">2025.12.03 ~ 2026.02.03 (2개월)</div>
              </div>
            </div>
            <div className='summary-detail-box align-center'>
              <div className="detail-group align-center">
                <div className='group-label align-center'>
                  <LocationOn sx={{ fontSize: 24, color: 'var(--primary-main)' }} />
                  <strong>진행방식</strong>
                </div>
                <div className="group-value align-center">온라인</div>
              </div>
              <div className="detail-group align-center">
                <div className='group-label align-center'>
                  <LocationOn sx={{ fontSize: 24, color: 'var(--primary-main)' }} />
                  <strong>지역</strong>
                </div>
                <p className="group-value align-center">서울</p>
              </div>
            </div>
            <div className='summary-detail-box align-center'>
              <div className="detail-group align-center">
                <div className='group-label align-center'>
                  <Settings sx={{ fontSize: 24, color: 'var(--primary-main)' }} />
                  <strong>사용기술</strong>
                </div>
                <div className="group-value align-center">
                  <Chip size='small' variant='outlined' label='JAVA' color='secondary' />
                  <Chip size='small' variant='outlined' label='ORACLE' color='secondary' />
                  <Chip size='small' variant='outlined' label='JS' color='secondary' />
                  <Chip size='small' variant='outlined' label='Phython' color='secondary' />
                  <Chip size='small' variant='outlined' label='JAVA' color='secondary' />
                  <Chip size='small' variant='outlined' label='ORACLE' color='secondary' />
                </div>
              </div>
            </div>
            <div className='summary-detail-box align-center'>
              <div className="detail-group align-start">
                <div className='group-label align-center'>
                  <People sx={{ fontSize: 24, color: 'var(--primary-main)' }} />
                  <strong>모집 포지션</strong>
                </div>
                <div className="group-value flex-col">
                  <div className="position-box align-center">
                    <Chip size='small' variant='outlined' color='primary' label='기획자' />
                    <Chip size='small' variant='filled' label='하급' />
                    <p>1명</p>
                  </div>
                  <div className="position-box align-center">
                    <Chip size='small' variant='outlined' color='primary' label='디자이너' />
                    <Chip size='small' variant='filled' label='하급' />
                    <p>1명</p>
                  </div>
                  <div className="position-box align-center">
                    <Chip size='small' variant='outlined' color='primary' label='퍼블리셔' />
                    <Chip size='small' variant='filled' label='하급' />
                    <p>1명</p>
                  </div>
                  <div className="position-box align-center">
                    <Chip size='small' variant='outlined' color='primary' label='프론트엔드개발자' />
                    <Chip size='small' variant='filled' label='하급' />
                    <p>1명</p>
                  </div>
                  <div className="position-box align-center">
                    <Chip size='small' variant='outlined' color='primary' label='백엔드개발자' />
                    <Chip size='small' variant='filled' label='하급' />
                    <p>1명</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className="project-detail flex-col">
          <strong className='detail-title'>프로젝트 상세</strong>
          <div className="detail-content">
            프로젝트에 대한 상세한 설명이 들어갑니다.<br/>
            <br/>
            이 곳에는 프로젝트의 목표, 진행방식, 기대효과 등을 자유롭게 작성할 수 있습니다.<br/>
            <br/>
            주요 내용:<br/>
            - 프로젝트 배경 및 목적<br/>
            - 기술 스택 및 개발 환경<br/>
            - 팀 구성 및 역할 분담<br/>
            - 진행 일정 및 마일스톤<br/>
            - 기대효과 및 성과<br/>
            <br/>
            함께 성장하여 좋은 결과를 만들어갈 팀원을 기다립니다!
          </div>
        </div>
      </Paper>
      {/* 2. floating action buttons */}
      <div className='floating-button-box flex-col'>
        <Tooltip arrow placement='right' title='좋아요'>
          <Paper className='float-button favorite-button flex-center' elevation={5}>
            <Favorite sx={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.56)' }} />
          </Paper>
        </Tooltip>
        <Tooltip arrow placement='right' title='지원하기'>
          <Paper className='float-button apply-button flex-center active' elevation={5}>
            <ContentPaste sx={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.56)' }} />
          </Paper>
        </Tooltip>
        <Tooltip arrow placement='right' title='공유하기'>
          <Paper className='float-button share-button flex-center' elevation={5}>
            <OpenInNew sx={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.56)' }} />
          </Paper>
        </Tooltip>
        <TopButton />
      </div>
    </div>
  )
}

