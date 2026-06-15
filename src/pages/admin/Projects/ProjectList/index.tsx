import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import LeftMenuBar from '@/components/_design/LeftMenuBar'
import { Button, Checkbox, Chip, Divider, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react'
import useSelectAdminProjects from "@/hooks/admin/projects/useSelectAdminProjects"
import {COMMON_CODE} from "@/constants/codes.ts";
import {useCodes} from "@/contexts/CommonCodeContext.ts";
import {getDateStr} from "@/utils/util.date";

export default function ProjectListPage(){
  const {
      res,
      state,
      projectSearch,
      handleChange,
  } = useSelectAdminProjects();

  const { getCodesByGroup, getCodeName } = useCodes();
  const progressType = getCodesByGroup(COMMON_CODE.PROJECT_PROGRESS_TYPE);
  const recruitType = getCodesByGroup(COMMON_CODE.PROJECT_RECRUIT_TYPE);
  const recruitStatusCode = getCodesByGroup(COMMON_CODE.PROJECT_RECRUIT_STATUS);
  const regionCode = getCodesByGroup(COMMON_CODE.REGION_CODE);

  const getRecruitmentTypeColor = (status: string) => {
    switch (status) {
      case '3001':
        return 'success';
      case '3002':
        return 'error';
      default:
        return 'success';
    }
  };

  const getRecruitmentStatusColor = (status: string) => {
    switch (status) {
      case '3201':
        return 'success';
      case '3202':
        return 'error';
      default:
        return 'success';
    }
  };

  // table checkbox
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = res?.dataList?.map((row) => row.projectGuid) || [];
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (projectGuid: string) => {
    const selectedIndex = selected.indexOf(projectGuid);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, projectGuid];
    } else {
      newSelected = selected.filter((id) => id !== projectGuid);
    }

    setSelected(newSelected);
  };

  return (
    <div className='admin-page flex'>
      {/* 1. left area */}
      <LeftMenuBar selectedKey='projects' />
      {/* 2. right area */}
      <div className="content-box w-100 flex-col gap-32">
        {/* 2-1. 타이틀 */}
        <strong className="title">프로젝트 목록</strong>
        {/* 2-2. 조회 영역 */}
        <div className="search-section flex-col gap-8">
          <div className="align-center gap-16">
            <Select 
              label='모집 구분'
              id='category' 
              value={state.recruitmentTypeCd || ''} 
              onChange={(e)=>{handleChange("recruitmentTypeCd", e.target.value ? e.target.value : "")}} 
              size='small' displayEmpty
              sx={{ width: '20rem' }}
            >
              <MenuItem value={''}>전체</MenuItem>
              {recruitType.map((i) => (
                <MenuItem value={i.code}>{i.name}</MenuItem>
              ))}
            </Select>
            <Select 
              label='모집 상태'
              id='category'
              value={state.recruitStatusCd || ''} 
              onChange={(e)=>{handleChange("recruitStatusCd", e.target.value ? e.target.value : "")}} 
              size='small' displayEmpty
              sx={{ width: '20rem' }}
            >
              <MenuItem value={''}>전체</MenuItem>
              {recruitStatusCode.map((i) => (
                <MenuItem value={i.code}>{i.name}</MenuItem>
              ))}
            </Select>
            <div className="align-center gap-4">
              <DatePicker
                slotProps={{
                  textField: {
                    label: '모집일',
                    size: 'small',
                    InputLabelProps: {
                      shrink: true,
                    }
                  },
                }}
                onChange={(e)=>{handleChange("recruitmentStartDate", e)}}
                sx={{ maxWidth: '20rem' }}
              />
              <p className='seperator'>~</p>
              <DatePicker
                slotProps={{
                  textField: {
                    size: 'small',
                    InputLabelProps: {
                      shrink: true,
                    }
                  },
                }}
                onChange={(e)=>{handleChange("recruitmentEndDate", e)}}
                sx={{
                  '& legend': { display: 'none' },
                  '& fieldset': { top: 0 },
                  maxWidth: '20rem'
                }}
              />
            </div>
          </div>
          <div className="align-center gap-16">
            <Select 
              label='진행 방식'
              id='category'
              value={state.progressTypeCd || ''}
              onChange={(e)=>{handleChange("progressTypeCd", e.target.value ? e.target.value : "")}}
              size='small'
              displayEmpty
              sx={{ width: '20rem' }}
            >
              <MenuItem value={''}>전체</MenuItem>
              {progressType.map((i) => (
                <MenuItem value={i.code}>{i.name}</MenuItem>
              ))}
            </Select>
            <Select 
              label='진행 지역'
              id='category'
              value={state.progressRegionCd || ''}
              onChange={(e)=>{handleChange("progressRegionCd", e.target.value ? e.target.value :"" )}}
              size='small' displayEmpty
              sx={{ width: '20rem' }}
            >
              <MenuItem value={''}>전체</MenuItem>
              {regionCode.map((i) => (
                <MenuItem value={i.code}>{i.name}</MenuItem>
              ))}
            </Select>
            <div className="align-center gap-4">
              <DatePicker
                slotProps={{
                  textField: {
                    label: '진행일',
                    size: 'small',
                    InputLabelProps: {
                      shrink: true,
                    }
                  },
                }}
                onChange={(e)=>{handleChange("progressStartDate", e)}}
                sx={{ maxWidth: '20rem' }}
              />
              <p className='seperator'>~</p>
              <DatePicker
                slotProps={{
                  textField: {
                    size: 'small',
                    InputLabelProps: {
                      shrink: true,
                    }
                  },
                }}
                onChange={(e)=>{handleChange("progressEndDate", e)}}
                sx={{
                  '& legend': { display: 'none' },
                  '& fieldset': { top: 0 },
                  maxWidth: '20rem'
                }}
              />
            </div>
          </div>
          <CustomTextfield size='small' placeholder='' sx={{ width: '41.6rem' }} value={state.keyword} onChange={(e) => { handleChange('keyword', e.target.value) }} />
          <Button size='medium' variant='contained' className='ml-a' onClick={projectSearch}>조회</Button>
        {/* 2-3. 그리드 영역 */}
          <div className="grid-summary align-center gap-16">
            <Divider sx={{ flexGrow: 1 }} />
            <strong className='total-count'>총 <em>{res?.pagination?.totalElements}</em>개</strong>
          </div>
          <TableContainer component={Paper}>
            <Table aria-label="user list table" sx={{ tableLayout: 'fixed', width: '100%', borderCollapse: 'separate' }}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      size='large'
                      color="primary"
                      indeterminate={
                        selected.length > 0 && selected.length < (res?.dataList?.length ?? 0)
                      }
                      checked={
                        (res?.dataList?.length ?? 0) > 0 && selected.length === res?.dataList?.length
                      }
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell align="center" width={70}>번호</TableCell>
                  <TableCell align="center">프로젝트 명</TableCell>
                  <TableCell align="center" width={170}>작성자</TableCell>
                  <TableCell align="center" width={120}>모집 구분</TableCell>
                  <TableCell align="center" width={120}>모집 상태</TableCell>
                  <TableCell align="center" width={120}>진행 방식</TableCell>
                  <TableCell align="center" width={120}>진행 지역</TableCell>
                  <TableCell align="center" width={120}>작성일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {res?.dataList?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        size='large'
                        color="primary"
                        checked={selected.includes(row.projectGuid)}
                        onChange={() => handleClick(row.projectGuid)}
                      />
                    </TableCell>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="left"><Typography noWrap>{row.title}</Typography></TableCell>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={getCodeName(COMMON_CODE.PROJECT_RECRUIT_TYPE, row.recruitmentTypeCd)}
                        color={getRecruitmentTypeColor(row.recruitmentTypeCd)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={getCodeName(COMMON_CODE.PROJECT_RECRUIT_STATUS, row.recruitStatusCd)}
                        color={getRecruitmentStatusColor(row.recruitStatusCd)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">{getCodeName(COMMON_CODE.PROJECT_PROGRESS_TYPE, row.progressTypeCd)}</TableCell>
                    <TableCell align="center">{getCodeName(COMMON_CODE.REGION_CODE, row.progressRegionCd)}</TableCell>
                    <TableCell align="center">{getDateStr(row.registeredDate)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="align-center">
            <Pagination count={res?.pagination?.totalPages} showFirstButton showLastButton color='primary' className='w-100 flex-center'/>
            <Button size='medium' variant='outlined' color='primary' className='ml-a'>삭제</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

