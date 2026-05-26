import { useNavigate, useParams } from 'react-router-dom';
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import CustomDateRange from '@/components/_common/customMUI/CustomDateRange';
import useSelectAdminProjectDetail from '@/hooks/admin/projects/useSelectAdminProjectDetail';
import useUpdateAdminProject from '@/hooks/admin/projects/useUpdateAdminProject';
import useSelectAdminApplicants from '@/hooks/admin/projects/useSelectAdminApplicants';
import useUpdateApplicantStatus from '@/hooks/admin/projects/useUpdateApplicantStatus';
import { useCodes } from '@/contexts/CommonCodeContext';
import { COMMON_CODE, PROJECT_APPROVAL_STATUS } from '@/constants/codes';
import { convertString } from '@/utils/util.date';
import type { AdminApplicantSummary } from '@/types/type.project';
import type { DateType } from '@/types/type.api';
import {
  Button,
  Chip,
  Divider,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const APPROVAL_STATUS_COLOR: Record<string, 'default' | 'success' | 'error'> = {
  [PROJECT_APPROVAL_STATUS.WAITING.CODE]: 'default',
  [PROJECT_APPROVAL_STATUS.COMPLETE.CODE]: 'success',
  [PROJECT_APPROVAL_STATUS.REJECT.CODE]: 'error',
};

export default function AdminProjectDetail() {
  const { projectGuid } = useParams<{ projectGuid: string }>();
  const navigate = useNavigate();

  const { res: detailRes, refetch } = useSelectAdminProjectDetail(projectGuid);
  const detail = detailRes?.data;

  const { state, onHandleEvent, onSave, loading: saveLoading } = useUpdateAdminProject(
    projectGuid,
    detail,
    refetch,
  );

  const {
    res: applicantRes,
    state: applicantState,
    request: applicantRequest,
    setPage: setApplicantPage,
    applicantSearch,
    onHandleEvent: onApplicantEvent,
    refetch: refetchApplicants,
  } = useSelectAdminApplicants(projectGuid);

  const { handleApprove, handleReject, loading: statusLoading } = useUpdateApplicantStatus(
    projectGuid,
    refetchApplicants,
  );

  const { getCodesByGroup, getCodeName } = useCodes();
  const recruitTypeCodes = getCodesByGroup(COMMON_CODE.PROJECT_RECRUIT_TYPE);
  const progressTypeCodes = getCodesByGroup(COMMON_CODE.PROJECT_PROGRESS_TYPE);
  const regionCodes = getCodesByGroup(COMMON_CODE.REGION_CODE);
  const approvalStatusCodes = getCodesByGroup(COMMON_CODE.PROJECT_APPROVAL_STATUS);
  const positionCodes = getCodesByGroup(COMMON_CODE.POSITION_CODE);
  const levelCodes = getCodesByGroup(COMMON_CODE.POSITION_LEVEL_CODE);

  const applicantRows = applicantRes?.data?.applicantList ?? [];
  const applicantTotal = applicantRes?.data?.pagination?.totalElements ?? 0;

  return (
    <div className="content-box w-100 flex-col gap-32">
      <div className="align-center gap-16">
        <strong className="title">프로젝트 상세</strong>
        <Button size="small" variant="text" onClick={() => navigate('/admin/projects')}>
          ← 목록으로
        </Button>
      </div>

      {/* 프로젝트 정보 */}
      <div className="search-section flex-col gap-16">
        <div className="title-area align-center gap-16">
          <strong>프로젝트 정보</strong>
          <Divider sx={{ flexGrow: 1 }} />
        </div>

        <Paper className="information-area flex-col gap-8" elevation={0} sx={{ padding: '1.6rem 0' }}>
          {/* 프로젝트 명 */}
          <div className="align-center">
            <dl className="align-center flex-1 gap-4">
              <dt>프로젝트 명</dt>
              <dd className="w-100">
                <CustomTextfield
                  size="small"
                  type="text"
                  value={state.title}
                  onChange={(e) => onHandleEvent('title', e.target.value)}
                />
              </dd>
            </dl>
          </div>

          {/* 모집 구분 / 진행 방식 / 진행 지역 */}
          <div className="align-center">
            <dl className="align-center flex-1 gap-4">
              <dt>모집 구분</dt>
              <dd className="w-100">
                <Select
                  className="w-100"
                  size="small"
                  displayEmpty
                  value={state.recruitmentTypeCd}
                  onChange={(e) => onHandleEvent('recruitmentTypeCd', e.target.value)}
                  sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 } }}
                >
                  <MenuItem value="">선택</MenuItem>
                  {recruitTypeCodes.map((c) => (
                    <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>
                  ))}
                </Select>
              </dd>
            </dl>
            <dl className="align-center flex-1 gap-4">
              <dt>진행 방식</dt>
              <dd className="w-100">
                <Select
                  className="w-100"
                  size="small"
                  displayEmpty
                  value={state.progressTypeCd}
                  onChange={(e) => onHandleEvent('progressTypeCd', e.target.value)}
                  sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 } }}
                >
                  <MenuItem value="">선택</MenuItem>
                  {progressTypeCodes.map((c) => (
                    <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>
                  ))}
                </Select>
              </dd>
            </dl>
            <dl className="align-center flex-1 gap-4">
              <dt>진행 지역</dt>
              <dd className="w-100">
                <Select
                  className="w-100"
                  size="small"
                  displayEmpty
                  value={state.progressRegionCd}
                  onChange={(e) => onHandleEvent('progressRegionCd', e.target.value)}
                  sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 } }}
                >
                  <MenuItem value="">선택</MenuItem>
                  {regionCodes.map((c) => (
                    <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>
                  ))}
                </Select>
              </dd>
            </dl>
          </div>

          {/* 모집 기간 / 진행 기간 / 등록일시 */}
          <div className="align-center">
            <dl className="align-center flex-1 gap-4">
              <dt>모집 기간</dt>
              <dd className="w-100 align-center gap-4" style={{ minWidth: 0 }}>
                <CustomDateRange
                  label="모집 시작"
                  startDate={state.recruitmentStartDate as DateType}
                  endDate={state.recruitmentEndDate as DateType}
                  onStartChange={(v: DateType) => onHandleEvent('recruitmentStartDate', v)}
                  onEndChange={(v: DateType) => onHandleEvent('recruitmentEndDate', v)}
                />
              </dd>
            </dl>
            <dl className="align-center flex-1 gap-4">
              <dt>진행 기간</dt>
              <dd className="w-100 align-center gap-4" style={{ minWidth: 0 }}>
                <CustomDateRange
                  label="진행 시작"
                  startDate={state.progressStartDate as DateType}
                  endDate={state.progressEndDate as DateType}
                  onStartChange={(v: DateType) => onHandleEvent('progressStartDate', v)}
                  onEndChange={(v: DateType) => onHandleEvent('progressEndDate', v)}
                />
              </dd>
            </dl>
            <dl className="align-center flex-1 gap-4">
              <dt>등록일시</dt>
              <dd className="w-100">{detail?.registeredDate ? convertString(detail.registeredDate as unknown as DateType, 'YYYY-MM-DD HH:mm') : '-'}</dd>
            </dl>
          </div>

          {/* 모집 인원 */}
          <div className="align-center">
            <dl className="align-stretch flex-1 gap-4">
              <dt>모집 인원</dt>
              <dd>
                <div className="flex-col gap-4" style={{ padding: '0.8rem 0' }}>
                  {(detail?.positionList ?? []).length > 0 ? (
                    detail!.positionList.map((pos, i) => (
                      <div key={i} className="align-center gap-4">
                        <Chip
                          size="small"
                          variant="outlined"
                          color="primary"
                          label={getCodeName(COMMON_CODE.POSITION_CODE, pos.position)}
                        />
                        <Chip
                          size="small"
                          variant="filled"
                          label={getCodeName(COMMON_CODE.POSITION_LEVEL_CODE, pos.level)}
                        />
                        <p>{pos.capacity}명</p>
                      </div>
                    ))
                  ) : (
                    <p>-</p>
                  )}
                </div>
              </dd>
            </dl>
          </div>

          {/* 작성자 */}
          <div className="align-center">
            <dl className="align-center flex-1 gap-4">
              <dt>작성자</dt>
              <dd className="w-100 align-center gap-4">
                {detail?.username ?? '-'}
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  className="ml-28"
                  disabled={!detail?.userGuid}
                  onClick={() => detail?.userGuid && navigate(`/admin/users/${detail.userGuid}`)}
                >
                  상세보기
                </Button>
              </dd>
            </dl>
          </div>

          {/* 저장 버튼 */}
          <div className="align-center ml-a" style={{ marginTop: '0.8rem' }}>
            <Button
              size="medium"
              variant="contained"
              color="primary"
              disabled={saveLoading}
              onClick={onSave}
            >
              저장
            </Button>
          </div>
        </Paper>
      </div>

      {/* 지원자 목록 조회 영역 */}
      <div className="search-section flex-col gap-16">
        <div className="title-area align-center gap-16">
          <strong>지원자 목록</strong>
          <Divider sx={{ flexGrow: 1 }} />
        </div>

        <div className="align-center gap-8">
          <Select
            id="approvalStatusCd"
            sx={{ width: '20rem' }}
            size="small"
            displayEmpty
            value={applicantState.approvalStatusCd ?? ''}
            onChange={(e) => onApplicantEvent('approvalStatusCd', e.target.value)}
          >
            <MenuItem value="">지원 상태 전체</MenuItem>
            {approvalStatusCodes.map((c) => (
              <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>
            ))}
          </Select>

          <Select
            id="positionCd"
            sx={{ width: '20rem' }}
            size="small"
            displayEmpty
            value={applicantState.positionCd ?? ''}
            onChange={(e) => onApplicantEvent('positionCd', e.target.value)}
          >
            <MenuItem value="">지원 포지션 전체</MenuItem>
            {positionCodes.map((c) => (
              <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>
            ))}
          </Select>

          <Select
            id="levelCd"
            sx={{ width: '20rem' }}
            size="small"
            displayEmpty
            value={applicantState.levelCd ?? ''}
            onChange={(e) => onApplicantEvent('levelCd', e.target.value)}
          >
            <MenuItem value="">스킬 레벨 전체</MenuItem>
            {levelCodes.map((c) => (
              <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>
            ))}
          </Select>

          <Button size="medium" variant="contained" color="primary" className="ml-a" onClick={applicantSearch}>
            조회
          </Button>
        </div>
      </div>

      {/* 지원자 목록 그리드 영역 */}
      <div className="grid-section flex-col gap-16">
        <div className="grid-summary align-center gap-16">
          <Divider sx={{ flexGrow: 1 }} />
          <strong className="total-count">
            총 <em>{applicantTotal}</em>개
          </strong>
        </div>

        <TableContainer component={Paper}>
          <Table
            aria-label="admin applicant list table"
            sx={{ tableLayout: 'fixed', width: '100%', borderCollapse: 'separate' }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" width={70}>번호</TableCell>
                <TableCell align="center">지원자 아이디</TableCell>
                <TableCell align="center" width={140}>지원 포지션</TableCell>
                <TableCell align="center" width={100}>스킬 레벨</TableCell>
                <TableCell align="center" width={120}>지원 상태</TableCell>
                <TableCell align="center" width={200}>관리</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicantRows.map((row: AdminApplicantSummary, index: number) => (
                <TableRow key={row.applicantGuid}>
                  <TableCell align="center">{applicantTotal - applicantRequest.page * 10 - index}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="center">
                    {getCodeName(COMMON_CODE.POSITION_CODE, row.positionCd)}
                  </TableCell>
                  <TableCell align="center">
                    {getCodeName(COMMON_CODE.POSITION_LEVEL_CODE, row.levelCd)}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={getCodeName(COMMON_CODE.PROJECT_APPROVAL_STATUS, row.approvalStatusCd)}
                      color={APPROVAL_STATUS_COLOR[row.approvalStatusCd] ?? 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <div className="align-center gap-4 flex-center">
                      <Button
                        size="small"
                        variant="outlined"
                        color="success"
                        disabled={
                          statusLoading ||
                          row.approvalStatusCd === PROJECT_APPROVAL_STATUS.COMPLETE.CODE
                        }
                        onClick={() => handleApprove(row.applicantGuid)}
                      >
                        승인
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        disabled={
                          statusLoading ||
                          row.approvalStatusCd === PROJECT_APPROVAL_STATUS.REJECT.CODE
                        }
                        onClick={() => handleReject(row.applicantGuid)}
                      >
                        거절
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => navigate(`/admin/users/${row.userGuid}`)}
                      >
                        상세보기
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {applicantRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    조회된 지원자가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination
          count={applicantRes?.pagination?.totalPages ?? 0}
          page={applicantRequest.page + 1}
          onChange={(_, page) => setApplicantPage(page)}
          showFirstButton
          showLastButton
          color="primary"
          className="w-100 flex-center"
        />
      </div>
    </div>
  );
}
