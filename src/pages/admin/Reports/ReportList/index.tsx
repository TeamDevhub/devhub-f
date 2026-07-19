import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import CustomDateRange from '@/components/_common/customMUI/CustomDateRange';
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
  Typography,
} from '@mui/material';
import useSelectAdminReports, { type ProcessedFilter } from '@/hooks/admin/reports/useSelectAdminReports';
import useProcessReport from '@/hooks/admin/reports/useProcessReport';
import type { AdminReport } from '@/types/type.user';
import type { DateType } from '@/types/type.api';
import { COMMON_CODE } from '@/constants/codes';
import { useCodes } from '@/hooks/_common/useCodes';
import { convertString } from '@/utils/util.date';

const getReportTarget = (report: AdminReport): string => {
  if (report.boardGuid) return '게시물';
  if (report.commentGuid) return '댓글';
  return '-';
};

export default function ReportList() {
  const { res, state, request, setPage, reportSearch, handleReset, onHandleEvent, refetch } = useSelectAdminReports();

  const { handleProcess, loading } = useProcessReport(() => refetch());

  const { getCodesByGroup, getCodeName } = useCodes();

  const reportTypeOptions = getCodesByGroup(COMMON_CODE.REPORT_TYPE);

  const totalElements = res?.pagination?.totalElements ?? 0;

  const pageSize = res?.pagination?.size ?? 0;

  const currentPage = res?.pagination?.page ?? 0;

  return (
      <div className="content-box w-100 flex-col gap-32">
        {/* 1. 타이틀 */}
        <strong className="title">신고 관리</strong>

        {/* 2. 검색 영역 */}
        <div
          className="search-section"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            width: '100%',
          }}
        >
          <Select
            id="categoryCd"
            sx={{ width: '20rem' }}
            size="small"
            displayEmpty
            value={state.categoryCd}
            onChange={(e) => onHandleEvent('categoryCd', e.target.value)}
          >
            <MenuItem value="">신고 유형 전체</MenuItem>

            {reportTypeOptions.map((i) => (
              <MenuItem key={i.code} value={i.code}>
                {i.name}
              </MenuItem>
            ))}
          </Select>

          <Select
            id="processedFilter"
            sx={{ width: '16rem' }}
            size="small"
            displayEmpty
            value={state.processedFilter}
            onChange={(e) => onHandleEvent('processedFilter', e.target.value as ProcessedFilter)}
          >
            <MenuItem value="">처리 상태 전체</MenuItem>

            <MenuItem value="false">미처리</MenuItem>

            <MenuItem value="true">처리 완료</MenuItem>
          </Select>

          <CustomDateRange
            label="신고 날짜"
            startDate={state.registeredStartDate}
            endDate={state.registeredEndDate}
            onStartChange={(v: DateType) => onHandleEvent('registeredStartDate', v)}
            onEndChange={(v: DateType) => onHandleEvent('registeredEndDate', v)}
          />

          <CustomTextfield
            size="small"
            sx={{ width: '32rem' }}
            type="search"
            placeholder="피신고자 닉네임을 입력해 주세요."
            value={state.reportedUser}
            onChange={(e) => onHandleEvent('reportedUser', e.target.value)}
          />

          <Button size="medium" variant="contained" onClick={reportSearch}>
            조회
          </Button>

          <Button size="medium" variant="outlined" onClick={handleReset}>
            초기화
          </Button>
        </div>

        {/* 3. 그리드 영역 */}
        <div className="grid-section flex-col gap-16">
          <div className="grid-summary align-center gap-16">
            <Divider sx={{ flexGrow: 1 }} />

            <strong className="total-count">
              총 <em>{totalElements}</em>개
            </strong>
          </div>

          <TableContainer component={Paper}>
            <Table
              aria-label="report list table"
              sx={{
                tableLayout: 'fixed',
                width: '100%',
                borderCollapse: 'separate',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" width={80}>
                    번호
                  </TableCell>

                  <TableCell align="center" width={140}>
                    피신고자
                  </TableCell>

                  <TableCell align="center" width={120}>
                    신고 유형
                  </TableCell>

                  <TableCell align="center" width={100}>
                    신고 대상
                  </TableCell>

                  <TableCell align="center">신고 사유</TableCell>

                  <TableCell align="center" width={140}>
                    신고 날짜
                  </TableCell>

                  <TableCell align="center" width={120}>
                    처리 상태
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {(res?.dataList ?? []).map((row: AdminReport, index: number) => (
                  <TableRow key={row.reportGuid}>
                    <TableCell align="center">{totalElements - currentPage * pageSize - index}</TableCell>

                    <TableCell align="center">{row.reportedUser}</TableCell>

                    <TableCell align="center">{getCodeName(COMMON_CODE.REPORT_TYPE, row.categoryCd)}</TableCell>

                    <TableCell align="center">{getReportTarget(row)}</TableCell>

                    <TableCell align="left">
                      <Typography noWrap>{row.reason}</Typography>
                    </TableCell>

                    <TableCell align="center">{convertString(row.registeredDate as unknown as DateType)}</TableCell>

                    <TableCell align="center">
                      {row.processed ? (
                        <Chip label="처리 완료" color="success" size="small" variant="outlined" />
                      ) : (
                        <Button variant="outlined" color="primary" size="small" disabled={loading} onClick={() => handleProcess(row.reportGuid)}>
                          처리 완료
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}

                {(res?.dataList?.length ?? 0) === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      조회된 신고가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
            count={res?.pagination?.totalPages}
            page={request.page + 1}
            onChange={(_, page) => setPage(page)}
            showFirstButton
            showLastButton
            color="primary"
            className="w-100 flex-center"
          />
        </div>
      </div>
  );
}
