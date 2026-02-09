import WebPopup from "@/components/_common/popup/WebPopup";
import { type ApplicationFormDetail } from "@/types/type.projects"
import { useState, useEffect } from "react";
import CustomTextfield from "@/components/_common/customMUI/CustomTextfield";
import CustomRadioGroup from "@/components/_common/customMUI/CustomRadioGroup"
import { useFormState } from '@/hooks/_common/common.hook';
import { Select, MenuItem, Divider, IconButton, type SelectChangeEvent, type ChangeEvent } from "@mui/material";
import { AddCircle, Remove } from '@mui/icons-material';
import { COMMON_CODE } from '@/types/const';
import { getSelectOptions } from "@/utils/util._common";
import { type SelectComponentProps } from "@/types/type._common";

interface  AdditionnalFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newForm:ApplicationFormDetail) => void;
};

const useYn = [
    {label: "사용", value: "Y"},
    {label: "미사용", value: "N"}
]

function PopupField({
    title,
    subText,
    children
}: {title?: string, subText?:string, children?: React.ReactNode}) {
    return <div className='filter-box flex-col'>
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
}

function Item({
    index,
    onChange,
}: {index: number; onChange: (index1:number, e?:ChangeEvent) => void}){
    return <div className="field-box flex-col mt-5">
                <div className="align-center">
                    <CustomTextfield placeholder="항목" onChange={(e)=>onChange(index, e)}/>
                    <IconButton size='small' onClick={()=>onChange(index)}><Remove sx={{ fontSize: 24, color: 'text.disabled' }} /></IconButton>
                </div>
            </div>
}

export default function AdditionalFormPopup ({
    isOpen,
    onClose,
    onSubmit,
}: AdditionnalFormPopupProps) {
    const initData:ApplicationFormDetail =  {
        typeCd: '7001',
        title: '',
        helpText: '',
        itemList: [''],
    }
    const [typeCdOption, setTypeCdOption] = useState<SelectComponentProps[]>([]);
    const [useHelpText, setUseHelpText] = useState<boolean>(true);
    const [useItemList, setUseItemList] = useState<boolean>(false);

    const initialize = () => {
        setTypeCdOption(getSelectOptions(COMMON_CODE.APPLICATION_FORM_TYPE));
    };
    useEffect(()=>{
        initialize();
    }, []);

    const onChangeTypeCd = (event: SelectChangeEvent)=> {
        const value = event.target.value;
        if(value==="7001") {
            setUseItemList(false);
        } else {
            setUseItemList(true);
        }
        handleChange("typeCd", value)
    }

    const onChangeUseHelpText = (_,value:string) => {
        if(value==="Y") {
            setUseHelpText(true);
        } else {
            setUseHelpText(false);
        }
        handleChange("helpText", '');
    }

    const onChangeItem = (index1:number, e?:ChangeEvent ) => {
        let newItemList: string[] = [];
        if(e){
            const value = e.target.value;
            newItemList = (state.itemList ?? []).map((item, index2)=> index1===index2 ? value : item);

        } else {
            newItemList = (state.itemList ?? []).filter((_, index2) => index1 !== index2);
        }
        handleChange("itemList", newItemList);
    }

    const onClosePopup = () => {
        setState(initData);
        setUseHelpText(true);
        setUseItemList(false);
        onClose();
    }

    const { state, setState, handleChange, ...rest } = useFormState(initData);
    return <WebPopup isOpen={isOpen} onClose={onClosePopup} title={"추가양식"} onSubmit={()=>onSubmit(state)}>
        <div className='left-filter-bar flex-col flex-grow' style={{width:'100%'}}>
            <PopupField title={"제목"}> 
                <CustomTextfield placeholder="제목" onChange={(e)=>handleChange("title", e.target.value)}/>
            </PopupField>
            <PopupField title={"타입"} subText={"텍스트: 주관식 / 선택박스, 라디오버튼: 객관식"}> 
                <Select size="medium" className="w-100" defaultValue={initData.typeCd} 
                onChange={onChangeTypeCd} > 
                    {typeCdOption.map((item)=><MenuItem value={item.value}>{item.label}</MenuItem>)}
                </Select>
            </PopupField>
            <Divider />
            <PopupField title={"도움말"}> 
                <CustomRadioGroup values={useYn} defaultValue={useYn[0].value} onChange={onChangeUseHelpText}/>
                {useHelpText && <CustomTextfield placeholder="도움말" onChange={(e)=>handleChange("helpText", e.target.value)}/>}
            </PopupField>
            {useItemList && <PopupField title={"선택항목"} subText="최대 5개">
                <div>
                {state.itemList?.map((_, index)=> <Item key={index} index={index} onChange={onChangeItem}/>)}
                <IconButton size='small' onClick={()=>{handleChange("itemList", state.itemList?.concat(''))}}><AddCircle sx={{ fontSize: 35, color: 'primary.main' }} /></IconButton>
                </div>
            </PopupField>}
            
        </div>
    </WebPopup>

}