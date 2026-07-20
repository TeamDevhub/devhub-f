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
  const { res: myRes, request: myRequest, setPage: setMyPage } = useSelectMyProjects();
  const { res: likeRes, request: likeRequest, setPage: setLikePage } = useSelectLikeProjects();
  const { res: applyRes, request: applyRequest, setPage: setApplyPage, refetch: refetchApplyProjects } = useSelectApplyProjects();
  const { res: participateRes, request: participateRequest, setPage: setParticipatePage, refetch: refetchParticipateProjects } = useSelectParticipateProjects();
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
            {myRes?.dataList?.map((item) => {
              return <ProjectCard key={item.projectGuid} {...item} variant={"register"} ></ProjectCard>
            })}
          </div>
          {/* 2-4. pagination */}
          <Pagination page={myRequest.page + 1} count={myRes?.pagination?.totalPages} onChange={(_, v) => { setMyPage(v) }} showFirstButton showLastButton color='primary' className='w-100 mt-a flex-center' />
        </TabPanel>

        {/* 2-3-2. 내가 신청한 프로젝트 */}
        <TabPanel value={tabValue} index={1}>
          <strong className="list-summary">
            총 <em>{applyRes?.dataList?.length}</em>건
          </strong>
          <div className="list-box flex-col">
            {applyRes?.dataList?.map((item) => {
              return <ProjectCard key={item.projectGuid} {...item} variant={"apply"} onCancelSuccess={refetchApplyProjects} />
            })}
          </div>
          {/* 2-4. pagination */}
          <Pagination page={applyRequest.page + 1} count={applyRes?.pagination?.totalPages} onChange={(_, v) => { setApplyPage(v) }} showFirstButton showLastButton color='primary' className='w-100 mt-a flex-center' />
        </TabPanel>
        {/* 2-3-3. 관심 프로젝트 */}
        <TabPanel value={tabValue} index={2}>
          <strong className="list-summary">
            총 <em>{likeRes?.dataList?.length}</em>건
          </strong>
          <div className="list-box flex-col">
            {likeRes?.dataList?.map((item) => {
              return <ProjectCard key={item.projectGuid} {...item} variant={"favorite"} ></ProjectCard>
            })}
          </div>
          {/* 2-4. pagination */}
          <Pagination page={likeRequest.page + 1} count={likeRes?.pagination?.totalPages} onChange={(_, v) => { setLikePage(v) }} showFirstButton showLastButton color='primary' className='w-100 mt-a flex-center' />
        </TabPanel>
        {/* 2-3-4. 참여한 프로젝트 */}
        <TabPanel value={tabValue} index={3}>
          <strong className="list-summary">
            총 <em>{participateRes?.dataList?.length}</em>건
          </strong>
          <div className="list-box flex-col">
            {participateRes?.dataList?.map((item) => {
              return <ProjectCard key={item.projectGuid} {...item} variant={"participate"} onReviewSuccess={refetchParticipateProjects} />
            })}
          </div>
          {/* 2-4. pagination */}
          <Pagination page={participateRequest.page + 1} count={participateRes?.pagination?.totalPages} onChange={(_, v) => { setParticipatePage(v) }} showFirstButton showLastButton color='primary' className='w-100 mt-a flex-center' />
        </TabPanel>

      </Paper>
    </>
  )
}
