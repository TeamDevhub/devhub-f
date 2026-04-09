import { Pagination, Paper, Tab, Tabs } from '@mui/material'
import useSelectMyProjects from '@/hooks/profile/useSelectMyProjects';
import ProjectCard from '@/components/profile/project/ProjectCard';
import EvaluateCard from '@/components/profile/project/EvaluateCard';
import TabPanel from '@/components/_common/TabPanel';

export default function MyProfileProjectListPage(){
  const { res, loading, error, setPage, tabValue, handleTabChange, tabVariant } = useSelectMyProjects();
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
        {/* 2-2. list summary */}
        <strong className="list-summary">
          총 <em>{res?.dataList?.length}</em>건
        </strong>
        {/* 2-3. tab contents */}
        {/* 2-3-1. 내가 등록한 프로젝트 */}
        <TabPanel value={tabValue} index={0}>
          <div className="list-box flex-col">
            {res?.dataList?.map((item, index) => {
              return <ProjectCard key={index} {...item} variant={tabVariant} ></ProjectCard>
            })}
            {/* <ProjectCard 
              variant='register'
              title='[데이터 분석1] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다. 타이틀이 길어지면 말줄임표가 자동 처리됩니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
              currentRecriutNumber='1'
              totalRecriutNumber='25'
              applicantNumber='10'
              approvalNumber='10'
            />
            <ProjectCard 
              variant='register'
              title='[데이터 분석2] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
              currentRecriutNumber='1'
              totalRecriutNumber='25'
              applicantNumber='10'
              approvalNumber='10'
            />
            <ProjectCard 
              variant='register'
              title='[데이터 분석3] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
              currentRecriutNumber='1'
              totalRecriutNumber='25'
              applicantNumber='10'
              approvalNumber='10'
            /> */}
          </div>
        </TabPanel>
        {/* 2-3-2. 내가 신청한 프로젝트 */}
        <TabPanel value={tabValue} index={1}>
          <div className="list-box flex-col">
            {res?.dataList?.map((item, index) => {
              return <ProjectCard key={index} {...item} variant={tabVariant} ></ProjectCard>
            })}
            {/* <ProjectCard 
              variant='apply'
              title='[데이터 분석1] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다. 타이틀이 길어지면 말줄임표가 자동 처리됩니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
              approvalState='승인 대기중'
            />
            <ProjectCard 
              variant='apply'
              title='[데이터 분석2] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
              approvalState='참가 거절'
            />
            <ProjectCard 
              variant='apply'
              title='[데이터 분석3] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
              approvalState='참가 승인'
            /> */}
          </div>
        </TabPanel>
        {/* 2-3-3. 관심 프로젝트 */}
        <TabPanel value={tabValue} index={2}>
          <div className="list-box flex-col">
          {res?.dataList?.map((item, index) => {
              return <ProjectCard key={index} {...item} variant={tabVariant} ></ProjectCard>
            })}
            {/* <ProjectCard 
              variant='favorite'
              title='[데이터 분석1] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다. 타이틀이 길어지면 말줄임표가 자동 처리됩니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
            />
            <ProjectCard 
              variant='favorite'
              title='[데이터 분석2] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
            />
            <ProjectCard 
              variant='favorite'
              title='[데이터 분석3] 재난 안전 데이터 활용 공모전에 나갈 팀원을 모집합니다.'
              recruitStartDate='2025.12.03'
              recruitEndDate='2026.02.03'
              progressStartDate='2025.12.03'
              progressEndDate='2026.02.03'
            /> */}
          </div>
        </TabPanel>
        {/* 2-3-4. 참여한 프로젝트 */}
        {/* <TabPanel value={tabValue} index={3}>
          <div className="list-box flex-col">
            <ProjectCard 
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
            />
          </div>
        </TabPanel> */}
        {/* 2-4. pagination */}
        <Pagination count={res?.pagination?.totalPages} onChange={(_, v) => { setPage(v) }} showFirstButton showLastButton color='primary' className='w-100 mt-a flex-center' />
      </Paper>
    </>
  )
}
