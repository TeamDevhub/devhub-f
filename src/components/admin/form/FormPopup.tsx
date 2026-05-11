import WebPopup from "@/components/_common/popup/WebPopup.tsx";
import CustomTextfield from "@/components/_common/customMUI/CustomTextfield.tsx";
import { Button, FormControl, FormControlLabel, IconButton, MenuItem, Radio, RadioGroup, Select } from "@mui/material";
import type { FormFieldType, FormItem } from "@/types/type.forms.ts";
import useFormPopup from "@/hooks/admin/form/useFormPopup.ts";
import { Clear } from "@mui/icons-material";

const OPTION_TYPES: FormFieldType[] = ['radio', 'select', 'checkbox'];

function OptionsField({
    options,
    onChange,
    onAdd,
    onRemove,
}: {
    options: string[];
    onChange: (idx: number, value: string) => void;
    onAdd: () => void;
    onRemove: (idx: number) => void;
}) {
    return (
        <dl className='align-stretch gap-4'>
            <dt>선택항목</dt>
            <dd className='w-100 flex-col gap-4'>
                {options.map((opt, idx) => (
                    <div key={idx} className="flex gap-8">
                        <CustomTextfield
                            size='small'
                            value={opt}
                            onChange={(e) => onChange(idx, e.target.value)}
                        />
                        <IconButton size="small" className="w-fit" onClick={() => onRemove(idx)}>
                            <Clear sx={{ fontSize: 25, color: "rgba(0, 0, 0, 0.3)" }} />
                        </IconButton>
                    </div>
                ))}
                <Button size='medium' variant='contained' color='primary' onClick={onAdd}>추가</Button>
            </dd>
        </dl>
    );
}

export default function FormPopup({
    isOpen,
    onClose,
    item,
}: {
    isOpen: boolean;
    onClose: (saved: boolean) => void;
    item: FormItem | null;
}) {

    const { state, handleChange, reset, handleSave, options, handleAddOption, handleRemoveOption, handleOptionChange } = useFormPopup(item, onClose);

    const handleClose = () => {
        reset();
        onClose(false);
    };

    return (
        <WebPopup
            size="medium"
            isOpen={isOpen}
            onClose={handleClose}
            title={item ? '양식 수정' : '양식 생성'}
            submitText={item ? '수정' : '생성'}
            onSubmit={handleSave}
        >
            <div className="admin-popup">
                <div className="description-list flex-col gap-4">
                    <dl className="align-center gap-4">
                        <dt>필드 명</dt>
                        <dd className="w-100">
                            <CustomTextfield
                                value={state.fieldName}
                                onChange={(e) => handleChange('fieldName', e.target.value)}
                                size="small"
                                readonly={!!item}
                            />
                        </dd>
                    </dl>
                    <dl className="align-center gap-4">
                        <dt>타입</dt>
                        <dd className="w-100">
                            <Select
                                value={state.type}
                                onChange={(e) => handleChange('type', e.target.value)}
                                size="small"
                                sx={{
                                    width: '100%',
                                    '& legend': { display: 'none' },
                                    '& fieldset': { top: 0 },
                                }}
                            >
                                <MenuItem value="text">text</MenuItem>
                                <MenuItem value="textarea">textarea</MenuItem>
                                <MenuItem value="radio">radio</MenuItem>
                                <MenuItem value="select">select</MenuItem>
                                <MenuItem value="checkbox">checkbox</MenuItem>
                            </Select>
                        </dd>
                    </dl>
                    {OPTION_TYPES.includes(state.type) && (
                        <OptionsField
                            options={options}
                            onChange={handleOptionChange}
                            onAdd={handleAddOption}
                            onRemove={handleRemoveOption}
                        />
                    )}
                    <dl className='align-stretch gap-4'>
                        <dt>도움말</dt>
                        <dd className='w-100 flex-col gap-4' style={{ padding: '1.3rem 0.8rem' }}>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby='help-radio-group-label'
                                value={state.helpYn}
                                onChange={(e) => handleChange('helpYn', e.target.value)}
                            >
                            <FormControlLabel value='true' control={<Radio />} label='사용' />
                            <FormControlLabel value='false' control={<Radio />} label='미사용' />
                            </RadioGroup>
                        </FormControl>
                        {state.helpYn === 'true' && (
                            <CustomTextfield
                                size='small'
                                value={state.helpText ?? ''}
                                onChange={(e) => handleChange('helpText', e.target.value)}
                            />
                        )}
                        </dd>
                    </dl>
                    <dl className="align-center gap-4">
                        <dt>사용여부</dt>
                        <dd className="w-100">
                            <Select
                                value={state.usedYn}
                                onChange={(e) => handleChange('usedYn', e.target.value as 'Y' | 'N')}
                                size="small"
                                sx={{
                                    width: '100%',
                                    '& legend': { display: 'none' },
                                    '& fieldset': { top: 0 },
                                }}
                            >
                                <MenuItem value="Y">사용</MenuItem>
                                <MenuItem value="N">미사용</MenuItem>
                            </Select>
                        </dd>
                    </dl>
                    <dl className="align-center gap-4">
                        <dt>기본 필드 여부</dt>
                        <dd className="w-100">
                            <Select
                                value={state.defaultFieldYn}
                                onChange={(e) => handleChange('defaultFieldYn', e.target.value as 'Y' | 'N')}
                                size="small"
                                sx={{
                                    width: '100%',
                                    '& legend': { display: 'none' },
                                    '& fieldset': { top: 0 },
                                }}
                            >
                                <MenuItem value="Y">예</MenuItem>
                                <MenuItem value="N">아니오</MenuItem>
                            </Select>
                        </dd>
                    </dl>
                </div>
            </div>
        </WebPopup>
    );
}
