import { Pagination, Paper, Tab, Tabs } from '@mui/material'
import useSelectMyProjects from '@/hooks/web/profile/project/useSelectMyProjects';
import useSelectLikeProjects from '@/hooks/web/profile/project/useSelectLikeProjects';
import useSelectApplyProjects from '@/hooks/web/profile/project/useSelectApplyProjects';
import useSelectParticipateProjects from '@/hooks/web/profile/project/useSelectParticipateProjects';
import ProjectCard from '@/components/web/profile/ProjectCard';
import { useParams } from 'react-router-dom';

import TabPanel from '@/components/_common/TabPanel';
import { useState } from 'react';

export default function MyProfileProjectListPage() {
  type TabType = 0 | 1 | 2 | 3;
  const { paramTabValue } = useParams<{ paramTabValue: string }>();
  const tab = Number(paramTabValue) as TabType;
  const [tabValue, setTabValue] = useState<TabType>(tab || 0);
  const handleTabChange = (_event: React.SyntheticEvent<Element, Event>, value: TabType) => {
    setTabValue(value);
  }
  const { res: myRes, setPage: setMyPage } = useSelectMyProjects();
  const { res: likeRes, setPage: setLikePage } = useSelectLikeProjects();
  const { res: applyRes, setPage: setApplyPage } = useSelectApplyProjects();
  const { res: participateRes, setPage: setParticipatePage } = useSelectParticipateProjects();
  return (
    <>
      <Paper className='mypage-box flex-col flex-grow' elevation={4}>
        {/* 2-1. tab menu */}
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="내가 등록한 프로젝트" />
          <Tab label="내가 신청한 프로젝트" />
          <Tab label="관심 프로젝트" />
          <Tab label="참여한 프로젝트" />
        </Tabs>
        {/* 2-3. tab contents */}
        {/* 2-3-1. 내가 등록한 프로젝트 */}
        <TabPanel value={tabValue} index={0}>
          {/* 2-2. list summary */}
          <strong className="list-summary">
            총 <em>{myRes?.dataList?.length}</em>건
          </strong>
          <div className="list-box flex-col active">
            {myRes?.dataList?.map((item, index) => {
              return <ProjectCard key={index} {...item} variant={"register"} ></ProjectCard>
            })}
          </div>
          {/* 2-4. pagination */}
          <Pagination count={myRes?.pagination?.totalPages} onChange={(_, v) => { setMyPage(v) }} showFirstButton showLastButton color='primary' className='w-100 mt-a flex-center' />
        </TabPanel>

        {/* 2-3-2. 내가 신청한 프로젝트 */}
        <TabPanel value={tabValue} index={1}>
          <strong className="list-summary">
            총 <em>{applyRes?.dataList?.length}</em>건
          </strong>
          <div className="list-box flex-col">
            {applyRes?.dataList?.map((item, index) => {
              return <ProjectCard key={index} {...item} variant={"apply"} ></ProjectCard>
            })}
          </div>
          {/* 2-4. pagination */}
          <Pagination count={applyRes?.pagination?.totalPages} onChange={(_, v) => { setApplyPage(v) }} showFirstButton showLastButton color='primary' className='w-100 mt-a flex-center' />
        </TabPanel>
        {/* 2-3-3. 관심 프로젝트 */}
        <TabPanel value={tabValue} index={2}>
          <strong className="list-summary">
            총 <em>{likeRes?.dataList?.length}</em>건
          </strong>
          <div className="list-box flex-col">
            {likeRes?.dataList?.map((item, index) => {
              return <ProjectCard key={index} {...item} variant={"favorite"} ></ProjectCard>
            })}
          </div>
          {/* 2-4. pagination */}
          <Pagination count={likeRes?.pagination?.totalPages} onChange={(_, v) => { setLikePage(v) }} showFirstButton showLastButton color='primary' className='w-100 mt-a flex-center' />
        </TabPanel>
        {/* 2-3-4. 참여한 프로젝트 */}
        <TabPanel value={tabValue} index={3}>
          <strong className="list-summary">
            총 <em>{participateRes?.dataList?.length}</em>건
          </strong>
          <div className="list-box flex-col">
            {participateRes?.dataList?.map((item, index) => {
              return <ProjectCard key={index} {...item} variant={"participate"} >

              </ProjectCard>
            })}
          </div>
          {/* 2-4. pagination */}
          <Pagination count={participateRes?.pagination?.totalPages} onChange={(_, v) => { setParticipatePage(v) }} showFirstButton showLastButton color='primary' className='w-100 mt-a flex-center' />
        </TabPanel>

      </Paper>
    </>
  )
}
