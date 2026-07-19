import WebPopup from "@/components/_common/popup/WebPopup";
import {type ApplicationFormCreate} from "@/types/type.projects"
import {type ChangeEvent, useState} from "react";
import CustomTextfield from "@/components/_common/customMUI/CustomTextfield";
import CustomRadioGroup from "@/components/_common/customMUI/CustomRadioGroup"
import useFormState from '@/hooks/_common/useFormState.ts';
import {Divider, IconButton, MenuItem, Select, type SelectChangeEvent} from "@mui/material";
import {AddCircle, Remove} from '@mui/icons-material';
import {APPLICATION_FORM_TYPE, APPLICATION_FORM_TYPE_OPTIONS, USE_YN_OPTIONS, type ApplicationFormType}  from '@/constants/projectCreate'
import { Validators } from '@/utils/util._common';

interface  AdditionnalFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newForm:ApplicationFormCreate) => void;
}

function PopupField({
    title,
    subText,
    children
}: {title?: string, subText?:string, children?: React.ReactNode}) {
    return (
    <div className='filter-box flex-col'>
        <div className='filter-title align-start justify-between'>
        <div className='text-box flex-col'>
            {title && <strong>{title}</strong>}
            {subText && <p>{subText}</p>}
        </div>
        </div>
        <div className='filter-options align-center flex-wrap'>
            {children ?? children}
        </div>
    </div>
    )
}

function Item({
    index,
    onChange,
}: {index: number; onChange: (index1:number, e?:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void}){
    const [value, setValue] = useState<string>('');
    const onHandleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
        onChange?.(index, e);
    }
    return (
        <div className="field-box flex-col mt-5">
            <div className="align-center">
                <CustomTextfield placeholder="항목" onChange={onHandleChange} value={value}/>
                <IconButton size='small' onClick={()=>onChange(index)}><Remove sx={{ fontSize: 24, color: 'text.disabled' }} /></IconButton>
            </div>
        </div>
    )
}

export default function AdditionalFormPopup ({
    isOpen,
    onClose,
    onSubmit,
}: AdditionnalFormPopupProps) {
    const initData:ApplicationFormCreate =  {
        typeCd: APPLICATION_FORM_TYPE.SHORTTEXT,
        title: '',
        helpText: '',
        itemList: [''],
    }
    const [useHelpText, setUseHelpText] = useState<boolean>(true);
    const [useItemList, setUseItemList] = useState<boolean>(false);


    const onChangeTypeCd = (event: SelectChangeEvent)=> {
        const value = event.target.value as ApplicationFormType;
        const needItemList = value === APPLICATION_FORM_TYPE.SELECTBOX || value === APPLICATION_FORM_TYPE.CHECKBOX;
        setUseItemList(needItemList);
        handleChange("typeCd", value)
    }

    const onChangeUseHelpText = (_:ChangeEvent<HTMLInputElement>, value:string) => {
        if(value==="Y") {
            setUseHelpText(true);
        } else {
            setUseHelpText(false);
        }
        handleChange("helpText", '');
    }

    const onChangeItem = (index1:number, e?:ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        let newItemList: string[];
        if(e){
            const value = e.target.value;
            newItemList = (state.itemList ?? []).map((item, index2)=> index1===index2 ? value : item);

        } else {
            newItemList = (state.itemList ?? []).filter((_, index2) => index1 !== index2);
        }
        handleChange("itemList", newItemList);
    }

    const onClosePopup = () => {
        reset();
        setUseHelpText(true);
        setUseItemList(false);
        onClose();
    }

    const onHandleSubmit = () => {
        if (checkError()) return false;

        const {helpText, itemList, ...restState } = state;
        const cleanState = {...restState} as ApplicationFormCreate;
        if(helpText) {
            cleanState.helpText = helpText;
        }
        if(itemList && itemList.filter(item=>item).length > 0) {
            cleanState.itemList = itemList
        }
        onSubmit(cleanState);
        return true;
    }

    const validations = { title: [Validators.required()] };
    const { state, reset, errors, handleChange, checkError } = useFormState(initData, { validations, mode: 'manual' });
    return (
        <WebPopup isOpen={isOpen} onClose={onClosePopup} title={"추가양식"} onSubmit={onHandleSubmit}>
            <div className='left-filter-bar flex-col flex-grow' style={{width:'100%'}}>
                <PopupField title={"제목"}>
                    <CustomTextfield
                      placeholder="제목"
                      onChange={(e)=>handleChange("title", e.target.value)}
                      value={state.title}
                      error={!!errors.title}
                      helperText={errors.title}
                    />
                </PopupField>
                <PopupField title={"타입"} subText={"텍스트: 주관식 / 선택박스, 라디오버튼: 객관식"}> 
                    <Select size="medium" className="w-100" defaultValue={initData.typeCd} 
                    onChange={onChangeTypeCd} > 
                        {APPLICATION_FORM_TYPE_OPTIONS.map((item)=><MenuItem value={item.value}>{item.label}</MenuItem>)}
                    </Select>
                </PopupField>
                <Divider />
                <PopupField title={"도움말"}> 
                    <CustomRadioGroup values={USE_YN_OPTIONS} defaultValue={USE_YN_OPTIONS[0].value} onChange={onChangeUseHelpText}/>
                    {useHelpText && <CustomTextfield placeholder="도움말" onChange={(e)=>handleChange("helpText", e.target.value)} value={state.helpText}/>}
                </PopupField>
                {useItemList && <PopupField title={"선택항목"} subText="최대 5개">
                    <div>
                    {state.itemList?.map((_, index)=> <Item key={index} index={index} onChange={onChangeItem}/>)}
                    <IconButton size='small' onClick={()=>{handleChange("itemList", state.itemList?.concat(''))}}><AddCircle sx={{ fontSize: 35, color: 'primary.main' }} /></IconButton>
                    </div>
                </PopupField>}
                
            </div>
        </WebPopup>
    )

}