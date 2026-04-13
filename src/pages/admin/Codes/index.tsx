import {
    Button, Chip,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import useSelectCodes from "@/hooks/admin/codes/useSelectCodes.ts";
import type {CommonCode, CommonCodeItem} from "@/types/type._common.ts";
import CustomTextfield from "@/components/_common/customMUI/CustomTextfield.tsx";
import CodePopup from "@/components/admin/codes/CodePopup.tsx";
import useDisclosure from "@/hooks/_common/useDisclosure.ts";
import {useState} from "react";
import {useModal} from "@/hooks/_common/useModal.ts";

export default function CodeManagementPage(){

    const {
        superCodes,
        currentKey,
        selectedSuper,
        selectedMainCode,
        selectedSubCode,
        mainCodes,
        subCodes,
        mainKeywords,
        subKeywords,
        setMainKeywords,
        setSubKeywords,
        onChangeSuperCode,
        onClickMainRow,
        onClickSubRow,
        refetch,
        used,
        setUsed
    } = useSelectCodes();

    const { isOpen, open, close } = useDisclosure();
    const [codeItem, setCodeItem] = useState<CommonCodeItem>();
    const { alert } = useModal();

    const openPopup = (codeItem?: CommonCodeItem, isUpdate?: boolean ) => {
        if(isUpdate && !codeItem) {
            alert("선택한 행이 없습니다.");
            return;
        }
        setCodeItem(codeItem);
        open();
    }

    const handleClose = (save:boolean) => {
        if(save) refetch();
        close();
    }

    return (
        <>
        <div className="content-box w-100 flex-col gap-32">
                {/* 2-1. 타이틀 */}
                <strong className="title">공통 코드 관리</strong>
                <div className='w-100 h-100 flex-col gap-24'>
                    {/* 2-2. 탑 영역(조회 및 버튼) */}
                    <div className="w-100 top-section">
                        <div className="w-100 align-stretch justify-between">
                            <div className="align-center gap-8">
                                <Select
                                    label='상태'
                                    value={used} onChange={(e)=>{setUsed(e.target.value)}} size='small'
                                    displayEmpty
                                    sx={{ width: '22rem' }}
                                >
                                    <MenuItem value=''>전체</MenuItem>
                                    <MenuItem value='Y'>사용</MenuItem>
                                    <MenuItem value='N'>미사용</MenuItem>
                                </Select>
                                <Select
                                    label='공통코드'
                                    value={currentKey ?? ""}
                                    displayEmpty
                                    onChange={(e)=>{onChangeSuperCode(e.target.value as CommonCode)}} size='small'
                                    sx={{ width: '22rem' }}
                                >
                                    {superCodes.map((item, index) => (
                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <div className="align-center gap-8">
                                <Button size="large"
                                        variant='outlined'
                                        color='primary'
                                        onClick={()=>{openPopup(selectedSuper, true)}}
                                >
                                    수정
                                </Button>
                                <Button size="large"
                                        variant='outlined'
                                        color='primary'
                                        onClick={()=>{openPopup({parentCode: "0000", code: "", name: ""})}}
                                >
                                    생성
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* 2-3. 바텀 영역(그리드) */}
                    <div className="w-100 flex gap-24 bottom-section">
                        <div className="left-area flex-col flex-1 flex-grow gap-8">
                            <div className="search-area align-center justify-between">
                                <CustomTextfield size='small' sx={{ height: '100%', width: '41.6rem' }} label="코드 명" value={mainKeywords} onChange={(e)=>setMainKeywords(e.target.value)} />
                                <Button size='large' variant='contained' color='primary' onClick={()=>{openPopup({parentCode: currentKey, code: "", name: ""})}} >생성</Button>
                            </div>
                            <div className="grid-area flex-col flex-grow gap-8">
                                <Paper sx={{ width: '100%', overflow: 'hidden', border: '1px solid rgba(0, 0, 0, 0.2)' }} elevation={0}>
                                    <TableContainer sx={{ maxHeight: '60vh', minHeight: '60vh' }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" width={60}>구분</TableCell>
                                                    <TableCell align="center">ID</TableCell>
                                                    <TableCell align="center">NAME</TableCell>
                                                    <TableCell align="center">사용여부</TableCell>
                                                    <TableCell align="center">비고</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {mainCodes.map((row, index) => (
                                                    <TableRow
                                                        key={index}
                                                        selected={selectedMainCode?.code == row.code}
                                                        onClick={()=>{onClickMainRow(row)}}
                                                        sx={{ cursor: 'pointer' }}
                                                    >
                                                        <TableCell align="center">{row.order ?? index + 1}</TableCell>
                                                        <TableCell align="center">{row.code}</TableCell>
                                                        <TableCell align="center">{row.name}</TableCell>
                                                        <TableCell align="center">
                                                            <Chip
                                                                label={row.used ? '사용' : '미사용'}
                                                                color={row.used ? 'primary' : 'error'}
                                                                size="small"
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center">{row.remarks}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                                <div className="align-center gap-8 ml-a">
                                    <Button size='large' variant='outlined' color='primary' onClick={()=>{openPopup(selectedMainCode, true)}}>수정</Button>
                                </div>
                            </div>
                        </div>
                        <div className="right-area flex-col flex-1 flex-grow gap-8">
                            <div className="search-area align-center justify-between">
                                <CustomTextfield size='small' sx={{ height: '100%', width: '41.6rem' }} label="상세코드 명" value={subKeywords} onChange={(e)=>setSubKeywords(e.target.value)} />
                                <Button size='large' variant='contained' color='primary' onClick={()=>{openPopup(selectedMainCode ? {parentCode: selectedMainCode?.code, code: "", name: ""} : undefined, true)}}>생성</Button>
                            </div>
                            <div className="grid-area flex-col flex-grow gap-8">
                                <Paper sx={{ width: '100%', overflow: 'hidden', border: '1px solid rgba(0, 0, 0, 0.2)' }} elevation={0}>
                                    <TableContainer sx={{ maxHeight: '60vh', minHeight: '60vh' }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" width={60}>구분</TableCell>
                                                    <TableCell align="center">ID</TableCell>
                                                    <TableCell align="center">NAME</TableCell>
                                                    <TableCell align="center">사용여부</TableCell>
                                                    <TableCell align="center" width={400}>비고</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {subCodes.map((row, index) => (
                                                    <TableRow
                                                        key={index}
                                                        selected={selectedSubCode?.code == row.code}
                                                        sx={{ cursor: 'pointer' }}
                                                        onClick={()=>{onClickSubRow(row)}}
                                                    >
                                                        <TableCell align="center">{row.order ?? index + 1}</TableCell>
                                                        <TableCell align="center">{row.code}</TableCell>
                                                        <TableCell align="center">{row.name}</TableCell>
                                                        <TableCell align="center">
                                                            <Chip
                                                                label={row.used ? '사용' : '미사용'}
                                                                color={row.used ? 'primary' : 'error'}
                                                                size="small"
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center">{row.remarks}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                                <div className="align-center gap-8 ml-a">
                                    <Button size='large' variant='outlined' color='primary' onClick={()=>{openPopup(selectedSubCode, true)}}>수정</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CodePopup key={isOpen ? 'open' : 'close'} isOpen={isOpen} onClose={handleClose} item={codeItem}/>
        </>
    )
}

