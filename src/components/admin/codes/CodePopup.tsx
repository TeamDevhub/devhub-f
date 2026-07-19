import WebPopup from "@/components/_common/popup/WebPopup.tsx";
import CustomTextfield from "@/components/_common/customMUI/CustomTextfield.tsx";
import {MenuItem, Select} from "@mui/material";
import type {CommonCodeItem} from "@/types/type._common.ts";
import useCodePopup from "@/hooks/admin/codes/useCodePopup.ts";

export default function CodePopup({
    isOpen,
    onClose,
    item
}:{
    isOpen:boolean;
    onClose:(save:boolean) => void;
    item?:CommonCodeItem;
}) {

    const { state, handleChange, reset, errors, handleSave } = useCodePopup(item, onClose);

    const handleClose = () => {
        reset();
        onClose(false);
    }

    return (
        <WebPopup
            size='medium'
            isOpen={isOpen}
            onClose={handleClose}
            title='공통코드 생성'
            submitText={item && item.code ? '수정' : '생성'}
            onSubmit={handleSave}
        >
            <div className="admin-popup">
                <div className="description-list flex-col gap-4">
                    <dl className='align-center gap-4'>
                        <dt>상위 코드</dt>
                        <dd className='w-100'>
                            <CustomTextfield value={state.parentCode} onChange={(e)=>{handleChange('parentCode', e.target.value)}} size='small' readonly error={!!errors.parentCode} helperText={errors.parentCode} />
                        </dd>
                    </dl>
                    <dl className='align-center gap-4'>
                        <dt>코드</dt>
                        <dd className='w-100'>
                            <CustomTextfield value={state.code} onChange={(e)=>{handleChange('code', e.target.value)}} size='small' error={!!errors.code} helperText={errors.code} />
                        </dd>
                    </dl>
                    <dl className='align-center gap-4'>
                        <dt>이름</dt>
                        <dd className='w-100'>
                            <CustomTextfield value={state.name} onChange={(e)=>{handleChange('name', e.target.value)}} size='small' />
                        </dd>
                    </dl>
                    <dl className='align-center gap-4'>
                        <dt>사용여부</dt>
                        <dd className='w-100'>
                            <Select
                                id='category' value={state.used ? "Y" : "N"} onChange={(e)=>{handleChange('used', e.target.value == 'Y')}} size='small' displayEmpty
                                sx={{
                                    width: '100%',
                                    '& legend': { display: 'none' },
                                    '& fieldset': { top: 0 },
                                }}
                            >
                                <MenuItem value='Y'>사용</MenuItem>
                                <MenuItem value='N'>미사용</MenuItem>
                            </Select>
                        </dd>
                    </dl>
                    <dl className='align-center gap-4'>
                        <dt>정렬</dt>
                        <dd className='w-100'>
                            <CustomTextfield value={state.order} onChange={(e)=>{handleChange('order', e.target.value)}} size='small' />
                        </dd>
                    </dl>
                    <dl className='align-center gap-4'>
                        <dt>비고</dt>
                        <dd className='w-100'>
                            <CustomTextfield value={state.remarks} onChange={(e)=>{handleChange('remarks', e.target.value)}} size='small' />
                        </dd>
                    </dl>
                </div>
            </div>
        </WebPopup>
    )
}