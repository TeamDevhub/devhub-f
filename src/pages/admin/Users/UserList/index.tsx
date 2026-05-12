import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import CustomDateRange from '@/components/_common/customMUI/CustomDateRange';
import { UserStatusChip } from '@/components/admin/UserStatusChips';
import useSelectAdminUsers from '@/hooks/admin/users/useSelectAdminUsers';
import { convertString } from '@/utils/util.date';
import { USER_STATUS_FILTER, type UserStatusFilter } from '@/constants/codes';
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
import type { AdminUserListItem } from '@/types/type.user';
import type { DateType } from '@/types/type.api';

export default function UserList() {
  const { res, state, request, setPage, userSearch, handleDetail, onHandleEvent, handleReset } = useSelectAdminUsers();

  const totalElements = res?.pagination?.totalElements ?? 0;
  const pageSize = res?.pagination?.size ?? 0;
  const currentPage = res?.pagination?.page ?? 0;

  return (
    <div className="content-box w-100 flex-col gap-32">
      {/* 1. 타이틀 */}
      <strong className="title">회원 목록</strong>

      {/* 2. 조회 영역 */}
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
          id="userStatusFilter"
          sx={{ width: '16rem' }}
          size="small"
          displayEmpty
          value={state.userStatusFilter}
          onChange={(e) => onHandleEvent('userStatusFilter', e.target.value as UserStatusFilter)}
        >
          {Object.values(USER_STATUS_FILTER).map(({ VALUE, LABEL }) => (
            <MenuItem key={VALUE} value={VALUE}>
              {LABEL}
            </MenuItem>
          ))}
        </Select>

        <CustomDateRange
          label="가입일"
          startDate={state.joinedFrom}
          endDate={state.joinedTo}
          onStartChange={(v: DateType) => onHandleEvent('joinedFrom', v)}
          onEndChange={(v: DateType) => onHandleEvent('joinedTo', v)}
        />

        <CustomTextfield
          size="small"
          sx={{ width: '32rem' }}
          type="search"
          placeholder="닉네임을 입력해 주세요."
          value={state.username}
          onChange={(e) => onHandleEvent('username', e.target.value)}
        />

        <Button size="medium" variant="contained" onClick={userSearch}>
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
            aria-label="admin user list table"
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

                <TableCell align="center">닉네임</TableCell>

                <TableCell align="center" width={120}>
                  계정상태
                </TableCell>

                <TableCell align="center" width={140}>
                  가입일
                </TableCell>

                <TableCell align="center" width={120}>
                  매너온도
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(res?.dataList ?? []).map((row: AdminUserListItem, index: number) => (
                <TableRow key={row.userGuid} onClick={() => handleDetail(row.userGuid)} style={{ cursor: 'pointer' }} hover>
                  <TableCell align="center">{totalElements - currentPage * pageSize - index}</TableCell>

                  <TableCell align="left">
                    <Typography noWrap>{row.username}</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <UserStatusChip blocked={row.blocked} deleted={row.deleted} />
                  </TableCell>

                  <TableCell align="center">{convertString(row.registeredDate as unknown as DateType)}</TableCell>

                  <TableCell align="center">{row.mannerDegree?.toFixed?.(1) ?? row.mannerDegree}℃</TableCell>
                </TableRow>
              ))}

              {(res?.dataList?.length ?? 0) === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
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
