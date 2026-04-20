import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import WebPopup from '@/components/_common/popup/WebPopup';
import FieldGroup from '@/components/design/FieldGroup';
import FormField from '@/components/design/FormField';
import LeftMenuBar from '@/components/design/LeftMenuBar'
import { Clear } from '@mui/icons-material';
import { Button, Chip, Divider, FormControl, FormControlLabel, IconButton, MenuItem, Paper, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, type SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'
import useDisclosure from "@/hooks/_common/useDisclosure.ts";
import useForms from "@/hooks/admin/form/useForms.ts";

export default function FormManagementPage(){

    const { isOpen, open, close } = useDisclosure();
    const {
        res,
        state,
        handleChange,
    } = useForms();
    return (
        <div className="content-box w-100 flex-col gap-32">
            {/* 2-1. 타이틀 */}
            <strong className="title">신청 양식 관리</strong>
            <div className='w-100 h-100 flex gap-32'>
                {/* 2-2. 왼쪽 영역(그리드) */}
                <div className="left-section flex-col flex-1 flex-grow">
                    <div className="search-area align-center justify-between">
                        <Select
                            label='코드 명'
                            id='category' value={state.codeName} onChange={(e)=>{handleChange("codeName",e.target.value)}} size='small' displayEmpty
                            renderValue={(selected) => selected === '' ? '코드 네임' : selected }
                            sx={{ width: '30rem' }}
                        >
                            <MenuItem value=''>코드 네임</MenuItem>
                        </Select>
                        <Button size='large' variant='contained' color='primary' onClick={open}>생성</Button>
                    </div>
                    <div className="grid-area flex-col flex-grow gap-8">
                        <Paper sx={{ width: '100%', overflow: 'hidden', border: '1px solid rgba(0, 0, 0, 0.2)' }} elevation={0}>
                            <TableContainer sx={{ maxHeight: '65vh', minHeight: '65vh' }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" width={70}>구분</TableCell>
                                            <TableCell align="center">필드 명</TableCell>
                                            <TableCell align="center">타입</TableCell>
                                            <TableCell align="center">사용여부</TableCell>
                                            <TableCell align="center">기본 필드 여부</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {res.map((row, index) => (
                                            <TableRow
                                                key={index}
                                                selected={selectedRow === index}
                                                onClick={() => setSelectedRow(index)}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell align="center">{row.classify}</TableCell>
                                                <TableCell align="center">{row.fieldName}</TableCell>
                                                <TableCell align="center">{row.type}</TableCell>
                                                <TableCell align="center">
                                                    <Chip
                                                        label={row.usedYn}
                                                        color={getStatusColor(row.usedYn)}
                                                        size="small"
                                                    />
                                                </TableCell>
                                                <TableCell align="center">{row.defaultFieldYn}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        <div className="align-center gap-8 ml-a">
                            <Button size='large' variant='outlined' color='primary'>삭제</Button>
                            <Button size='large' variant='contained' color='primary'>수정</Button>
                        </div>
                    </div>
                </div>
                {/* 2-3. 오른쪽 영역(미리보기) */}
                <div className="right-section flex-col flex-1">
                    <div className="title-area align-center">
                        <strong>미리보기</strong>
                        <Divider sx={{ flexGrow: 1 }} />
                    </div>
                    <div className="form-wrap flex-col">
                        <FormField label='경험' helpText='지원자가 작성해야 하는 항목을 선택하세요.</br> 기본 양식을 선택하거나, 원하면 새로운 양식을 만들 수 있어요.(최대 3개)'>
                            <FieldGroup>
                                <CustomTextfield type='textarea' placeholder='경험을 입력해 주세요.' />
                            </FieldGroup>
                        </FormField>
                        <FormField label='경험' helpText='지원자가 작성해야 하는 항목을 선택하세요.</br> 기본 양식을 선택하거나, 원하면 새로운 양식을 만들 수 있어요.(최대 3개)'>
                            <FieldGroup>
                                <CustomTextfield type='textarea' placeholder='경험을 입력해 주세요.' />
                            </FieldGroup>
                        </FormField>
                    </div>
                </div>
            </div>
        </div>
    )
}

