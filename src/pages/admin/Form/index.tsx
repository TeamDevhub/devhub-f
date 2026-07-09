import CustomTextfield from '@/components/_common/customMUI/CustomTextfield';
import FieldGroup from '@/components/_design/FieldGroup';
import FormField from '@/components/_design/FormField';
import { Button, Checkbox, Chip, Divider, FormControl, FormControlLabel, MenuItem, Paper, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';
import useDisclosure from "@/hooks/_common/useDisclosure.ts";
import useForms from "@/hooks/admin/form/useForms.ts";
import useDeleteForm from "@/hooks/admin/form/useDeleteForm.ts";
import FormPopup from "@/components/admin/form/FormPopup.tsx";
import type { FormItem } from "@/types/type.forms.ts";

function getStatusColor(usedYn: 'Y' | 'N'): 'primary' | 'error' {
    return usedYn === 'Y' ? 'primary' : 'error';
}

function FormPreview({ item }: { item: FormItem | null }) {
    const [radioValue, setRadioValue] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [checkedValues, setCheckedValues] = useState<string[]>([]);

    if (!item) {
        return (
            <div style={{ color: 'rgba(0,0,0,0.38)', padding: '2rem', textAlign: 'center' }}>
                항목을 선택하면 미리보기가 표시됩니다.
            </div>
        );
    }

    const helpText = item.helpYn === 'true' ? item.helpText : undefined;
    const options = item.options ?? [];

    const toggleCheckbox = (value: string) => {
        setCheckedValues(prev =>
            prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
    };

    const renderInput = () => {
        switch (item.type) {
            case 'text':
                return <CustomTextfield size='small' placeholder={item.fieldName} />;
            case 'textarea':
                return <CustomTextfield type='textarea' placeholder={item.fieldName} />;
            case 'radio':
                return (
                    <FormControl>
                        <RadioGroup value={radioValue} onChange={(e) => setRadioValue(e.target.value)}>
                            {options.map((opt, idx) => (
                                <FormControlLabel key={idx} value={opt} control={<Radio />} label={opt} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                );
            case 'select':
                return (
                    <Select
                        size='small'
                        displayEmpty
                        value={selectValue}
                        onChange={(e) => setSelectValue(e.target.value)}
                        sx={{ width: '100%', '& legend': { display: 'none' }, '& fieldset': { top: 0 } }}
                    >
                        <MenuItem value=''>선택하세요</MenuItem>
                        {options.map((opt, idx) => (
                            <MenuItem key={idx} value={opt}>{opt}</MenuItem>
                        ))}
                    </Select>
                );
            case 'checkbox':
                return (
                    <FormControl>
                        {options.map((opt, idx) => (
                            <FormControlLabel
                                key={idx}
                                control={<Checkbox checked={checkedValues.includes(opt)} onChange={() => toggleCheckbox(opt)} />}
                                label={opt}
                            />
                        ))}
                    </FormControl>
                );
        }
    };

    return (
        <FormField label={item.fieldName} helpText={helpText}>
            <FieldGroup>
                {renderInput()}
            </FieldGroup>
        </FormField>
    );
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
                                                key={row.applicationFormGuid ?? String(row.classify)}
                                                selected={selectedRow?.classify === row.classify}
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
                                onClick={() => selectedRow?.applicationFormGuid && handleDelete(selectedRow.applicationFormGuid)}
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
                        <FormPreview item={selectedRow} />
                    </div>
                </div>
            </div>

            <FormPopup key={isOpen ? 'open' : 'close'} isOpen={isOpen} onClose={handleClose} item={popupItem} />
        </div>
    );
}
