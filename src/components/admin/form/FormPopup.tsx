import WebPopup from "@/components/_common/popup/WebPopup.tsx";
import CustomTextfield from "@/components/_common/customMUI/CustomTextfield.tsx";
import { MenuItem, Select } from "@mui/material";
import type { FormItem } from "@/types/type.forms.ts";
import useFormPopup from "@/hooks/admin/form/useFormPopup.ts";

export default function FormPopup({
    isOpen,
    onClose,
    item,
}: {
    isOpen: boolean;
    onClose: (saved: boolean) => void;
    item: FormItem | null;
}) {
    const { state, handleChange, reset, handleSave } = useFormPopup(item, onClose);

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
