import TabPanel from "@/components/_common/TabPanel.tsx";
import {
    Box,
    Button,
    Chip,
    Divider, Fade,
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
    Typography
} from "@mui/material";
import CustomTextfield from "@/components/_common/customMUI/CustomTextfield.tsx";
import CustomDateRange from "@/components/_common/customMUI/CustomDateRange.tsx";
import type {Banner, BannerSearchRequest} from "@/types/type.banner.ts";
import {convertString} from "@/utils/util.date.ts";
import type {ApiResponse, DateType} from "@/types/type.api.ts";

export default function BannerTabPanel({
    tab,
    index,
    state,
    onChange,
    data,
    onCreate,
    onOptionChange,
    onSearch,
    onPageChange,
}:{
    tab: number,
    index: number,
    state: BannerSearchRequest,
    onChange: <K extends keyof BannerSearchRequest>(key: K, value: BannerSearchRequest[K]) => void,
    data : ApiResponse<Banner> | null,
    onCreate : () => void,
    onOptionChange : (row:Banner) => void,
    onSearch : () => void,
    onPageChange : (page: number) => void,
}) {
    return (
        <TabPanel value={tab} index={index} className='flex-col gap-32'>
            {tab === index &&
                <Fade in={tab === index} timeout={250}>
                    <Box>
                    {/* 2-2-1. 조회 영역 */}
                    <div className="search-section flex-col gap-8">
                        <div className="align-center gap-16">
                            <CustomDateRange
                                label={'노출 기간'}
                                startDate={state.publicationStartDate}
                                endDate={state.publicationEndDate}
                                onStartChange={(v:DateType)=>{onChange('publicationStartDate', v)}}
                                onEndChange={(v:DateType)=>{onChange('publicationEndDate', v)}}
                            />
                            <Select
                                label='상시 노출 여부'
                                id='category' value={state.alwaysPublication} onChange={(e)=>{onChange('alwaysPublication', e.target.value)}} size='small' displayEmpty
                                sx={{ width: '20rem' }}
                            >
                                <MenuItem value=''>전체</MenuItem>
                                <MenuItem value='Y'>상시</MenuItem>
                                <MenuItem value='N'>기간</MenuItem>
                            </Select>
                            <Select
                                label='사용 여부'
                                id='category' value={state.used} onChange={(e)=>{onChange('used', e.target.value)}} size='small' displayEmpty
                                sx={{ width: '20rem' }}
                            >
                                <MenuItem value=''>전체</MenuItem>
                                <MenuItem value='Y'>사용</MenuItem>
                                <MenuItem value='N'>미사용</MenuItem>
                            </Select>
                        </div>
                        <CustomTextfield name="keyword" value={state.keyword} onChange={(e)=>{onChange('keyword', e.target.value)}} size='small' placeholder='' sx={{ width: '41.6rem' }} />
                        <Button size='medium' variant='contained' className='ml-a' onClick={onSearch}>조회</Button>
                    </div>
                    {/* 2-2-2. 그리드 영역 */}
                    <div className="grid-section flex-col gap-16">
                        <div className="grid-summary align-center gap-16">
                            <Divider sx={{ flexGrow: 1 }} />
                            <strong className='total-count'>총 <em>{data?.pagination?.totalElements}</em>개</strong>
                        </div>
                        <TableContainer component={Paper}>
                            <Table aria-label="user list table" sx={{ tableLayout: 'fixed', width: '100%', borderCollapse: 'separate' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" width={50}></TableCell>
                                        <TableCell align="center" width={200}>배너 제목</TableCell>
                                        <TableCell align="center" width={200}>배너 설명</TableCell>
                                        <TableCell align="center">배너 이미지</TableCell>
                                        <TableCell align="center" width={200}>링크</TableCell>
                                        <TableCell align="center" width={220}>노출 기간</TableCell>
                                        <TableCell align="center" width={120}>사용 여부</TableCell>
                                        <TableCell align="center" width={70}>관리</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.dataList?.map((row: Banner) => (
                                        <TableRow>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center"><Typography noWrap>{row.title}</Typography></TableCell>
                                            <TableCell align="left"><Typography noWrap>{row.description}</Typography></TableCell>
                                            <TableCell align="center"><img src={`${import.meta.env.VITE_API_URL}/files/${row.imageGuid}`} alt="Banner" style={{ maxWidth: '100%', height: 'auto' }} /></TableCell>
                                            <TableCell align="left"><Typography noWrap>{row.link}</Typography></TableCell>
                                            <TableCell align="center">{convertString(row.publicationStartDate)} ~ {convertString(row.publicationEndDate)}</TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={row.used}
                                                    color={row.used == 'N' ? 'default' : 'success'}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button size='small' variant='outlined' color='primary' sx={{ minWidth: '0 !important' }} onClick={()=>{onOptionChange(row)}}>관리</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div className="align-center">
                            <Pagination
                                page={(data?.pagination?.page ?? 0) + 1}
                                count={data?.pagination?.totalPages}
                                onChange={(_, page) => onPageChange(page)}
                                showFirstButton
                                showLastButton
                                color='primary'
                                className='w-100 flex-center'
                            />
                            <Button size='medium' variant='contained' color='primary' className='ml-a' onClick={onCreate}>생성</Button>
                        </div>
                    </div>
                    </Box>
                </Fade>
            }
        </TabPanel>
    )
}