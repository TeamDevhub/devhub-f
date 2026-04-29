import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import FieldGroup from '@/components/_design/FieldGroup';
import FormField from '@/components/_design/FormField';
import { Button, Chip, Divider, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';
import useDisclosure from "@/hooks/_common/useDisclosure.ts";
import useForms from "@/hooks/admin/form/useForms.ts";
import useDeleteForm from "@/hooks/admin/form/useDeleteForm.ts";
import FormPopup from "@/components/admin/form/FormPopup.tsx";
import type { FormItem } from "@/types/type.forms.ts";

function getStatusColor(usedYn: 'Y' | 'N'): 'primary' | 'error' {
    return usedYn === 'Y' ? 'primary' : 'error';
}

export default function FormManagementPage() {

    const { isOpen, open, close } = useDisclosure();
    const [selectedRow, setSelectedRow] = useState<FormItem | null>(null);
    const [popupItem, setPopupItem] = useState<FormItem | null>(null);

    const { res, state, handleChange, refetch } = useForms();
    const { handleDelete } = useDeleteForm(() => {
        refetch();
        setSelectedRow(null);
    });

    const openCreate = () => {
        setPopupItem(null);
        open();
    };

    const openEdit = () => {
        if (!selectedRow) return;
        setPopupItem(selectedRow);
        open();
    };

    const handleClose = (saved: boolean) => {
        if (saved) refetch();
        close();
    };

    return (
        <div className="content-box w-100 flex-col gap-32">
            <strong className="title">신청 양식 관리</strong>
            <div className='w-100 h-100 flex gap-32'>
                {/* 왼쪽 영역(그리드) */}
                <div className="left-section flex-col flex-1 flex-grow">
                    <div className="search-area align-center justify-between">
                        <Select
                            label='코드 명'
                            id='category'
                            value={state.codeName}
                            onChange={(e) => handleChange('codeName', e.target.value)}
                            size='small'
                            displayEmpty
                            renderValue={(selected) => selected === '' ? '코드 네임' : selected}
                            sx={{ width: '30rem' }}
                        >
                            <MenuItem value=''>코드 네임</MenuItem>
                        </Select>
                        <Button size='large' variant='contained' color='primary' onClick={openCreate}>생성</Button>
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
                                        {res.map((row) => (
                                            <TableRow
                                                key={row.fieldName}
                                                selected={selectedRow?.fieldName === row.fieldName}
                                                onClick={() => setSelectedRow(row)}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell align="center">{row.classify}</TableCell>
                                                <TableCell align="center">{row.fieldName}</TableCell>
                                                <TableCell align="center">{row.type}</TableCell>
                                                <TableCell align="center">
                                                    <Chip
                                                        label={row.usedYn === 'Y' ? '사용' : '미사용'}
                                                        color={getStatusColor(row.usedYn)}
                                                        size="small"
                                                    />
                                                </TableCell>
                                                <TableCell align="center">{row.defaultFieldYn === 'Y' ? '예' : '아니오'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        <div className="align-center gap-8 ml-a">
                            <Button
                                size='large'
                                variant='outlined'
                                color='primary'
                                disabled={!selectedRow}
                                onClick={() => selectedRow && handleDelete(selectedRow.fieldName)}
                            >
                                삭제
                            </Button>
                            <Button
                                size='large'
                                variant='contained'
                                color='primary'
                                disabled={!selectedRow}
                                onClick={openEdit}
                            >
                                수정
                            </Button>
                        </div>
                    </div>
                </div>
                {/* 오른쪽 영역(미리보기) */}
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

            <FormPopup key={isOpen ? 'open' : 'close'} isOpen={isOpen} onClose={handleClose} item={popupItem} />
        </div>
    );
}
