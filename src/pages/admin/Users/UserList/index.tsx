import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import CustomDateRange from '@/components/_common/customMUI/CustomDateRange';
import { UserStatusChip } from '@/components/admin/UserStatusChips';
import { COMMON_CODE } from '@/constants/codes';
import { useCodes } from '@/contexts/CommonCodeContext';
import useSelectAdminUsers from '@/hooks/admin/users/useSelectAdminUsers';
import { convertString } from '@/utils/util.date';
import {
  Button,
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
import type { AdminUserSummary } from '@/types/type.user';
import type { DateType } from '@/types/type.api';

export default function UserList() {
  const {
    res,
    state,
    request,
    setPage,
    userSearch,
    handleDetail,
    onHandleEvent,
    handleReset,
  } = useSelectAdminUsers();

  const { getCodesByGroup } = useCodes();
  const userStatusCodes = getCodesByGroup(COMMON_CODE.USER_STATUS);

  const totalElements = res?.pagination?.totalElements ?? 0;
  const pageSize = res?.pagination?.size ?? 0;
  const currentPage = res?.pagination?.page ?? 0;

  return (
    <div className="content-box w-100 flex-col gap-32">
      {/* 1. 타이틀 */}
      <strong className="title">회원 목록</strong>

      {/* 2. 조회 영역 */}
      <div className="search-section flex-col gap-8">
        <div className="align-center gap-16">
          <Select
            label="계정 상태"
            id="userStatusCd"
            sx={{ width: '20rem' }}
            size="small"
            displayEmpty
            value={state.userStatusCd}
            onChange={(e) => onHandleEvent('userStatusCd', e.target.value)}
          >
            <MenuItem value="">전체</MenuItem>
            {userStatusCodes.map((i) => (
              <MenuItem key={i.code} value={i.code}>
                {i.name}
              </MenuItem>
            ))}
          </Select>
          <CustomDateRange
            label="가입일"
            startDate={state.registeredStartDate}
            endDate={state.registeredEndDate}
            onStartChange={(v: DateType) => onHandleEvent('registeredStartDate', v)}
            onEndChange={(v: DateType) => onHandleEvent('registeredEndDate', v)}
          />
        </div>
        <CustomTextfield
          size="small"
          sx={{ width: '41.6rem' }}
          type="search"
          placeholder="닉네임을 입력해 주세요."
          value={state.username}
          onChange={(e) => onHandleEvent('username', e.target.value)}
        />
        <div className="flex gap-8 ml-a">
          <Button size="medium" variant="contained" onClick={userSearch}>
            조회
          </Button>
          <Button size="medium" variant="outlined" onClick={handleReset}>
            초기화
          </Button>
        </div>
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
          <Table aria-label="admin user list table" sx={{ tableLayout: 'fixed', width: '100%', borderCollapse: 'separate' }}>
            <TableHead>
              <TableRow>
                <TableCell align="center" width={80}>번호</TableCell>
                <TableCell align="center">이메일</TableCell>
                <TableCell align="center" width={160}>닉네임</TableCell>
                <TableCell align="center" width={120}>계정상태</TableCell>
                <TableCell align="center" width={140}>가입일</TableCell>
                <TableCell align="center" width={120}>매너온도</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(res?.dataList ?? []).map((row: AdminUserSummary, index: number) => (
                <TableRow
                  key={row.userGuid}
                  onClick={() => handleDetail(row.userGuid)}
                  style={{ cursor: 'pointer' }}
                  hover
                >
                  <TableCell align="center">{totalElements - currentPage * pageSize - index}</TableCell>
                  <TableCell align="left">
                    <Typography noWrap>{row.email}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography noWrap>{row.username}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <UserStatusChip statusCd={row.userStatusCd} />
                  </TableCell>
                  <TableCell align="center">{convertString(row.registeredDate as unknown as DateType)}</TableCell>
                  <TableCell align="center">{row.mannerDegree?.toFixed?.(1) ?? row.mannerDegree}℃</TableCell>
                </TableRow>
              ))}
              {(res?.dataList?.length ?? 0) === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    조회된 회원이 없습니다.
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
