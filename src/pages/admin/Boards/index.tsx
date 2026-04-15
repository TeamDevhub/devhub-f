import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import LeftMenuBar from '@/components/design/LeftMenuBar'
import { Button, Checkbox, Divider, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, type SelectChangeEvent } from '@mui/material'
import useSelectAdminBoards from '@/hooks/admin/boards/useSelectAdminBoards';
import type {AdminBoard} from "@/types/type.boards.ts";
import { BoardCategoryChip } from '@/components/boards/BoardChips';
import { UserStatusChip } from '@/components/admin/UserStatusChips';
import {convertString} from "@/utils/util.date.ts";
import CustomDateRange from "@/components/_common/customMUI/CustomDateRange.tsx";
import type {DateType} from "@/types/type.api.ts";
import {COMMON_CODE} from "@/types/const.ts";
import {useCodes} from "@/contexts/CommonCodeContext.ts";

export default function BoardManagementPage(){

  const {
          res, 
          state, request, setPage,
          boardSearch,
          handleDetail,
          onHandleEvent, 
          handleReset,
          selectedGuids, handleSelectionChange, boardsDelete
      } = useSelectAdminBoards();

  const { getCodesByGroup } = useCodes();
  const categoryCode = getCodesByGroup(COMMON_CODE.BOARD_CATEGORY);
  const userStatus = getCodesByGroup(COMMON_CODE.USER_STATUS);

  return (
    <div className='admin-page flex'>
      {/* 1. left area */}
      <LeftMenuBar selectedKey='boards' />
      {/* 2. right area */}
      <div className="content-box w-100 flex-col gap-32">
        {/* 2-1. 타이틀 */}
        <strong className="title">게시판 관리</strong>
        {/* 2-2. 조회 영역 */}
        <div className="search-section flex-col gap-8">
          <div className="align-center gap-16">
            <CustomDateRange
              label={'작성 기간'}
              startDate={state.registeredStartDate}
              endDate={state.registeredEndDate}
              onStartChange={(v:DateType)=>{onHandleEvent('registeredStartDate', v)}}
              onEndChange={(v:DateType)=>{onHandleEvent('registeredEndDate', v)}}
            />
            <Select 
              label='카테고리'
              id='category' 
              sx={{ width: '20rem' }}
              size='small' displayEmpty
              value={state.categoryCd} 
              onChange={(e) => onHandleEvent('categoryCd', e.target.value)} 
            >
              <MenuItem value=''>전체</MenuItem>
              {categoryCode.map((i) => (
                <MenuItem value={i.code}>{i.name}</MenuItem>
              ))}
            </Select>
            <Select 
              label='회원 상태'
              id='userStatus' 
              sx={{ width: '20rem' }}
              size='small' displayEmpty
              value={state.userStatus} 
              onChange={(e) => onHandleEvent('userStatus', e.target.value)} 
            >
              <MenuItem value=''>전체</MenuItem>
              {userStatus.map((i) => (
                <MenuItem value={i.code}>{i.name}</MenuItem>
              ))}
            </Select>
            <Select
              label='신고 여부'
              id='category' 
              sx={{ width: '20rem' }}
              size='small' displayEmpty
              value={state.reported} onChange={(e)=>{onHandleEvent('reported', e.target.value)}} 
            >
              <MenuItem value=''>전체</MenuItem>
              <MenuItem value='Y'>신고</MenuItem>
              <MenuItem value='N'>미신고</MenuItem>
            </Select>
          </div>
          <CustomTextfield size='small' sx={{ width: '41.6rem' }} type='search' placeholder='제목을 입력해 주세요.' 
            value={state.title} onChange={(e) => onHandleEvent('title', e.target.value)}/>
          <div className="flex gap-8 ml-a">
            <Button size='medium' variant='contained' className='ml-a' onClick={boardSearch}>조회</Button>
            <Button size='medium' variant='outlined' className='ml-a' onClick={handleReset}>초기화</Button>
          </div>
        </div>
        {/* 2-3. 그리드 영역 */}
        <div className="grid-section flex-col gap-16">
          <div className="grid-summary align-center gap-16">
            <Divider sx={{ flexGrow: 1 }} />
            <strong className='total-count'>총 <em>{res?.pagination?.totalElements}</em>개</strong>
          </div>
          <TableContainer component={Paper}>
            <Table aria-label="user list table" sx={{ tableLayout: 'fixed', width: '100%', borderCollapse: 'separate' }}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    {/* <Checkbox
                      size='large'
                      color="primary"
                      indeterminate={
                        selected.length > 0 && selected.length < rows.length
                      }
                      checked={
                        rows.length > 0 && selected.length === rows.length
                      }
                      onChange={handleSelectAllClick}
                    /> */}
                  </TableCell>
                  <TableCell align="center" width={120}>번호</TableCell>
                  <TableCell align="center" width={120}>카테고리</TableCell>
                  <TableCell align="center">제목</TableCell>
                  <TableCell align="center" width={120}>상태</TableCell>
                  <TableCell align="center" width={120}>신고 횟수</TableCell>
                  <TableCell align="center" width={120}>작성자</TableCell>
                  <TableCell align="center" width={120}>작성일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {res?.dataList?.map((row:AdminBoard, index:number) => (
                  <TableRow 
                    key={row.boardBasicResponseDto.boardGuid}
                    onClick={()=>handleDetail(row.boardBasicResponseDto.boardGuid)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        size='large'
                        color="primary"
                        checked={selectedGuids.includes(row.boardBasicResponseDto.boardGuid)}
                        onChange={(e) => handleSelectionChange(row.boardBasicResponseDto.boardGuid, e.target.checked)}
                      />
                    </TableCell>
                    <TableCell align="center">{(res?.pagination?.totalElements || 0) - ((res?.pagination?.page || 0) * (res?.pagination?.size || 0)) - index}</TableCell>
                    <TableCell align="center"><BoardCategoryChip categoryCd={row.boardBasicResponseDto.categoryCd}></BoardCategoryChip></TableCell>
                    <TableCell align="left"><Typography noWrap>{row.boardBasicResponseDto.title}</Typography></TableCell>
                    <TableCell align="center">
                      <UserStatusChip statusCd={row.userstatus}></UserStatusChip>
                    </TableCell>
                    <TableCell align="center">{row.reportCount}회</TableCell>
                    <TableCell align="center">{row.boardBasicResponseDto.userName}</TableCell>
                    <TableCell align="center">{convertString(row.boardBasicResponseDto.registeredDate)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="align-center">
            <Pagination count={res?.pagination?.totalPages} page={request.page + 1} onChange={(_, page) => {setPage(page)}} showFirstButton showLastButton color='primary' className='w-100 flex-center' />
            <Button size='medium' variant='outlined' color='primary' className='ml-a' 
              onClick={boardsDelete} disabled={selectedGuids.length === 0}>삭제</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
