import React, { useState } from 'react';
import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import CustomDateRange from '@/components/_common/customMUI/CustomDateRange';
import useSelectAdminProjects from '@/hooks/admin/projects/useSelectAdminProjects';
import useDeleteAdminProject from '@/hooks/admin/projects/useDeleteAdminProject';
import { useCodes } from '@/contexts/CommonCodeContext';
import { COMMON_CODE } from '@/constants/codes';
import { convertString } from '@/utils/util.date';
import type { AdminProjectSummary } from '@/types/type.project';
import type { DateType } from '@/types/type.api';
import {
  Button,
  Checkbox,
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

const RECRUIT_TYPE_COLOR: Record<string, 'success' | 'warning' | 'default'> = {
  '3001': 'success',
  '3002': 'warning',
};

const RECRUIT_STATUS_COLOR: Record<string, 'success' | 'error' | 'default'> = {
  '3201': 'success',
  '3202': 'error',
  '3203': 'default',
};

export default function AdminProjectList() {
  const {
    res,
    state,
    request,
    setPage,
    projectSearch,
    handleDetail,
    handleReset,
    handleChange,
  } = useSelectAdminProjects();

  const { getCodesByGroup, getCodeName } = useCodes();
  const recruitTypeCodes = getCodesByGroup(COMMON_CODE.PROJECT_RECRUIT_TYPE);
  const recruitStatusCodes = getCodesByGroup(COMMON_CODE.PROJECT_RECRUIT_STATUS);
  const progressTypeCodes = getCodesByGroup(COMMON_CODE.PROJECT_PROGRESS_TYPE);
  const regionCodes = getCodesByGroup(COMMON_CODE.REGION_CODE);

  const [selected, setSelected] = useState<string[]>([]);
  const rows = res?.dataList ?? [];

  const { handleDelete, loading: deleteLoading } = useDeleteAdminProject(() => {
    setSelected([]);
  });

  const totalElements = res?.pagination?.totalElements ?? 0;
  const pageSize = res?.pagination?.size ?? 0;
  const currentPage = res?.pagination?.page ?? 0;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.checked ? rows.map((r) => r.projectGuid) : []);
  };

  const handleSelectRow = (projectGuid: string) => {
    setSelected((prev) =>
      prev.includes(projectGuid) ? prev.filter((id) => id !== projectGuid) : [...prev, projectGuid],
    );
  };

  return (
    <div className="content-box w-100 flex-col gap-32">
      <strong className="title">프로젝트 목록</strong>

      <div className="search-section flex-col gap-8">
        <div className="align-center gap-16">
          <Select
            id="recruitmentTypeCd"
            sx={{ width: '20rem' }}
            size="small"
            displayEmpty
            value={state.recruitmentTypeCd ?? ''}
            onChange={(e) => handleChange('recruitmentTypeCd', e.target.value)}
          >
            <MenuItem value="">모집 구분 전체</MenuItem>
            {recruitTypeCodes.map((c) => (
              <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>
            ))}
          </Select>

          <Select
            id="recruitStatusCd"
            sx={{ width: '20rem' }}
            size="small"
            displayEmpty
            value={state.recruitStatusCd ?? ''}
            onChange={(e) => handleChange('recruitStatusCd', e.target.value)}
          >
            <MenuItem value="">모집 상태 전체</MenuItem>
            {recruitStatusCodes.map((c) => (
              <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>
            ))}
          </Select>

          <CustomDateRange
            label="모집일"
            startDate={state.recruitmentStartDate as DateType}
            endDate={state.recruitmentEndDate as DateType}
            onStartChange={(v: DateType) => handleChange('recruitmentStartDate', v)}
            onEndChange={(v: DateType) => handleChange('recruitmentEndDate', v)}
          />
        </div>

        <div className="align-center gap-16">
          <Select
            id="progressTypeCd"
            sx={{ width: '20rem' }}
            size="small"
            displayEmpty
            value={state.progressTypeCd ?? ''}
            onChange={(e) => handleChange('progressTypeCd', e.target.value)}
          >
            <MenuItem value="">진행 방식 전체</MenuItem>
            {progressTypeCodes.map((c) => (
              <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>
            ))}
          </Select>

          <Select
            id="progressRegionCd"
            sx={{ width: '20rem' }}
            size="small"
            displayEmpty
            value={state.progressRegionCd ?? ''}
            onChange={(e) => handleChange('progressRegionCd', e.target.value)}
          >
            <MenuItem value="">진행 지역 전체</MenuItem>
            {regionCodes.map((c) => (
              <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>
            ))}
          </Select>

          <CustomDateRange
            label="진행일"
            startDate={state.progressStartDate as DateType}
            endDate={state.progressEndDate as DateType}
            onStartChange={(v: DateType) => handleChange('progressStartDate', v)}
            onEndChange={(v: DateType) => handleChange('progressEndDate', v)}
          />
        </div>

        <CustomTextfield
          size="small"
          sx={{ width: '41.6rem' }}
          type="search"
          placeholder="프로젝트 명을 입력해 주세요."
          value={state.keyword ?? ''}
          onChange={(e) => handleChange('keyword', e.target.value)}
        />

        <div className="flex gap-8 ml-a">
          <Button size="medium" variant="contained" onClick={projectSearch}>
            조회
          </Button>
          <Button size="medium" variant="outlined" onClick={handleReset}>
            초기화
          </Button>
        </div>
      </div>

      <div className="grid-section flex-col gap-16">
        <div className="grid-summary align-center gap-16">
          <Divider sx={{ flexGrow: 1 }} />
          <strong className="total-count">
            총 <em>{totalElements}</em>개
          </strong>
        </div>

        <TableContainer component={Paper}>
          <Table
            aria-label="admin project list table"
            sx={{ tableLayout: 'fixed', width: '100%', borderCollapse: 'separate' }}
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    size="large"
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < rows.length}
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell align="center" width={70}>번호</TableCell>
                <TableCell align="center">프로젝트 명</TableCell>
                <TableCell align="center" width={140}>작성자</TableCell>
                <TableCell align="center" width={120}>모집 구분</TableCell>
                <TableCell align="center" width={120}>모집 상태</TableCell>
                <TableCell align="center" width={120}>진행 방식</TableCell>
                <TableCell align="center" width={120}>진행 지역</TableCell>
                <TableCell align="center" width={120}>작성일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: AdminProjectSummary, index: number) => (
                <TableRow
                  key={row.projectGuid}
                  onClick={() => handleDetail(row.projectGuid)}
                  style={{ cursor: 'pointer' }}
                  hover
                >
                  <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      size="large"
                      color="primary"
                      checked={selected.includes(row.projectGuid)}
                      onChange={() => handleSelectRow(row.projectGuid)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {totalElements - currentPage * pageSize - index}
                  </TableCell>
                  <TableCell align="left">
                    <Typography noWrap>{row.title}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography noWrap>{row.username}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={getCodeName(COMMON_CODE.PROJECT_RECRUIT_TYPE, row.recruitmentTypeCd)}
                      color={RECRUIT_TYPE_COLOR[row.recruitmentTypeCd] ?? 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={getCodeName(COMMON_CODE.PROJECT_RECRUIT_STATUS, row.recruitStatusCd)}
                      color={RECRUIT_STATUS_COLOR[row.recruitStatusCd] ?? 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {getCodeName(COMMON_CODE.PROJECT_PROGRESS_TYPE, row.progressTypeCd)}
                  </TableCell>
                  <TableCell align="center">
                    {getCodeName(COMMON_CODE.REGION_CODE, row.progressRegionCd)}
                  </TableCell>
                  <TableCell align="center">{convertString(row.registeredDate as unknown as DateType)}</TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    조회된 프로젝트가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="align-center">
          <Pagination
            count={res?.pagination?.totalPages ?? 0}
            page={request.page + 1}
            onChange={(_, page) => setPage(page)}
            showFirstButton
            showLastButton
            color="primary"
            className="w-100 flex-center"
          />
          <Button
            size="medium"
            variant="outlined"
            color="error"
            className="ml-a"
            disabled={deleteLoading}
            onClick={() => handleDelete(selected)}
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
