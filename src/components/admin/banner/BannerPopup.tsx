import WebPopup from "@/components/_common/popup/WebPopup.tsx";
import CustomTextfield from "@/components/_common/customMUI/CustomTextfield.tsx";
import {Button, FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import type {Banner} from "@/types/type.banner.ts";
import type {DateType} from "@/types/type.api.ts";
import CustomDateRange from "@/components/_common/customMUI/CustomDateRange.tsx";
import useBannerPopup from "@/hooks/admin/banner/useBannerPopup.ts";

export default function BannerPopup({
    isOpen,
    onClose,
    data,
}:{
    isOpen: boolean;
    onClose: () => void;
    data: Banner | null;
}){

    const {state, handelSave, handleDelete, handleChange, inputRefs, fileStates, fileRef, fileName} = useBannerPopup(data, onClose);

    return (
        <WebPopup
            size='medium'
            isOpen={isOpen}
            onClose={onClose}
            title='배너 설정'
            submitText={'등록'}
            onDelete={state.bannerGuid ? handleDelete : undefined}
            onSubmit={handelSave}
        >
            <div className="admin-popup">
                <div className="description-list flex-col gap-4">
                    <dl className='align-stretch gap-4'>
                        <dt style={{ height: 'auto' }}>배너 이미지</dt>
                        <dd className='w-100 flex-col gap-4' style={{ padding: '1.3rem 0.8rem' }}>
                            <div className="align-stretch gap-8">
                                <CustomTextfield size='small' placeholder='이미지를 업로드해 주세요.' value={fileStates['banner']?.file?.name ?? fileName} />
                                <Button size='medium' variant='contained' color='primary' onClick={()=>{inputRefs.current['banner']?.click()}}>업로드</Button>
                                <input hidden type='file' ref={fileRef} />
                            </div>
                            <div className='help-text align-center'>
                                <span className='dot'></span>
                                파일 정보에 관련된 헬프 텍스트를 작성하는 란입니다.
                            </div>
                        </dd>
                    </dl>
                    <dl className='align-center gap-4'>
                        <dt>제목</dt>
                        <dd className='w-100'>
                            <CustomTextfield value={state.title} onChange={(e)=>{handleChange('title', e.target.value)}} size='small' />
                        </dd>
                    </dl>
                    <dl className='align-center gap-4'>
                        <dt>설명</dt>
                        <dd className='w-100'>
                            <CustomTextfield value={state.description} onChange={(e)=>{handleChange('description', e.target.value)}} size='small' />
                        </dd>
                    </dl>
                    <dl className='align-center gap-4'>
                        <dt>링크</dt>
                        <dd className='w-100'>
                            <CustomTextfield value={state.link} onChange={(e)=>{handleChange('link', e.target.value)}} size='small' />
                        </dd>
                    </dl>
                    <dl className='align-center gap-4'>
                        <dt>노출 상태</dt>
                        <dd className='w-100'>
                            <FormControl>
                                <RadioGroup row aria-labelledby='expose-status-radio-group-label' defaultValue='expose' value={state.used} onChange={(e)=>{handleChange('used', e.target.value)}}>
                                    <FormControlLabel value='Y' control={<Radio />} label='노출' />
                                    <FormControlLabel value='N' control={<Radio />} label='비노출' />
                                </RadioGroup>
                            </FormControl>
                        </dd>
                    </dl>
                    <dl className='align-center gap-4'>
                        <dt>상시 여부</dt>
                        <dd className='w-100'>
                            <FormControl>
                                <RadioGroup row aria-labelledby='allTime-status-radio-group-label' defaultValue='true' value={state.alwaysPublication} onChange={(e)=>{handleChange('alwaysPublication', e.target.value)}}>
                                    <FormControlLabel value='Y' control={<Radio />} label='상시' />
                                    <FormControlLabel value='N' control={<Radio />} label='기간' />
                                </RadioGroup>
                            </FormControl>
                        </dd>
                    </dl>
                    <dl className='align-center gap-4'>
                        <dt>노출 기간</dt>
                        <dd className='w-100 align-center gap-8'>
                            <CustomDateRange label={'노출 기간'} startDate={state.publicationStartDate} endDate={state.publicationEndDate} onStartChange={(v:DateType)=>{handleChange('publicationStartDate', v)}} onEndChange={(v:DateType)=>{handleChange('publicationEndDate', v)}}/>
                        </dd>
                    </dl>
                </div>
            </div>
        </WebPopup>
    )
}