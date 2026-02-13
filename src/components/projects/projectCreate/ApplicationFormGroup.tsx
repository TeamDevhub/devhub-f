import {Checkbox, FormControlLabel, FormGroup} from "@mui/material"
import {useState} from "react"
import {type ApplicationFormBasic} from '@/types/type.projects';
import useSelectApplicationForms from "@/hooks/projects/useSelectApplicationForms"

interface CustomCheckboxGroupProps {
    onChange?: (newValues: string[]) => void;
}

export default function ApplicationFormGroup({ onChange }: CustomCheckboxGroupProps) {
    const { res } = useSelectApplicationForms({customYn: 'N'});
    const [checkedValues, setCheckedValues] = useState<string[]>([]);
    const handleOnChange = (typeCd: string, value: boolean) => {
        let newValues: string[];
        if(value) {
            newValues = checkedValues.concat(typeCd);
        } else {
            newValues = checkedValues.filter(item => item !== typeCd);
        }
        setCheckedValues(newValues);
        onChange?.(newValues);
    };

    return (
    <FormGroup>
        {res?.dataList?.map((item: ApplicationFormBasic, index: number) => <FormControlLabel key={index} control={<Checkbox onChange={(e) => handleOnChange(item.typeCd, e.target.checked)}/>} label={item.title} />)}
    </FormGroup>
    )
}