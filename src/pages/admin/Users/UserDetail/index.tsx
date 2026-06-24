import { useNavigate, useParams } from 'react-router-dom';
import { UserStatusChip } from '@/components/admin/UserStatusChips';
import { useCodes } from '@/hooks/_common/useCodes';
import { COMMON_CODE } from '@/constants/codes';
import useSelectAdminUserDetail from '@/hooks/admin/users/useSelectAdminUserDetail';
import useUpdateUserStatus from '@/hooks/admin/users/useUpdateUserStatus';
import useSelectAdminUserProjects from '@/hooks/admin/users/useSelectAdminUserProjects';
import useSelectAdminUserApplyProjects from '@/hooks/admin/users/useSelectAdminUserApplyProjects';
import { convertString } from '@/utils/util.date';
import type { DateType } from '@/types/type.api';
import { Box, Button, Chip, Divider, Pagination, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material'
import { useState } from 'react';
import { RecruitStatusChip } from "@/components/web/projects/ProjectChips";

function TabPanel({ value, index, className, children }: {
  value: number
  index: number
  className?: string
  children: React.ReactNode
}) {
  if (value !== index) return null
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      className='w-100 flex flex-grow'
    >
      <div className='w-100 flex-grow'>
        <Box className={className} sx={{ height: '100%' }}>{children}</Box>
      </div>
    </div>
  )
}
export default function UserDetail() {
  const { userGuid } = useParams<{ userGuid: string }>();
  const navigate = useNavigate();
  const { res, refetch } = useSelectAdminUserDetail(userGuid);
  const { handleSuspend, handleActivate, loading } = useUpdateUserStatus(userGuid, () => refetch());
  const { getCodeName } = useCodes();
  const { res:rows, setPage } = useSelectAdminUserProjects(userGuid);
  const { res:rows2, setPage:setPage2 } = useSelectAdminUserApplyProjects(userGuid);

  const [tab, setTab] = useState(0);

  const totalElements = rows?.pagination?.totalElements ?? 0;
  const pageSize = rows?.pagination?.size ?? 0;
  const currentPage = rows?.pagination?.page ?? 0;
  const totalElements2 = rows2?.pagination?.totalElements ?? 0;
  const pageSize2 = rows2?.pagination?.size ?? 0;
  const currentPage2 = rows2?.pagination?.page ?? 0;


  const detail = res?.data;
  const isSuspended = detail?.blocked === true;

  const positionNames = (detail?.positionList ?? []).map((code) => ({
    code,
    name: getCodeName(COMMON_CODE.POSITION_CODE, code),
  }));
  const skillNames = (detail?.skillList ?? []).map((code) => ({
    code,
    name: getCodeName(COMMON_CODE.SKILL_CODE, code),
  }));

  return (
    <div className="content-box w-100 flex-col gap-32">
      {/* 1. 타이틀 */}
      <div className="align-center gap-16">
        <strong className="title">회원 상세</strong>
        <Button size="small" variant="text" onClick={() => navigate('/admin/users')}>
          ← 목록으로
        </Button>
      </div>

      {/* 2. 회원 정보 */}
      <div className="search-section flex-col gap-16">
        <div className="title-area align-center gap-16">
          <strong>회원 정보</strong>
          <Divider sx={{ flexGrow: 1 }} />
        </div>

        <Paper className="information-area flex-col gap-8" elevation={0} sx={{ padding: '1.6rem 0' }}>
          <div className="align-center">
            <dl className="align-center flex-1 gap-4">
              <dt>닉네임</dt>
              <dd className="w-100">{detail?.username ?? '-'}</dd>
            </dl>
            <dl className="align-center flex-1 gap-4">
              <dt>계정 상태</dt>
              <dd className="w-100">
                {detail ? (
                  <UserStatusChip blocked={detail.blocked} deleted={detail.deleted} />
                ) : '-'}
              </dd>
            </dl>
          </div>

          <div className="align-center">
            <dl className="align-center flex-1 gap-4">
              <dt>자기소개</dt>
              <dd className="w-100">{detail?.introduction || '-'}</dd>
            </dl>
          </div>

          <div className="align-center">
            <dl className="align-center flex-1 gap-4">
              <dt>관심분야</dt>
              <dd className="w-100">
                <div className="chip-box align-center gap-4 flex-wrap">
                  {positionNames.length > 0
                    ? positionNames.map((p) => <Chip key={p.code} size="small" label={p.name} />)
                    : '-'}
                </div>
              </dd>
            </dl>
          </div>

          <div className="align-center">
            <dl className="align-center flex-1 gap-4">
              <dt>보유스킬</dt>
              <dd className="w-100">
                <div className="chip-box align-center gap-4 flex-wrap">
                  {skillNames.length > 0
                    ? skillNames.map((s) => <Chip key={s.code} size="small" label={s.name} />)
                    : '-'}
                </div>
              </dd>
            </dl>
          </div>

          <div className="align-center">
            <dl className="align-center flex-1 gap-4">
              <dt>매너온도</dt>
              <dd className="w-100">{detail?.mannerDegree?.toFixed?.(1) ?? detail?.mannerDegree ?? '-'}℃</dd>
            </dl>
            <dl className="align-center flex-1 gap-4">
              <dt>가입일</dt>
              <dd className="w-100">{detail?.registeredDate ? convertString(detail.registeredDate as unknown as DateType, 'YYYY-MM-DD HH:mm:ss') : '-'}</dd>
            </dl>
            <dl className="align-center flex-1 gap-4">
              <dt>차단 만료일</dt>
              <dd className="w-100">{detail?.blockEndDate ? convertString(detail.blockEndDate as unknown as DateType, 'YYYY-MM-DD HH:mm:ss') : '-'}</dd>
            </dl>
          </div>

          <div className="align-center gap-4 ml-a" style={{ marginTop: '0.8rem' }}>
            {isSuspended ? (
              <Button
                variant="outlined"
                disabled={!userGuid || loading}
                onClick={() => userGuid && handleActivate(userGuid)}
              >
                정지 해제
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="error"
                disabled={!userGuid || loading}
                onClick={() => userGuid && handleSuspend(userGuid)}
              >
                회원 정지
              </Button>
            )}
          </div>
        </Paper>
      </div>

      {/* 3. 회원 데이터 */}
      <div className="data-section flex-col gap-8">
        <div className="title-area align-center gap-16">
          <strong>회원 데이터</strong>
          <Divider sx={{ flexGrow: 1 }} />
        </div>

        <Tabs
          value={tab}
          variant="standard"
          onChange={(_, v) => setTab(v)}
          textColor="primary"
          indicatorColor="primary"
          aria-label="user-data-tabs"
        >
          <Tab label="프로젝트 내역" />
          <Tab label="신고 내역" />
        </Tabs>

        <Paper elevation={0} sx={{ padding: '2.4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <TabPanel value={tab} index={0} className='flex-col gap-28'>
              <div className="register-project">
                <div className="flex-col gap-4">
                  <div className="table-summary align-center gap-16">
                    <p className='summary-title'>등록한 프로젝트</p>
                    <Divider sx={{ flexGrow: 1 }} />
                    <p className='total-count'>총 <em>{totalElements}</em>개</p>
                  </div>
                  <TableContainer component={Paper}>
                    <Table aria-label="user list table" sx={{ tableLayout: 'fixed', width: '100%', borderCollapse: 'separate' }}>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" width={70}>번호</TableCell>
                          <TableCell align="center" width={120}>모집 상태</TableCell>
                          <TableCell align="center">프로젝트 제목</TableCell>
                          <TableCell align="center" width={200}>모집 기간</TableCell>
                          <TableCell align="center" width={120}>모집 현황</TableCell>
                          <TableCell align="center" width={120}>신청 인원</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows?.dataList?.map((row, index) => (
                          <TableRow>
                            <TableCell align="center">{totalElements - currentPage * pageSize - index}</TableCell>
                            <TableCell align="center"><RecruitStatusChip
                                        recruitStatusCode={row.recruitStatus}
                                      /></TableCell>
                            <TableCell align="left">
                              <Typography noWrap>
                                {row.title}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">{row.recruitmentStartDate + '~' + row.recruitmentEndDate}</TableCell>
                            <TableCell align="center">{row.currentRecriutNumber + '/' + row.totalRecriutNumber}</TableCell>
                            <TableCell align="center">{row.applicantNumber + '명'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    </TableContainer>
                    </div>
                <Pagination size='small' count={rows?.pagination?.totalPages} onChange={(_, page) => setPage(page)} showFirstButton showLastButton color='primary' className='w-100 flex-center mt-20' />
              </div>
              <div className="apply-project">
                <div className="flex-col gap-4">
                  <div className="table-summary align-center gap-16">
                    <p className='summary-title'>신청한 프로젝트</p>
                    <Divider sx={{ flexGrow: 1 }} />
                    <p className='total-count'>총 <em>{totalElements2}</em>개</p>
                  </div>
                  <TableContainer component={Paper}>
                    <Table aria-label="user list table" sx={{ tableLayout: 'fixed', width: '100%', borderCollapse: 'separate' }}>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" width={70}>번호</TableCell>
                          <TableCell align="center" width={120}>모집 상태</TableCell>
                          <TableCell align="center">프로젝트 제목</TableCell>
                          <TableCell align="center" width={200}>모집 기간</TableCell>
                          <TableCell align="center" width={120}>신청일자</TableCell>
                          <TableCell align="center" width={120}>상태</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows2?.dataList?.map((row, index) => (
                          <TableRow>
                            <TableCell align="center">{totalElements2 - currentPage2 * pageSize2 - index}</TableCell>
                            <TableCell align="center">{row.recruitStatus}</TableCell>
                            <TableCell align="left">
                              <Typography noWrap>
                                {row.title}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">{row.recruitmentStartDate + '~' + row.recruitmentEndDate}</TableCell>
                            <TableCell align="center">{row.currentRecriutNumber + '/' + row.totalRecriutNumber}</TableCell>
                            <TableCell align="center">{row.applicantNumber + '명'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <Pagination size='small' count={rows2?.pagination?.totalPages} onChange={(_, page) => setPage(page)} showFirstButton showLastButton color='primary' className='w-100 flex-center mt-20' />
              </div>
            </TabPanel>
        </Paper>
      </div>
    </div>
  );
}
