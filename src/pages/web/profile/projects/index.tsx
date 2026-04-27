import { Pagination, Paper, Tab, Tabs } from '@mui/material'
import useSelectMyProjects from '@/hooks/web/profile/project/useSelectMyProjects';
import useSelectLikeProjects from '@/hooks/web/profile/project/useSelectLikeProjects';
import useSelectApplyProjects from '@/hooks/web/profile/project/useSelectApplyProjects';
import useSelectParticipateProjects from '@/hooks/web/profile/project/useSelectParticipateProjects';
import ProjectCard from '@/components/web/profile/ProjectCard';
import EvaluateCard from '@/components/web/profile/EvaluateCard';
import TabPanel from '@/components/_common/TabPanel';
import { useState } from 'react';

export default function MyProfileProjectListPage() {
  type TabType = 0 | 1 | 2 | 3;
  const [tabValue, setTabValue] = useState<TabType>(0);
  const handleTabChange = (event: React.SyntheticEvent<Element, Event>, value: TabType) => {
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
                <EvaluateCard
                  userID='김수빈'
                  userEmail='rolling0321@naver.com'
                  mannerTemperature='40'
                  completeRating
                />
                <EvaluateCard
                  userID='데브헙'
                  userEmail='devHub@naver.com'
                  mannerTemperature='40'
                />
                <EvaluateCard
                  userID='파핑'
                  userEmail='5finger@naver.com'
                  mannerTemperature='40'
                />
                <EvaluateCard
                  userID='두쫀쿠'
                  userEmail='dubaichoco@naver.com'
                  mannerTemperature='40'
                  completeRating
                />
              </ProjectCard>
            })}
            {/* <ProjectCard 
              variant='participate'
              progressState='진행중'
              title='[데이터 분석2] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
            />
            <ProjectCard 
              variant='participate'
              progressState='진행완료'
              title='[데이터 분석2] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
            >
              <EvaluateCard 
                userID='김수빈'
                userEmail='rolling0321@naver.com'
                mannerTemperature='40'
                completeRating
              />
              <EvaluateCard 
                userID='데브헙'
                userEmail='devHub@naver.com'
                mannerTemperature='40'
              />
              <EvaluateCard 
                userID='파핑'
                userEmail='5finger@naver.com'
                mannerTemperature='40'
              />
              <EvaluateCard 
                userID='두쫀쿠'
                userEmail='dubaichoco@naver.com'
                mannerTemperature='40'
                completeRating
              />
            </ProjectCard>
            <ProjectCard 
              variant='participate'
              progressState='진행완료'
              title='[데이터 분석2] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
            /> */}
          </div>
          {/* 2-4. pagination */}
          <Pagination count={participateRes?.pagination?.totalPages} onChange={(_, v) => { setParticipatePage(v) }} showFirstButton showLastButton color='primary' className='w-100 mt-a flex-center' />
        </TabPanel>

      </Paper>
    </>
  )
}
