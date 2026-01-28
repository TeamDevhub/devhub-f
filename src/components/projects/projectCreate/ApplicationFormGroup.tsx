import { FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { useState } from "react"
import { useSelectApplicationForms } from '@/hooks/projects/projects.json.hook';
import { type ApplicationFormBasic } from '@/types/type.projects';

interface CustomCheckboxGroupProps {
    onChange?: (newValues: string[]) => void;
}

export default function ApplicationFormGroup({ onChange }: CustomCheckboxGroupProps) {
    const { res, loading } = useSelectApplicationForms({customYn: 'N'});
    const [checkedValues, setCheckedValues] = useState<string[]>([]);
    const handleOnChange = (typeCd: string, value: boolean) => {
        let newValues: string[] = [];
        if(value) {
            newValues = checkedValues.concat(typeCd);
        } else {
            newValues = checkedValues.filter(item => item !== typeCd);
        }
        setCheckedValues(newValues);
        onChange && onChange(newValues);
    };

    return <FormGroup>
        {res?.dataList?.map((item: ApplicationFormBasic, index: number) => <FormControlLabel key={index} control={<Checkbox onChange={(e) => handleOnChange(item.typeCd, e.target.checked)}/>} label={item.title} />)}
    </FormGroup>
}